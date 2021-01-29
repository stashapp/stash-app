package models

import (
	"strconv"
	"time"

	"github.com/stashapp/stash-box/pkg/database"
	"github.com/stashapp/stash-box/pkg/utils"

	"github.com/gofrs/uuid"
	"github.com/jmoiron/sqlx"
)

type PerformerQueryBuilder struct {
	dbi database.DBI
}

func NewPerformerQueryBuilder(tx *sqlx.Tx) PerformerQueryBuilder {
	return PerformerQueryBuilder{
		dbi: database.DBIWithTxn(tx),
	}
}

func (qb *PerformerQueryBuilder) toModel(ro interface{}) *Performer {
	if ro != nil {
		return ro.(*Performer)
	}

	return nil
}

func (qb *PerformerQueryBuilder) Create(newPerformer Performer) (*Performer, error) {
	ret, err := qb.dbi.Insert(newPerformer)
	return qb.toModel(ret), err
}

func (qb *PerformerQueryBuilder) Update(updatedPerformer Performer) (*Performer, error) {
	ret, err := qb.dbi.Update(updatedPerformer, true)
	return qb.toModel(ret), err
}

func (qb *PerformerQueryBuilder) Destroy(id uuid.UUID) error {
	return qb.dbi.Delete(id, performerDBTable)
}

func (qb *PerformerQueryBuilder) CreateAliases(newJoins PerformerAliases) error {
	return qb.dbi.InsertJoins(performerAliasTable, &newJoins)
}

func (qb *PerformerQueryBuilder) UpdateAliases(performerID uuid.UUID, updatedJoins PerformerAliases) error {
	return qb.dbi.ReplaceJoins(performerAliasTable, performerID, &updatedJoins)
}

func (qb *PerformerQueryBuilder) CreateUrls(newJoins PerformerUrls) error {
	return qb.dbi.InsertJoins(performerUrlTable, &newJoins)
}

func (qb *PerformerQueryBuilder) UpdateUrls(performerID uuid.UUID, updatedJoins PerformerUrls) error {
	return qb.dbi.ReplaceJoins(performerUrlTable, performerID, &updatedJoins)
}

func (qb *PerformerQueryBuilder) CreateTattoos(newJoins PerformerBodyMods) error {
	return qb.dbi.InsertJoins(performerTattooTable, &newJoins)
}

func (qb *PerformerQueryBuilder) UpdateTattoos(performerID uuid.UUID, updatedJoins PerformerBodyMods) error {
	return qb.dbi.ReplaceJoins(performerTattooTable, performerID, &updatedJoins)
}

func (qb *PerformerQueryBuilder) CreatePiercings(newJoins PerformerBodyMods) error {
	return qb.dbi.InsertJoins(performerPiercingTable, &newJoins)
}

func (qb *PerformerQueryBuilder) UpdatePiercings(performerID uuid.UUID, updatedJoins PerformerBodyMods) error {
	return qb.dbi.ReplaceJoins(performerPiercingTable, performerID, &updatedJoins)
}

func (qb *PerformerQueryBuilder) Find(id uuid.UUID) (*Performer, error) {
	ret, err := qb.dbi.Find(id, performerDBTable)
	return qb.toModel(ret), err
}

func (qb *PerformerQueryBuilder) FindByIds(ids []uuid.UUID) ([]*Performer, []error) {
	query := "SELECT performers.* FROM performers WHERE id IN (?)"
	query, args, _ := sqlx.In(query, ids)
	performers, err := qb.queryPerformers(query, args)
	if err != nil {
		return nil, utils.DuplicateError(err, len(ids))
	}

	m := make(map[uuid.UUID]*Performer)
	for _, performer := range performers {
		m[performer.ID] = performer
	}

	result := make([]*Performer, len(ids))
	for i, id := range ids {
		result[i] = m[id]
	}
	return result, nil
}

func (qb *PerformerQueryBuilder) FindBySceneID(sceneID uuid.UUID) (Performers, error) {
	query := `
		SELECT performers.* FROM performers
		LEFT JOIN performers_scenes as scenes_join on scenes_join.performer_id = performers.id
		WHERE scenes_join.scene_id = ?
		GROUP BY performers.id
	`
	args := []interface{}{sceneID}
	return qb.queryPerformers(query, args)
}

func (qb *PerformerQueryBuilder) FindByNames(names []string) (Performers, error) {
	query := "SELECT * FROM performers WHERE name IN " + getInBinding(len(names))
	var args []interface{}
	for _, name := range names {
		args = append(args, name)
	}
	return qb.queryPerformers(query, args)
}

func (qb *PerformerQueryBuilder) FindByAliases(names []string) (Performers, error) {
	query := `SELECT performers.* FROM performers
		left join performer_aliases on performers.id = performer_aliases.performer_id
		WHERE performer_aliases.alias IN ` + getInBinding(len(names))

	var args []interface{}
	for _, name := range names {
		args = append(args, name)
	}
	return qb.queryPerformers(query, args)
}

func (qb *PerformerQueryBuilder) FindByName(name string) (Performers, error) {
	query := "SELECT * FROM performers WHERE upper(name) = upper(?)"
	var args []interface{}
	args = append(args, name)
	return qb.queryPerformers(query, args)
}

