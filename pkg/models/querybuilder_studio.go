package models

import (
	"database/sql"

	"github.com/gofrs/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/stashapp/stash-box/pkg/database"
	"github.com/stashapp/stash-box/pkg/utils"
)

type StudioQueryBuilder struct {
	dbi database.DBI
}

func NewStudioQueryBuilder(tx *sqlx.Tx) StudioQueryBuilder {
	return StudioQueryBuilder{
		dbi: database.DBIWithTxn(tx),
	}
}

func (qb *StudioQueryBuilder) toModel(ro interface{}) *Studio {
	if ro != nil {
		return ro.(*Studio)
	}

	return nil
}

func (qb *StudioQueryBuilder) Create(newStudio Studio) (*Studio, error) {
	ret, err := qb.dbi.Insert(newStudio)
	return qb.toModel(ret), err
}

func (qb *StudioQueryBuilder) Update(updatedStudio Studio) (*Studio, error) {
	ret, err := qb.dbi.Update(updatedStudio, true)
	return qb.toModel(ret), err
}

func (qb *StudioQueryBuilder) Destroy(id uuid.UUID) error {
	return qb.dbi.Delete(id, studioDBTable)
}

func (qb *StudioQueryBuilder) CreateURLs(newJoins StudioURLs) error {
	return qb.dbi.InsertJoins(studioURLTable, &newJoins)
}

func (qb *StudioQueryBuilder) UpdateURLs(studioID uuid.UUID, updatedJoins StudioURLs) error {
	return qb.dbi.ReplaceJoins(studioURLTable, studioID, &updatedJoins)
}

func (qb *StudioQueryBuilder) Find(id uuid.UUID) (*Studio, error) {
	ret, err := qb.dbi.Find(id, studioDBTable)
	return qb.toModel(ret), err
}

func (qb *StudioQueryBuilder) FindBySceneID(sceneID int) (Studios, error) {
	query := `
		SELECT studios.* FROM studios
		LEFT JOIN scenes on scenes.studio_id = studios.id
		WHERE scenes.id = ?
		GROUP BY studios.id
	`
	args := []interface{}{sceneID}
	return qb.queryStudios(query, args)
}

func (qb *StudioQueryBuilder) FindByNames(names []string) (Studios, error) {
	query := "SELECT * FROM studios WHERE name IN " + getInBinding(len(names))
	var args []interface{}
	for _, name := range names {
		args = append(args, name)
	}
	return qb.queryStudios(query, args)
}

func (qb *StudioQueryBuilder) FindByName(name string) (*Studio, error) {
	query := "SELECT * FROM studios WHERE upper(name) = upper(?)"
	var args []interface{}
	args = append(args, name)
	results, err := qb.queryStudios(query, args)
	if err != nil || len(results) < 1 {
		return nil, err
	}
	return results[0], nil
}

func (qb *StudioQueryBuilder) FindByParentID(id uuid.UUID) (Studios, error) {
	query := "SELECT * FROM studios WHERE parent_studio_id = ?"
	var args []interface{}
	args = append(args, id)
	return qb.queryStudios(query, args)
}

func (qb *StudioQueryBuilder) Count() (int, error) {
	return runCountQuery(buildCountQuery("SELECT studios.id FROM studios"), nil)
}

func (qb *StudioQueryBuilder) Query(studioFilter *StudioFilterType, findFilter *QuerySpec) (Studios, int) {
	if studioFilter == nil {
		studioFilter = &StudioFilterType{}
	}
	if findFilter == nil {
		findFilter = &QuerySpec{}
	}

	query := database.NewQueryBuilder(studioDBTable)
	query.Body += "LEFT JOIN studios as parent_studio ON studios.parent_studio_id = parent_studio.id"

	if q := studioFilter.Name; q != nil && *q != "" {
		searchColumns := []string{"studios.name"}
		clause, thisArgs := getSearchBinding(searchColumns, *q, false, true)
		query.AddWhere(clause)
		query.AddArg(thisArgs...)
	}

	if q := studioFilter.Names; q != nil && *q != "" {
		searchColumns := []string{"studios.name", "parent_studio.name"}
		clause, thisArgs := getSearchBinding(searchColumns, *q, false, true)
		query.AddWhere(clause)
		query.AddArg(thisArgs...)
	}

	if studioFilter.HasParent != nil {
		if *studioFilter.HasParent {
			query.AddWhere("parent_studio.id IS NOT NULL")
		} else {
			query.AddWhere("parent_studio.id IS NULL")
		}
	}

	query.SortAndPagination = qb.getStudioSort(findFilter) + getPagination(findFilter)
	var studios Studios
	countResult, err := qb.dbi.Query(*query, &studios)

	if err != nil {
		// TODO
		panic(err)
	}

	return studios, countResult
}

func (qb *StudioQueryBuilder) getStudioSort(findFilter *QuerySpec) string {
	var sort string
	var direction string
	if findFilter == nil {
		sort = "name"
		direction = "ASC"
	} else {
		sort = findFilter.GetSort("name")
		direction = findFilter.GetDirection()
	}
	return getSort(sort, direction, "studios", nil)
}

func (qb *StudioQueryBuilder) queryStudios(query string, args []interface{}) (Studios, error) {
	var output Studios
	err := qb.dbi.RawQuery(studioDBTable, query, args, &output)
	return output, err
}

func (qb *StudioQueryBuilder) GetURLs(id uuid.UUID) (StudioURLs, error) {
	joins := StudioURLs{}
	err := qb.dbi.FindJoins(studioURLTable, id, &joins)

	return joins, err
}

func (qb *StudioQueryBuilder) GetAllURLs(ids []uuid.UUID) ([][]*URL, []error) {
	joins := StudioURLs{}
	err := qb.dbi.FindAllJoins(studioURLTable, ids, &joins)
	if err != nil {
		return nil, utils.DuplicateError(err, len(ids))
	}

	m := make(map[uuid.UUID][]*URL)
	for _, join := range joins {
		url := URL{
			URL:  join.URL,
			Type: join.Type,
		}
		m[join.StudioID] = append(m[join.StudioID], &url)
	}

	result := make([][]*URL, len(ids))
	for i, id := range ids {
		result[i] = m[id]
	}
	return result, nil
}

type PerformerStudio struct {
	SceneCount int `db:"count" json:"scene_count"`
	Studio
}

func (qb *StudioQueryBuilder) CountByPerformer(performerID uuid.UUID) ([]*PerformerStudio, error) {
	var results []*PerformerStudio

	query := `
		SELECT S.*, C.count
		FROM studios S JOIN (
			SELECT studio_id, COUNT(*)
			FROM scene_performers SP
			JOIN scenes S ON SP.scene_id = S.id
			WHERE performer_id = ?
			GROUP BY studio_id
		) C ON S.id = C.studio_id`
	query = database.DB.Rebind(query)
	if err := database.DB.Select(&results, query, performerID); err != nil && err != sql.ErrNoRows {
		return nil, err
	}

	return results, nil
}
