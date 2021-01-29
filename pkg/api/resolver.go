package api

import (
	"context"

	"github.com/99designs/gqlgen/graphql"

	"github.com/stashapp/stash-box/pkg/models"
	"github.com/stashapp/stash-box/pkg/utils"
)

type Resolver struct{}

func (r *Resolver) Mutation() models.MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Edit() models.EditResolver {
	return &editResolver{r}
}
func (r *Resolver) EditComment() models.EditCommentResolver {
	return &editCommentResolver{r}
}
func (r *Resolver) Performer() models.PerformerResolver {
	return &performerResolver{r}
}
func (r *Resolver) Tag() models.TagResolver {
	return &tagResolver{r}
}
func (r *Resolver) Image() models.ImageResolver {
	return &imageResolver{r}
}
func (r *Resolver) Studio() models.StudioResolver {
	return &studioResolver{r}
}
func (r *Resolver) Scene() models.SceneResolver {
	return &sceneResolver{r}
}
func (r *Resolver) User() models.UserResolver {
	return &userResolver{r}
}
func (r *Resolver) Query() models.QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

type queryResolver struct{ *Resolver }

func (r *queryResolver) Version(ctx context.Context) (*models.Version, error) {
	panic("not implemented")
}

// wasFieldIncluded returns true if the given field was included in the request.
// Slices are unmarshalled to empty slices even if the field was omitted. This
// method determines if it was omitted altogether.
func wasFieldIncluded(ctx context.Context, qualifiedField string) bool {
	rctx := graphql.GetRequestContext(ctx)

	if rctx != nil {
		_, ret := utils.FindField(rctx.Variables, qualifiedField)
		return ret
	}

	return false
}

func wasFieldIncludedFunc(ctx context.Context) func(qualifiedField string) bool {
	return func(qualifiedField string) bool {
		return wasFieldIncluded(ctx, qualifiedField)
	}
}
