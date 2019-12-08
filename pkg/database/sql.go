package database

import (
	"database/sql"
	"fmt"
	"reflect"
	"strings"

	"github.com/gofrs/uuid"
	"github.com/jmoiron/sqlx"
)

type QueryBuilder struct {
	Table Table
	Body  string

	whereClauses  []string
	havingClauses []string
	args          []interface{}

	SortAndPagination string
}

func NewQueryBuilder(table Table) *QueryBuilder {
	ret := &QueryBuilder{
		Table: table,
	}

	tableName := table.Name()
	ret.Body = "SELECT " + tableName + ".* FROM " + tableName + " "

	return ret
}

func (qb *QueryBuilder) AddJoin(joinTable Table, on string) {
	qb.Body += "LEFT JOIN " + joinTable.Name() + " ON " + on
}

func (qb *QueryBuilder) AddWhere(clauses ...string) {
	qb.whereClauses = append(qb.whereClauses, clauses...)
}

func (qb *QueryBuilder) Eq(column string, arg interface{}) {
	qb.AddWhere(column + " = ?")
	qb.AddArg(arg)
}

func (qb *QueryBuilder) NotEq(column string, arg interface{}) {
	qb.AddWhere(column + " != ?")
	qb.AddArg(arg)
}

func (qb *QueryBuilder) IsNull(column string) {
	qb.AddWhere(column + " is NULL")
}

func (qb *QueryBuilder) IsNotNull(column string) {
	qb.AddWhere(column + " is not NULL")
}

func (qb *QueryBuilder) AddHaving(clauses ...string) {
	if len(clauses) == 1 && clauses[0] == "" {
		return
	}
	qb.havingClauses = append(qb.havingClauses, clauses...)
}

func (qb *QueryBuilder) AddArg(args ...interface{}) {
	qb.args = append(qb.args, args...)
}

func (qb QueryBuilder) buildBody() string {
	body := qb.Body

	if len(qb.whereClauses) > 0 {
		body = body + " WHERE " + strings.Join(qb.whereClauses, " AND ") // TODO handle AND or OR
	}
	body = body + " GROUP BY " + qb.Table.Name() + ".id "
	if len(qb.havingClauses) > 0 {
		body = body + " HAVING " + strings.Join(qb.havingClauses, " AND ") // TODO handle AND or OR
	}

	return body
}

func (qb QueryBuilder) buildCountQuery() string {
	return "SELECT COUNT(*) as count FROM (" + qb.buildBody() + ") as temp"
}

func (qb QueryBuilder) buildQuery() string {
	return qb.buildBody() + qb.SortAndPagination
}

type optionalValue interface {
	IsValid() bool
}

func ensureTx(tx *sqlx.Tx) {
	if tx == nil {
		panic("must use a transaction")
	}
}

func getByID(tx *sqlx.Tx, table string, id uuid.UUID, object interface{}) error {
	return tx.Get(object, `SELECT * FROM `+table+` WHERE id = ? LIMIT 1`, id)
}

func insertObject(tx *sqlx.Tx, table string, object interface{}) error {
	ensureTx(tx)
	fields, values := sqlGenKeysCreate(object)

	_, err := tx.NamedExec(
		`INSERT INTO `+table+` (`+fields+`)
				VALUES (`+values+`)
		`,
		object,
	)

	return err
}

func updateObjectByID(tx *sqlx.Tx, table string, object interface{}) error {
	ensureTx(tx)
	_, err := tx.NamedExec(
		`UPDATE `+table+` SET `+sqlGenKeys(object, false)+` WHERE `+table+`.id = :id`,
		object,
	)

	return err
}

func executeDeleteQuery(tableName string, id uuid.UUID, tx *sqlx.Tx) error {
	if tx == nil {
		panic("must use a transaction")
	}
	idColumnName := getColumn(tableName, "id")
	_, err := tx.Exec(
		`DELETE FROM `+tableName+` WHERE `+idColumnName+` = ?`,
		id,
	)
	return err
}

func deleteObjectsByColumn(tx *sqlx.Tx, table string, column string, value interface{}) error {
	ensureTx(tx)
	_, err := tx.Exec(`DELETE FROM `+table+` WHERE `+column+` = ?`, value)
	return err
}

func getColumn(tableName string, columnName string) string {
	return tableName + "." + columnName
}

func sqlGenKeysCreate(i interface{}) (string, string) {
	var fields []string
	var values []string

	addPlaceholder := func(key string) {
		fields = append(fields, dialect.FieldQuote(key))
		values = append(values, ":"+key)
	}

	v := reflect.ValueOf(i)
	for i := 0; i < v.NumField(); i++ {
		//get key for struct tag
		rawKey := v.Type().Field(i).Tag.Get("db")
		key := strings.Split(rawKey, ",")[0]
		switch t := v.Field(i).Interface().(type) {
		case string:
			if t != "" {
				addPlaceholder(key)
			}
		case int, int64, float64:
			if t != 0 {
				addPlaceholder(key)
			}
		case uuid.UUID:
			if t != uuid.Nil {
				addPlaceholder(key)
			}
		case optionalValue:
			if t.IsValid() {
				addPlaceholder(key)
			}
		case sql.NullString:
			if t.Valid {
				addPlaceholder(key)
			}
		case sql.NullBool:
			if t.Valid {
				addPlaceholder(key)
			}
		case sql.NullInt64:
			if t.Valid {
				addPlaceholder(key)
			}
		case uuid.NullUUID:
			if t.Valid {
				addPlaceholder(key)
			}
		case sql.NullFloat64:
			if t.Valid {
				addPlaceholder(key)
			}
		default:
			reflectValue := reflect.ValueOf(t)
			isNil := reflectValue.IsNil()
			if !isNil {
				fields = append(fields, key)
				values = append(values, ":"+key)
			}
		}
	}
	return strings.Join(fields, ", "), strings.Join(values, ", ")
}

func sqlGenKeys(i interface{}, partial bool) string {
	var query []string

	addKey := func(key string) {
		query = append(query, fmt.Sprintf("%s=:%s", key, key))
	}

	v := reflect.ValueOf(i)
	for i := 0; i < v.NumField(); i++ {
		//get key for struct tag
		rawKey := v.Type().Field(i).Tag.Get("db")
		key := strings.Split(rawKey, ",")[0]
		if key == "id" {
			continue
		}
		switch t := v.Field(i).Interface().(type) {
		case string:
			if partial || t != "" {
				addKey(key)
			}
		case uuid.UUID:
			if partial || t != uuid.Nil {
				addKey(key)
			}
		case int, int64, float64:
			if partial || t != 0 {
				addKey(key)
			}
		case optionalValue:
			if partial || t.IsValid() {
				addKey(key)
			}
		case sql.NullString:
			if partial || t.Valid {
				addKey(key)
			}
		case sql.NullBool:
			if partial || t.Valid {
				addKey(key)
			}
		case sql.NullInt64:
			if partial || t.Valid {
				addKey(key)
			}
		case uuid.NullUUID:
			if partial || t.Valid {
				addKey(key)
			}
		case sql.NullFloat64:
			if partial || t.Valid {
				addKey(key)
			}
		default:
			reflectValue := reflect.ValueOf(t)
			isNil := reflectValue.IsNil()
			if !isNil {
				addKey(key)
			}
		}
	}
	return strings.Join(query, ", ")
}
