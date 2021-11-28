package api

import (
	"context"

	"github.com/gofrs/uuid"

	"github.com/stashapp/stash-box/pkg/models"
)

func (r *queryResolver) FindPerformer(ctx context.Context, id string) (*models.Performer, error) {
	fac := r.getRepoFactory(ctx)
	qb := fac.Performer()

	idUUID, _ := uuid.FromString(id)
	return qb.Find(idUUID)
}

func (r *queryResolver) QueryPerformers(ctx context.Context, performerFilter *models.PerformerFilterType, filter *models.QuerySpec) (*models.PerformerQuery, error) {
	return &models.PerformerQuery{
		PerformerFilter: performerFilter,
		Filter:          filter,
	}, nil
}

type queryPerformerResolver struct{ *Resolver }

func (r *queryPerformerResolver) Count(ctx context.Context, obj *models.PerformerQuery) (int, error) {
	fac := r.getRepoFactory(ctx)
	qb := fac.Performer()
	return qb.QueryCount(obj.PerformerFilter, obj.Filter)
}

func (r *queryPerformerResolver) Performers(ctx context.Context, obj *models.PerformerQuery) ([]*models.Performer, error) {
	fac := r.getRepoFactory(ctx)
	qb := fac.Performer()
	return qb.QueryPerformers(obj.PerformerFilter, obj.Filter)
}
