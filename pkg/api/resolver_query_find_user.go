package api

import (
	"context"
	"github.com/gofrs/uuid"

	"github.com/stashapp/stashdb/pkg/models"
)

func (r *queryResolver) FindUser(ctx context.Context, id *string, username *string) (*models.User, error) {
	if err := validateRead(ctx); err != nil {
		return nil, err
	}

	qb := models.NewUserQueryBuilder(nil)

	var ret *models.User
	var err error
	if id != nil {
		idUUID, _ := uuid.FromString(*id)
		ret, err = qb.Find(idUUID)
	} else if username != nil {
		ret, err = qb.FindByName(*username)
	}

	if err != nil {
		return nil, err
	}

	// if not admin and user is not the current, then remove sensitive details
	users := models.Users{
		ret,
	}
	removeSensitiveUserDetails(ctx, users)

	return ret, nil
}

func (r *queryResolver) QueryUsers(ctx context.Context, userFilter *models.UserFilterType, filter *models.QuerySpec) (*models.QueryUsersResultType, error) {
	if err := validateRead(ctx); err != nil {
		return nil, err
	}

	qb := models.NewUserQueryBuilder(nil)

	users, count := qb.Query(userFilter, filter)
	removeSensitiveUserDetails(ctx, users)
	return &models.QueryUsersResultType{
		Users: users,
		Count: count,
	}, nil
}

func removeSensitiveUserDetails(ctx context.Context, users models.Users) {
	// don't need to remove details if we're admin
	if validateAdmin(ctx) == nil {
		return
	}

	// remove sensitive details for users that are not the current user
	userID := ""

	currentUser := getCurrentUser(ctx)
	if currentUser != nil {
		userID = currentUser.ID.String()
	}

	for _, u := range users {
		if u != nil && u.ID.String() != userID {
			u.RemoveSensitiveFields()
		}
	}
}
