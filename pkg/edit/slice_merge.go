package edit

import (
	"github.com/gofrs/uuid"
	"github.com/stashapp/stash-box/pkg/models"
	"github.com/stashapp/stash-box/pkg/utils"
)

func MergeImages(current []*models.Image, added []uuid.UUID, removed []uuid.UUID) []uuid.UUID {
	var imageIds []uuid.UUID
	for _, image := range current {
		imageIds = append(imageIds, image.ID)
	}
	return utils.ProcessSlice(imageIds, added, removed)
}

func MergeURLs(currentURLs []*models.URL, addedURLs []*models.URL, removedURLs []*models.URL) []*models.URL {
	var urls []models.URL
	for _, v := range currentURLs {
		urls = append(urls, *v)
	}
	var added []models.URL
	for _, v := range addedURLs {
		added = append(added, *v)
	}
	var removed []models.URL
	for _, v := range removedURLs {
		removed = append(removed, *v)
	}

	urls = utils.ProcessSlice(urls, added, removed)
	var ret []*models.URL
	for i := range urls {
		ret = append(ret, &urls[i])
	}

	return ret
}

func MergeBodyMods(currentBodyMods models.PerformerBodyMods, addedMods []*models.BodyModification, removedMods []*models.BodyModification) []*models.BodyModification {
	type bodyMod struct {
		Description string
		Location    string
	}
	var current []bodyMod
	for _, v := range currentBodyMods {
		current = append(current, bodyMod{
			Description: v.Description.String,
			Location:    v.Location,
		})
	}
	var added []bodyMod
	for _, v := range addedMods {
		added = append(added, bodyMod{
			Description: utils.StrPtrToString(v.Description),
			Location:    v.Location,
		})
	}
	var removed []bodyMod
	for _, v := range removedMods {
		removed = append(removed, bodyMod{
			Description: utils.StrPtrToString(v.Description),
			Location:    v.Location,
		})
	}

	current = utils.ProcessSlice(current, added, removed)
	var ret []*models.BodyModification
	for i := range current {
		ret = append(ret, &models.BodyModification{
			Description: utils.StringToStrPtr(current[i].Description),
			Location:    current[i].Location,
		})
	}

	return ret
}
