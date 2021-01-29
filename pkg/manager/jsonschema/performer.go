package jsonschema

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/stashapp/stash-box/pkg/models"
)

type Performer struct {
	Name         string          `json:"name,omitempty"`
	URL          string          `json:"url,omitempty"`
	Twitter      string          `json:"twitter,omitempty"`
	Instagram    string          `json:"instagram,omitempty"`
	Birthdate    string          `json:"birthdate,omitempty"`
	Ethnicity    string          `json:"ethnicity,omitempty"`
	Country      string          `json:"country,omitempty"`
	EyeColor     string          `json:"eye_color,omitempty"`
	Height       string          `json:"height,omitempty"`
	Measurements string          `json:"measurements,omitempty"`
	FakeTits     string          `json:"fake_tits,omitempty"`
	CareerLength string          `json:"career_length,omitempty"`
	Tattoos      string          `json:"tattoos,omitempty"`
	Piercings    string          `json:"piercings,omitempty"`
	Aliases      []string        `json:"aliases,omitempty"`
	Favorite     bool            `json:"favorite,omitempty"`
	Image        string          `json:"image,omitempty"`
	CreatedAt    models.JSONTime `json:"created_at,omitempty"`
	UpdatedAt    models.JSONTime `json:"updated_at,omitempty"`
}

func LoadPerformerFile(filePath string) (*Performer, error) {
	var performer Performer
	file, err := os.Open(filePath)
	defer file.Close()
	if err != nil {
		return nil, err
	}
	jsonParser := json.NewDecoder(file)
	err = jsonParser.Decode(&performer)
	if err != nil {
		return nil, err
	}
	return &performer, nil
}

func SavePerformerFile(filePath string, performer *Performer) error {
	if performer == nil {
		return fmt.Errorf("performer must not be nil")
	}
	return marshalToFile(filePath, performer)
}