func (qb *PerformerQueryBuilder) FindByAlias(name string) (Performers, error) {
	query := `SELECT performers.* FROM performers
		left join performer_aliases on performers.id = performer_aliases.performer_id
		WHERE upper(performer_aliases.alias) = UPPER(?)`

	var args []interface{}
	args = append(args, name)
	return qb.queryPerformers(query, args)
}

func (qb *PerformerQueryBuilder) Count() (int, error) {
	return runCountQuery(buildCountQuery("SELECT performers.id FROM performers"), nil)
}

func (qb *PerformerQueryBuilder) Query(performerFilter *PerformerFilterType, findFilter *QuerySpec) ([]*Performer, int) {
	if performerFilter == nil {
		performerFilter = &PerformerFilterType{}
	}
	if findFilter == nil {
		findFilter = &QuerySpec{}
	}

	query := database.NewQueryBuilder(performerDBTable)

	if q := performerFilter.Name; q != nil && *q != "" {
		searchColumns := []string{"performers.name"}
		clause, thisArgs := getSearchBinding(searchColumns, *q, false, false)
		query.AddWhere(clause)
		query.AddArg(thisArgs...)
	}

	if birthYear := performerFilter.BirthYear; birthYear != nil {
		clauses, thisArgs := getBirthYearFilterClause(birthYear.Modifier, birthYear.Value)
		query.AddWhere(clauses...)
		query.AddArg(thisArgs...)
	}

	if age := performerFilter.Age; age != nil {
		clauses, thisArgs := getAgeFilterClause(age.Modifier, age.Value)
		query.AddWhere(clauses...)
		query.AddArg(thisArgs...)
	}

	//handleStringCriterion("ethnicity", performerFilter.Ethnicity, &query)
	handleStringCriterion("country", performerFilter.Country, query)
	//handleStringCriterion("eye_color", performerFilter.EyeColor, &query)
	//handleStringCriterion("height", performerFilter.Height, &query)
	//handleStringCriterion("measurements", performerFilter.Measurements, &query)
	//handleStringCriterion("fake_tits", performerFilter.FakeTits, &query)
	//handleStringCriterion("career_length", performerFilter.CareerLength, &query)
	//handleStringCriterion("tattoos", performerFilter.Tattoos, &query)
	//handleStringCriterion("piercings", performerFilter.Piercings, &query)
	//handleStringCriterion("aliases", performerFilter.Aliases, &query)

	query.SortAndPagination = qb.getPerformerSort(findFilter) + getPagination(findFilter)
	var performers Performers
	countResult, err := qb.dbi.Query(*query, &performers)

	if err != nil {
		// TODO
		panic(err)
	}

	return performers, countResult
}

func getBirthYearFilterClause(criterionModifier CriterionModifier, value int) ([]string, []interface{}) {
	var clauses []string
	var args []interface{}

	yearStr := strconv.Itoa(value)
	startOfYear := yearStr + "-01-01"
	endOfYear := yearStr + "-12-31"

	if modifier := criterionModifier.String(); criterionModifier.IsValid() {
		switch modifier {
		case "EQUALS":
			// between yyyy-01-01 and yyyy-12-31
			clauses = append(clauses, "performers.birthdate >= ?")
			clauses = append(clauses, "performers.birthdate <= ?")
			args = append(args, startOfYear)
			args = append(args, endOfYear)
		case "NOT_EQUALS":
			// outside of yyyy-01-01 to yyyy-12-31
			clauses = append(clauses, "performers.birthdate < ? OR performers.birthdate > ?")
			args = append(args, startOfYear)
			args = append(args, endOfYear)
		case "GREATER_THAN":
			// > yyyy-12-31
			clauses = append(clauses, "performers.birthdate > ?")
			args = append(args, endOfYear)
		case "LESS_THAN":
			// < yyyy-01-01
			clauses = append(clauses, "performers.birthdate < ?")
			args = append(args, startOfYear)
		}
	}

	return clauses, args
}

func getAgeFilterClause(criterionModifier CriterionModifier, value int) ([]string, []interface{}) {
	var clauses []string
	var args []interface{}

	// get the date at which performer would turn the age specified
	dt := time.Now()
	birthDate := dt.AddDate(-value-1, 0, 0)
	yearAfter := birthDate.AddDate(1, 0, 0)

	if modifier := criterionModifier.String(); criterionModifier.IsValid() {
		switch modifier {
		case "EQUALS":
			// between birthDate and yearAfter
			clauses = append(clauses, "performers.birthdate >= ?")
			clauses = append(clauses, "performers.birthdate < ?")
			args = append(args, birthDate)
			args = append(args, yearAfter)
		case "NOT_EQUALS":
			// outside of birthDate and yearAfter
			clauses = append(clauses, "performers.birthdate < ? OR performers.birthdate >= ?")
			args = append(args, birthDate)
			args = append(args, yearAfter)
		case "GREATER_THAN":
			// < birthDate
			clauses = append(clauses, "performers.birthdate < ?")
			args = append(args, birthDate)
		case "LESS_THAN":
			// > yearAfter
			clauses = append(clauses, "performers.birthdate >= ?")
			args = append(args, yearAfter)
		}
	}

	return clauses, args
}

