package models

import (
	"strconv"

	"github.com/gofrs/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/stashapp/stashdb/pkg/database"
)

type SceneQueryBuilder struct {
	dbi database.DBI
}

func NewSceneQueryBuilder(tx *sqlx.Tx) SceneQueryBuilder {
	return SceneQueryBuilder{
		dbi: database.DBIWithTxn(tx),
	}
}

func (qb *SceneQueryBuilder) toModel(ro interface{}) *Scene {
	if ro != nil {
		return ro.(*Scene)
	}

	return nil
}

func (qb *SceneQueryBuilder) Create(newScene Scene) (*Scene, error) {
	ret, err := qb.dbi.Insert(newScene)
	return qb.toModel(ret), err
}

func (qb *SceneQueryBuilder) Update(updatedScene Scene) (*Scene, error) {
	ret, err := qb.dbi.Update(updatedScene)
	return qb.toModel(ret), err
}

func (qb *SceneQueryBuilder) Destroy(id uuid.UUID) error {
	return qb.dbi.Delete(id, sceneDBTable)
}

func (qb *SceneQueryBuilder) CreateUrls(newJoins SceneUrls) error {
	return qb.dbi.InsertJoins(sceneUrlTable, &newJoins)
}

func (qb *SceneQueryBuilder) UpdateUrls(scene uuid.UUID, updatedJoins SceneUrls) error {
	return qb.dbi.ReplaceJoins(sceneUrlTable, scene, &updatedJoins)
}

func (qb *SceneQueryBuilder) CreateFingerprints(newJoins SceneFingerprints) error {
	return qb.dbi.InsertJoins(sceneFingerprintTable, &newJoins)
}

func (qb *SceneQueryBuilder) UpdateFingerprints(sceneID uuid.UUID, updatedJoins SceneFingerprints) error {
	return qb.dbi.ReplaceJoins(sceneFingerprintTable, sceneID, &updatedJoins)
}

func (qb *SceneQueryBuilder) Find(id uuid.UUID) (*Scene, error) {
	ret, err := qb.dbi.Find(id, sceneDBTable)
	return qb.toModel(ret), err
}

func (qb *SceneQueryBuilder) FindByFingerprint(algorithm FingerprintAlgorithm, hash string) ([]*Scene, error) {
	query := `
		SELECT scenes.* FROM scenes
		LEFT JOIN scene_fingerprints as scenes_join on scenes_join.scene_id = scenes.id
		WHERE scenes_join.algorithm = ? AND scenes_join.hash = ?`
	var args []interface{}
	args = append(args, algorithm.String())
	args = append(args, hash)
	return qb.queryScenes(query, args)
}

// func (qb *SceneQueryBuilder) FindByStudioID(sceneID int) ([]*Scene, error) {
// 	query := `
// 		SELECT scenes.* FROM scenes
// 		LEFT JOIN scenes_scenes as scenes_join on scenes_join.scene_id = scenes.id
// 		LEFT JOIN scenes on scenes_join.scene_id = scenes.id
// 		WHERE scenes.id = ?
// 		GROUP BY scenes.id
// 	`
// 	args := []interface{}{sceneID}
// 	return qb.queryScenes(query, args)
// }

// func (qb *SceneQueryBuilder) FindByChecksum(checksum string) (*Scene, error) {
// 	query := `SELECT scenes.* FROM scenes
// 		left join scene_checksums on scenes.id = scene_checksums.scene_id
// 		WHERE scene_checksums.checksum = ?`

// 	var args []interface{}
// 	args = append(args, checksum)

// 	results, err := qb.queryScenes(query, args)
// 	if err != nil || len(results) < 1 {
// 		return nil, err
// 	}
// 	return results[0], nil
// }

// func (qb *SceneQueryBuilder) FindByChecksums(checksums []string) ([]*Scene, error) {
// 	query := `SELECT scenes.* FROM scenes
// 		left join scene_checksums on scenes.id = scene_checksums.scene_id
// 		WHERE scene_checksums.checksum IN ` + getInBinding(len(checksums))

// 	var args []interface{}
// 	for _, name := range checksums {
// 		args = append(args, name)
// 	}
// 	return qb.queryScenes(query, args)
// }

func (qb *SceneQueryBuilder) FindByTitle(name string) ([]*Scene, error) {
	query := "SELECT * FROM scenes WHERE upper(title) = upper(?)"
	var args []interface{}
	args = append(args, name)
	return qb.queryScenes(query, args)
}

func (qb *SceneQueryBuilder) Count() (int, error) {
	return runCountQuery(buildCountQuery("SELECT scenes.id FROM scenes"), nil)
}

