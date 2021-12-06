package api

import (
	"context"

	"github.com/stashapp/stash-box/pkg/models"
)

type tagEditResolver struct{ *Resolver }

func (r *tagEditResolver) Category(ctx context.Context, obj *models.TagEdit) (*models.TagCategory, error) {
	if obj.CategoryID == nil {
		return nil, nil
	}

	qb := r.getRepoFactory(ctx).TagCategory()
	return qb.Find(*obj.CategoryID)
}
