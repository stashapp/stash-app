package databasetest

import (
	"context"
	"database/sql"
	"fmt"
	"io/ioutil"
	"os"
	"testing"

	"github.com/jmoiron/sqlx"

	"github.com/stashapp/stashdb/pkg/database"
)

type DatabasePopulater interface {
	PopulateDB() error
}

func testTeardown(databaseFile string) {
	err := database.DB.Close()

	if err != nil {
		panic(err)
	}

	err = os.Remove(databaseFile)
	if err != nil {
		panic(err)
	}
}

func initDatabase() {

}

func initSQLite() func() {
	// create the database file
	f, err := ioutil.TempFile("", "*.sqlite")
	if err != nil {
		panic(fmt.Sprintf("Could not create temporary file: %s", err.Error()))
	}

	f.Close()
	databaseFile := f.Name()
	const databaseType = "sqlite3"
	database.Initialize(databaseType, databaseFile)

	return func() {
		testTeardown(databaseFile)
	}
}

func pgDropAll(conn *sqlx.DB) {
	// we want to drop all tables so that the migration initialises
	// the schema
	rows, err := conn.Queryx(`select 'drop table if exists "' || tablename || '" cascade;' from pg_tables`)

	if err != nil && err != sql.ErrNoRows {
		panic("Error dropping tables: " + err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var stmt string
		if err := rows.Scan(&stmt); err != nil {
			panic("Error dropping tables: " + err.Error())
		}

		conn.Exec(stmt)
	}
}

func initPostgres(connString string) func() {
	const databaseType = "postgres"
	conn, err := sqlx.Open(databaseType, "postgres://"+connString)

	if err != nil {
		panic(fmt.Sprintf("Could not connect to postgres database at %s: %s", connString, err.Error()))
	}

	pgDropAll(conn)

	database.Initialize(databaseType, connString)

	return teardownPostgres
}

func teardownPostgres() {
	noDrop := os.Getenv("POSTGRES_NODROP")
	if noDrop == "" {
		pgDropAll(database.DB)
	}
	database.DB.Close()
}

func runTests(m *testing.M, populater DatabasePopulater) int {
	var deferFn func()

	pgConnStr := os.Getenv("POSTGRES_DB")
	if pgConnStr != "" {
		deferFn = initPostgres(pgConnStr)
	} else {
		deferFn = initSQLite()
	}

	// defer close and delete the database
	if deferFn != nil {
		defer deferFn()
	}

	if populater != nil {
		err := populater.PopulateDB()
		if err != nil {
			panic(fmt.Sprintf("Could not populate database: %s", err.Error()))
		}
	}

	// run the tests
	return m.Run()
}

func TestWithDatabase(m *testing.M, populater DatabasePopulater) {
	ret := runTests(m, populater)
	os.Exit(ret)
}

func WithTransientTransaction(ctx context.Context, fn database.TxFunc) {
	txn := database.NewTransaction(ctx)
	txn.Begin(ctx)

	defer func() {
		if p := recover(); p != nil {
			// a panic occurred, rollback and repanic
			txn.Rollback()
			panic(p)
		} else {
			// something went wrong, rollback
			txn.Rollback()
		}
	}()

	fn(txn)
}
