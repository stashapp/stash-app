package paths

import (
	"path/filepath"

	"github.com/stashapp/stash-box/pkg/manager/config"
)

type jsonPaths struct {
	MappingsFile string

	Performers string
	Scenes     string
	Studios    string
}

func newJSONPaths() *jsonPaths {
	jp := jsonPaths{}
	jp.MappingsFile = filepath.Join(config.GetMetadataPath(), "mappings.json")
	jp.Performers = filepath.Join(config.GetMetadataPath(), "performers")
	jp.Scenes = filepath.Join(config.GetMetadataPath(), "scenes")
	jp.Studios = filepath.Join(config.GetMetadataPath(), "studios")
	return &jp
}

func (jp *jsonPaths) PerformerJSONPath(checksum string) string {
	return filepath.Join(jp.Performers, checksum+".json")
}

func (jp *jsonPaths) SceneJSONPath(checksum string) string {
	return filepath.Join(jp.Scenes, checksum+".json")
}

func (jp *jsonPaths) StudioJSONPath(checksum string) string {
	return filepath.Join(jp.Studios, checksum+".json")
}