func (qb *SceneQueryBuilder) Query(sceneFilter *SceneFilterType, findFilter *QuerySpec) ([]*Scene, int) {
	if sceneFilter == nil {
		sceneFilter = &SceneFilterType{}
	}
	if findFilter == nil {
		findFilter = &QuerySpec{}
	}

	query := database.NewQueryBuilder(sceneDBTable)

	if q := sceneFilter.Text; q != nil && *q != "" {
		searchColumns := []string{"scenes.title", "scenes.details"}
		clause, thisArgs := getSearchBinding(searchColumns, *q, false)
		query.AddWhere(clause)
		query.AddArg(thisArgs...)
	}

	if q := sceneFilter.Title; q != nil && *q != "" {
		searchColumns := []string{"scenes.title"}
		clause, thisArgs := getSearchBinding(searchColumns, *q, false)
		query.AddWhere(clause)
		query.AddArg(thisArgs...)
	}

	if q := sceneFilter.URL; q != nil && *q != "" {
		searchColumns := []string{"scenes.url"}
		clause, thisArgs := getSearchBinding(searchColumns, *q, false)
		query.AddWhere(clause)
		query.AddArg(thisArgs...)
	}

	if q := sceneFilter.Studios; q != nil && len(q.Value) > 0 {
		column := "scenes.studio_id"
		if q.Modifier == CriterionModifierEquals {
			query.Eq(column, q.Value[0])
		} else if q.Modifier == CriterionModifierNotEquals {
			query.NotEq(column, q.Value[0])
		} else if q.Modifier == CriterionModifierIsNull {
			query.IsNull(column)
		} else if q.Modifier == CriterionModifierNotNull {
			query.IsNotNull(column)
		} else if q.Modifier == CriterionModifierIncludes {
			query.AddWhere(column + " IN " + getInBinding(len(q.Value)))
			for _, studioID := range q.Value {
				query.AddArg(studioID)
			}
		} else if q.Modifier == CriterionModifierExcludes {
			query.AddWhere(column + " NOT IN " + getInBinding(len(q.Value)))
			for _, studioID := range q.Value {
				query.AddArg(studioID)
			}
		} else {
			panic("unsupported modifier " + q.Modifier + " for scnes.studio_id")
		}
	}

	if q := sceneFilter.Performers; q != nil && len(q.Value) > 0 {
		query.AddJoin(scenePerformerTable.Table, scenePerformerTable.Name()+".scene_id = scenes.id")
		whereClause, havingClause := getMultiCriterionClause(scenePerformerTable, performerJoinKey, q)
		query.AddWhere(whereClause)
		query.AddHaving(havingClause)

		for _, performerID := range q.Value {
			query.AddArg(performerID)
		}
	}

	if q := sceneFilter.Tags; q != nil && len(q.Value) > 0 {
		query.AddJoin(sceneTagTable.Table, sceneTagTable.Name()+".scene_id = scenes.id")
		whereClause, havingClause := getMultiCriterionClause(sceneTagTable, tagJoinKey, q)
		query.AddWhere(whereClause)
		query.AddHaving(havingClause)

		for _, tagID := range q.Value {
			query.AddArg(tagID)
		}
	}

	// TODO - other filters

	query.SortAndPagination = qb.getSceneSort(findFilter) + getPagination(findFilter)

	var scenes Scenes
	countResult, err := qb.dbi.Query(*query, &scenes)

	if err != nil {
		// TODO
		panic(err)
	}

	return scenes, countResult
}

func getMultiCriterionClause(joinTable database.TableJoin, joinTableField string, criterion *MultiIDCriterionInput) (string, string) {
	joinTableName := joinTable.Name()
	whereClause := ""
	havingClause := ""
	if criterion.Modifier == CriterionModifierIncludes {
		// includes any of the provided ids
		whereClause = joinTableName + "." + joinTableField + " IN " + getInBinding(len(criterion.Value))
	} else if criterion.Modifier == CriterionModifierIncludesAll {
		// includes all of the provided ids
		whereClause = joinTableName + "." + joinTableField + " IN " + getInBinding(len(criterion.Value))
		havingClause = "count(distinct " + joinTableName + "." + joinTableField + ") = " + strconv.Itoa(len(criterion.Value))
	} else if criterion.Modifier == CriterionModifierExcludes {
		// excludes all of the provided ids
		whereClause = "not exists (select " + joinTableName + ".scene_id from " + joinTableName + " where " + joinTableName + ".scene_id = scenes.id and " + joinTableName + "." + joinTableField + " in " + getInBinding(len(criterion.Value)) + ")"
	} else {
		panic("unsupported modifier " + criterion.Modifier + " for scenes.studio_id")
	}

	return whereClause, havingClause
}

func (qb *SceneQueryBuilder) getSceneSort(findFilter *QuerySpec) string {
	var sort string
	var direction string
	if findFilter == nil {
		sort = "title"
		direction = "ASC"
	} else {
		sort = findFilter.GetSort("title")
		direction = findFilter.GetDirection()
	}
	return getSort(sort, direction, "scenes")
}

func (qb *SceneQueryBuilder) queryScenes(query string, args []interface{}) (Scenes, error) {
	output := Scenes{}
	err := qb.dbi.RawQuery(sceneDBTable, query, args, &output)
	return output, err
}

func (qb *SceneQueryBuilder) GetFingerprints(id uuid.UUID) ([]*Fingerprint, error) {
	joins := SceneFingerprints{}
	err := qb.dbi.FindJoins(sceneFingerprintTable, id, &joins)

	return joins.ToFingerprints(), err
}

func (qb *SceneQueryBuilder) GetPerformers(id uuid.UUID) (PerformersScenes, error) {
	joins := PerformersScenes{}
	err := qb.dbi.FindJoins(scenePerformerTable, id, &joins)

	return joins, err
}

func (qb *SceneQueryBuilder) GetUrls(id uuid.UUID) (SceneUrls, error) {
	joins := SceneUrls{}
	err := qb.dbi.FindJoins(sceneUrlTable, id, &joins)

	return joins, err
}
