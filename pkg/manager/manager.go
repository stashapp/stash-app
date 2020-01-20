package manager

import (
	"net"
	"path/filepath"
	"strings"
	"sync"

	"github.com/spf13/pflag"
	"github.com/spf13/viper"
	"github.com/stashapp/stashdb/pkg/logger"
	"github.com/stashapp/stashdb/pkg/manager/config"
	"github.com/stashapp/stashdb/pkg/manager/paths"
	"github.com/stashapp/stashdb/pkg/utils"
)

type singleton struct {
	Status JobStatus
	JSON   *jsonUtils
	Paths  *paths.Paths
}

var instance *singleton
var once sync.Once
var configFilePath *string

func GetInstance() *singleton {
	Initialize()
	return instance
}

func Initialize() *singleton {
	once.Do(func() {
		initFlags()

		initConfig()
		initLog()
		initEnvs()
		instance = &singleton{
			Status: Idle,
			Paths:  paths.NewPaths(),
			JSON:   &jsonUtils{},
		}
	})

	return instance
}

// returns the path and config name
func parseConfigFilePath() (string, string) {
	dir := filepath.Dir(*configFilePath)
	name := filepath.Base(*configFilePath)
	extension := filepath.Ext(*configFilePath)
	name = strings.TrimSuffix(name, extension)
	return dir, name
}

func initConfig() {
	if *configFilePath != "" {
		dir, name := parseConfigFilePath()
		viper.SetConfigName(name)
		viper.AddConfigPath(dir)
	} else {
		// The config file is called config.  Leave off the file extension.
		viper.SetConfigName(paths.GetConfigName())
		viper.AddConfigPath(".") // Look for config in the working directory
	}

	err := viper.ReadInConfig() // Find and read the config file
	if err != nil {             // Handle errors reading the config file
		defaultConfigFilePath := paths.GetDefaultConfigFilePath()
		if *configFilePath != "" {
			defaultConfigFilePath = *configFilePath
		}

		_ = utils.Touch(defaultConfigFilePath)
		if err = viper.ReadInConfig(); err != nil {
			panic(err)
		}
	}

	if err = config.SetInitialConfig(); err != nil {
		panic(err)
	}

	// TODO - need a smarter way to do this. What if one is set and not the
	// other.
	viper.SetDefault(config.DatabaseType, "sqlite3")
	viper.SetDefault(config.Database, paths.GetDefaultDatabaseFilePath())

	if err := viper.BindPFlags(pflag.CommandLine); err != nil {
		logger.Infof("failed to bind flags: %s", err.Error())
	}
}

func initFlags() {
	pflag.IP("host", net.IPv4(0, 0, 0, 0), "ip address for the host")
	pflag.Int("port", 9998, "port to serve from")
	configFilePath = pflag.String("config_file", "", "location of the config file")

	pflag.Parse()
}

func initEnvs() {
	viper.SetEnvPrefix("stash") // will be uppercased automatically
	viper.BindEnv("host")       // STASH_HOST
	viper.BindEnv("port")       // STASH_PORT
	viper.BindEnv("stash")      // STASH_STASH
}

func initLog() {
	logger.Init(config.GetLogFile(), config.GetLogOut(), config.GetLogLevel())
}
