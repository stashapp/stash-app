package database

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/gobuffalo/packr/v2"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/source"
	"github.com/jmoiron/sqlx"
	"github.com/stashapp/stashdb/pkg/logger"
	"github.com/stashapp/stashdb/pkg/utils"

	// Driver used here only
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/lib/pq"
)

const postgresDriver = "postgres"

func init() {
	registerProvider("postgres", &PostgresProvider{})
}

type PostgresProvider struct{}

func (p *PostgresProvider) Open(databasePath string) *sqlx.DB {
	p.runMigrations(databasePath)

	conn, err := sqlx.Open(postgresDriver, "postgres://"+databasePath)
	conn.SetMaxOpenConns(25)
	conn.SetMaxIdleConns(4)
	if err != nil {
		logger.Fatalf("db.Open(): %q\n", err)
	}
	return conn
}

// Migrate the database
func (p *PostgresProvider) runMigrations(databasePath string) {
	migrationsBox := packr.New("Postgres Migrations", "./migrations/postgres")
	packrSource := &Packr2Source{
		Box:        migrationsBox,
		Migrations: source.NewMigrations(),
	}

	databasePath = utils.FixWindowsPath(databasePath)
	s, _ := WithInstance(packrSource)
	m, err := migrate.NewWithSourceInstance(
		"packr2",
		s,
		fmt.Sprintf("%s://%s", postgresDriver, databasePath),
	)
	if err != nil {
		panic(err.Error())
	}

	databaseSchemaVersion, _, _ := m.Version()
	stepNumber := appSchemaVersion - databaseSchemaVersion
	if stepNumber != 0 {
		err = m.Steps(int(stepNumber))
		if err != nil {
			panic(err.Error())
		}
	}

	m.Close()
}

type postgresDialect struct{}

func (p *PostgresProvider) GetDialect() sqlDialect {
	return &postgresDialect{}
}

func (*postgresDialect) FieldQuote(field string) string {
	return `"` + field + `"`
}

func (*postgresDialect) SetPlaceholders(sql string) string {
	p := strings.Index(sql, "?")
	index := 1
	for p != -1 {
		sql = strings.Replace(sql, "?", "$"+strconv.Itoa(index), 1)
		p = strings.Index(sql, "?")
		index++
	}

	return sql
}

func (*postgresDialect) NullsLast() string {
	return " NULLS LAST "
}
