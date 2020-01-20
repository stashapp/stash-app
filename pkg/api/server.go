package api

import (
	"context"
	"crypto/tls"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"runtime/debug"
	"strconv"
	"strings"

	"github.com/99designs/gqlgen/handler"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/gobuffalo/packr/v2"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"github.com/stashapp/stashdb/pkg/logger"
	"github.com/stashapp/stashdb/pkg/manager"
	"github.com/stashapp/stashdb/pkg/manager/config"
	"github.com/stashapp/stashdb/pkg/manager/paths"
	"github.com/stashapp/stashdb/pkg/models"
)

var buildstamp string = ""
var githash string = ""

var setupUIBox *packr.Box

const ApiKeyHeader = "ApiKey"

func getUserAndRoles(userID string) (*models.User, []models.RoleEnum, error) {
	user, err := manager.GetUser(userID)
	if err != nil {
		return nil, nil, err
	}

	roles, err := manager.GetUserRoles(userID)
	if err != nil {
		return nil, nil, err
	}

	return user, roles, nil
}

// returns the userID, a boolean set to true if api key was used, and an error
func getRequestUserID(w http.ResponseWriter, r *http.Request) (string, bool, error) {
	userID := ""
	isAPIKey := false
	var err error

	// translate api key into current user, if present
	apiKey := r.Header.Get(ApiKeyHeader)
	if apiKey != "" {
		isAPIKey = true
		userID, err = manager.GetUserIDFromAPIKey(apiKey)
	} else {
		// handle session
		userID, err = getSessionUserID(w, r)
	}

	return userID, isAPIKey, err
}

func authenticateHandler() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()

			// translate api key into current user, if present
			userID := ""
			apiKey := r.Header.Get(ApiKeyHeader)
			var err error
			if apiKey != "" {
				userID, err = manager.GetUserIDFromAPIKey(apiKey)
			} else {
				// handle session
				userID, err = getSessionUserID(w, r)
			}

			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte(err.Error()))
				return
			}

			user, roles, err := getUserAndRoles(userID)

			// ensure api key of the user matches the passed one
			if apiKey != "" && user != nil && user.APIKey != apiKey {
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte(err.Error()))
				return
			}

			// TODO - increment api key counters

			ctx = context.WithValue(ctx, ContextUser, user)
			ctx = context.WithValue(ctx, ContextRoles, roles)

			r = r.WithContext(ctx)

			next.ServeHTTP(w, r)
		})
	}
}

func Start() {
	setupUIBox = packr.New("Setup UI Box", "../../ui/setup")

	r := chi.NewRouter()

	r.Use(authenticateHandler())
	r.Use(middleware.Recoverer)

	r.Use(middleware.DefaultCompress)
	r.Use(middleware.StripSlashes)
	r.Use(cors.AllowAll().Handler)
	r.Use(BaseURLMiddleware)

	recoverFunc := handler.RecoverFunc(func(ctx context.Context, err interface{}) error {
		logger.Error(err)
		debug.PrintStack()

		message := fmt.Sprintf("Internal system error. Error <%v>", err)
		return errors.New(message)
	})
	requestMiddleware := handler.RequestMiddleware(func(ctx context.Context, next func(ctx context.Context) []byte) []byte {
		//api.GetRequestContext(ctx).Variables[]
		return next(ctx)
	})
	websocketUpgrader := handler.WebsocketUpgrader(websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	})
	gqlHandler := handler.GraphQL(models.NewExecutableSchema(models.Config{Resolvers: &Resolver{}}), recoverFunc, requestMiddleware, websocketUpgrader)

	r.Handle("/graphql", gqlHandler)

	// TODO - this should be disabled in production
	r.Handle("/playground", handler.Playground("GraphQL playground", "/graphql"))

	// session handlers
	r.HandleFunc("/login", handleLogin)
	r.HandleFunc("/logout", handleLogout)

	address := config.GetHost() + ":" + strconv.Itoa(config.GetPort())
	if tlsConfig := makeTLSConfig(); tlsConfig != nil {
		httpsServer := &http.Server{
			Addr:      address,
			Handler:   r,
			TLSConfig: tlsConfig,
		}

		go func() {
			printVersion()
			logger.Infof("stashdb is running on HTTPS at https://" + address + "/")
			logger.Fatal(httpsServer.ListenAndServeTLS("", ""))
		}()
	} else {
		server := &http.Server{
			Addr:    address,
			Handler: r,
		}

		go func() {
			printVersion()
			logger.Infof("stashdb is running on HTTP at http://" + address + "/")
			logger.Fatal(server.ListenAndServe())
		}()
	}
}

func printVersion() {
	fmt.Printf("stashdb version: %s (%s)\n", githash, buildstamp)
}

func GetVersion() (string, string) {
	return githash, buildstamp
}

func makeTLSConfig() *tls.Config {
	cert, err := ioutil.ReadFile(paths.GetSSLCert())
	if err != nil {
		return nil
	}

	key, err := ioutil.ReadFile(paths.GetSSLKey())
	if err != nil {
		return nil
	}

	certs := make([]tls.Certificate, 1)
	certs[0], err = tls.X509KeyPair(cert, key)
	if err != nil {
		return nil
	}
	tlsConfig := &tls.Config{
		Certificates: certs,
	}

	return tlsConfig
}

type contextKey struct {
	name string
}

var (
	BaseURLCtxKey = &contextKey{"BaseURL"}
)

func BaseURLMiddleware(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		var scheme string
		if strings.Compare("https", r.URL.Scheme) == 0 || r.Proto == "HTTP/2.0" || r.Header.Get("X-Forwarded-Proto") == "https" {
			scheme = "https"
		} else {
			scheme = "http"
		}
		baseURL := scheme + "://" + r.Host

		r = r.WithContext(context.WithValue(ctx, BaseURLCtxKey, baseURL))

		next.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}