func (qb *PerformerQueryBuilder) getPerformerSort(findFilter *QuerySpec) string {
	var sort string
	var direction string
	if findFilter == nil {
		sort = "name"
		direction = "ASC"
	} else {
		sort = findFilter.GetSort("name")
		direction = findFilter.GetDirection()
	}
	return getSort(sort, direction, "performers")
}

func (qb *PerformerQueryBuilder) queryPerformers(query string, args []interface{}) (Performers, error) {
	output := Performers{}
	err := qb.dbi.RawQuery(performerDBTable, query, args, &output)
	return output, err
}

func (qb *PerformerQueryBuilder) GetAliases(id uuid.UUID) ([]string, error) {
	joins := PerformerAliases{}
	err := qb.dbi.FindJoins(performerAliasTable, id, &joins)

	return joins.ToAliases(), err
}

func (qb *PerformerQueryBuilder) GetAllAliases(ids []uuid.UUID) ([][]string, []error) {
	joins := PerformerAliases{}
	err := qb.dbi.FindAllJoins(performerAliasTable, ids, &joins)
	if err != nil {
		return nil, utils.DuplicateError(err, len(ids))
	}

	m := make(map[uuid.UUID][]string)
	for _, join := range joins {
		m[join.PerformerID] = append(m[join.PerformerID], join.Alias)
	}

	result := make([][]string, len(ids))
	for i, id := range ids {
		result[i] = m[id]
	}
	return result, nil
}

func (qb *PerformerQueryBuilder) GetUrls(id uuid.UUID) (PerformerUrls, error) {
	joins := PerformerUrls{}
	err := qb.dbi.FindJoins(performerUrlTable, id, &joins)

	return joins, err
}

func (qb *PerformerQueryBuilder) GetAllUrls(ids []uuid.UUID) ([][]*URL, []error) {
	joins := PerformerUrls{}
	err := qb.dbi.FindAllJoins(performerUrlTable, ids, &joins)
	if err != nil {
		return nil, utils.DuplicateError(err, len(ids))
	}

	m := make(map[uuid.UUID][]*URL)
	for _, join := range joins {
		url := URL{
			URL:  join.URL,
			Type: join.Type,
		}
		m[join.PerformerID] = append(m[join.PerformerID], &url)
	}

	result := make([][]*URL, len(ids))
	for i, id := range ids {
		result[i] = m[id]
	}
	return result, nil
}

func (qb *PerformerQueryBuilder) GetTattoos(id uuid.UUID) (PerformerBodyMods, error) {
	joins := PerformerBodyMods{}
	err := qb.dbi.FindJoins(performerTattooTable, id, &joins)

	return joins, err
}

func (qb *PerformerQueryBuilder) GetAllTattoos(ids []uuid.UUID) ([][]*BodyModification, []error) {
	joins := PerformerBodyMods{}
	err := qb.dbi.FindAllJoins(performerTattooTable, ids, &joins)
	if err != nil {
		return nil, utils.DuplicateError(err, len(ids))
	}

	m := make(map[uuid.UUID][]*BodyModification)
	for _, join := range joins {
		desc := &join.Description.String
		if !join.Description.Valid {
			desc = nil
		}
		mod := BodyModification{
			Location:    join.Location,
			Description: desc,
		}
		m[join.PerformerID] = append(m[join.PerformerID], &mod)
	}

	result := make([][]*BodyModification, len(ids))
	for i, id := range ids {
		result[i] = m[id]
	}
	return result, nil
}

func (qb *PerformerQueryBuilder) GetPiercings(id uuid.UUID) (PerformerBodyMods, error) {
	joins := PerformerBodyMods{}
	err := qb.dbi.FindJoins(performerPiercingTable, id, &joins)

	return joins, err
}

func (qb *PerformerQueryBuilder) GetAllPiercings(ids []uuid.UUID) ([][]*BodyModification, []error) {
	joins := PerformerBodyMods{}
	err := qb.dbi.FindAllJoins(performerPiercingTable, ids, &joins)
	if err != nil {
		return nil, utils.DuplicateError(err, len(ids))
	}

	m := make(map[uuid.UUID][]*BodyModification)
	for _, join := range joins {
		desc := &join.Description.String
		if !join.Description.Valid {
			desc = nil
		}
		mod := BodyModification{
			Location:    join.Location,
			Description: desc,
		}
		m[join.PerformerID] = append(m[join.PerformerID], &mod)
	}

	result := make([][]*BodyModification, len(ids))
	for i, id := range ids {
		result[i] = m[id]
	}
	return result, nil
}

func (qb *PerformerQueryBuilder) SearchPerformers(term string) (Performers, error) {
	query := `
        SELECT * FROM performers
        WHERE name % $1
        AND similarity(name, $1) > 0.5
        ORDER BY similarity(name, $1) DESC
        LIMIT 5`
	args := []interface{}{term}
	return qb.queryPerformers(query, args)
}
