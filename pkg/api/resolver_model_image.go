package api

import (
	"context"

	"github.com/gofrs/uuid"
	"github.com/stashapp/stash-box/pkg/api/urlbuilders"
	"github.com/stashapp/stash-box/pkg/dataloader"
	"github.com/stashapp/stash-box/pkg/manager/config"
	"github.com/stashapp/stash-box/pkg/models"
)

type imageResolver struct{ *Resolver }

func (r *imageResolver) ID(ctx context.Context, obj *models.Image) (string, error) {
	return obj.ID.String(), nil
}
func (r *imageResolver) URL(ctx context.Context, obj *models.Image) (string, error) {
	if config.GetImageBackend() == config.FileBackend {
		baseURL, _ := ctx.Value(BaseURLCtxKey).(string)
		// SVGs don't have a pixel width/height
		isSVG := obj.Width == -1 && obj.Height == -1
		builder := urlbuilders.NewImageURLBuilder(baseURL, obj.ID, isSVG)
		return builder.GetImageURL(), nil
	} else if config.GetImageBackend() == config.S3Backend {
		builder := urlbuilders.NewS3ImageURLBuilder(obj)
		return builder.GetImageURL(), nil
	}

	return obj.RemoteURL.String, nil
}

func imageList(ctx context.Context, imageIDs []uuid.UUID) ([]*models.Image, error) {
	if len(imageIDs) == 0 {
		return nil, nil
	}

	images, errors := dataloader.For(ctx).ImageByID.LoadAll(imageIDs)
	for _, err := range errors {
		if err != nil {
			return nil, err
		}
	}
	return images, nil
}
