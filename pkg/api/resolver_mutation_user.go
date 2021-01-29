package api

import (
	"context"
	"errors"
	"fmt"

	"github.com/gofrs/uuid"

	"github.com/stashapp/stash-box/pkg/database"
	"github.com/stashapp/stash-box/pkg/logger"
	"github.com/stashapp/stash-box/pkg/manager"
	"github.com/stashapp/stash-box/pkg/models"
	"github.com/stashapp/stash-box/pkg/user"
)

func (r *mutationResolver) UserCreate(ctx context.Context, input models.UserCreateInput) (*models.User, error) {
	if err := validateAdmin(ctx); err != nil {
		return nil, err
	}

	if err := user.ValidateCreate(input); err != nil {
		return nil, err
	}

	tx := database.DB.MustBeginTx(ctx, nil)

	u, err := user.Create(tx, input)

	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	// Commit
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return u, nil
}

func (r *mutationResolver) UserUpdate(ctx context.Context, input models.UserUpdateInput) (*models.User, error) {
	if err := validateAdmin(ctx); err != nil {
		return nil, err
	}

	tx := database.DB.MustBeginTx(ctx, nil)

	qb := models.NewUserQueryBuilder(tx)
	userID, _ := uuid.FromString(input.ID)
	current, err := qb.Find(userID)

	if err != nil {
		return nil, fmt.Errorf("error finding user: %s", err.Error())
	}

	if current == nil {
		return nil, fmt.Errorf("user not found for id %s", input.ID)
	}

	if err := user.ValidateUpdate(input, *current); err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	user, err := user.Update(tx, input)
	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	// Commit
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return user, nil
}

func (r *mutationResolver) UserDestroy(ctx context.Context, input models.UserDestroyInput) (bool, error) {
	if err := validateAdmin(ctx); err != nil {
		return false, err
	}

	tx := database.DB.MustBeginTx(ctx, nil)

	qb := models.NewUserQueryBuilder(tx)
	userID, _ := uuid.FromString(input.ID)
	u, err := qb.Find(userID)

	if err != nil {
		return false, fmt.Errorf("error finding user: %s", err.Error())
	}

	if u == nil {
		return false, fmt.Errorf("user not found for id %s", input.ID)
	}

	if err = user.ValidateDestroy(u); err != nil {
		_ = tx.Rollback()
		return false, err
	}

	ret, err := user.Destroy(tx, input)

	if err != nil {
		_ = tx.Rollback()
		return false, err
	}

	if err := tx.Commit(); err != nil {
		return false, err
	}

	return ret, nil
}

func (r *mutationResolver) RegenerateAPIKey(ctx context.Context, userID *string) (string, error) {
	currentUser := getCurrentUser(ctx)
	if currentUser == nil {
		return "", ErrUnauthorized
	}

	if userID != nil {
		if currentUser.ID.String() != *userID {
			// changing another user api key
			// must be admin
			if err := validateAdmin(ctx); err != nil {
				return "", err
			}
		}
	} else {
		// changing current user api key
		userIDStr := currentUser.ID.String()
		userID = &userIDStr
	}

	tx := database.DB.MustBeginTx(ctx, nil)

	ret, err := user.RegenerateAPIKey(tx, *userID)

	if err != nil {
		_ = tx.Rollback()
		return "", err
	}

	if err := tx.Commit(); err != nil {
		return "", err
	}

	return ret, err
}

func (r *mutationResolver) ResetPassword(ctx context.Context, input models.ResetPasswordInput) (bool, error) {
	err := database.WithTransaction(ctx, func(txn database.Transaction) error {
		return user.ResetPassword(txn.GetTx(), manager.GetInstance().EmailManager, input.Email)
	})

	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) ChangePassword(ctx context.Context, input models.UserChangePasswordInput) (bool, error) {
	currentUser := getCurrentUser(ctx)

	if input.ResetKey != nil {
		err := database.WithTransaction(ctx, func(txn database.Transaction) error {
			return user.ActivateResetPassword(txn.GetTx(), *input.ResetKey, input.NewPassword)
		})

		if err != nil {
			return false, err
		}

		return true, nil
	}

	// just setting password
	if currentUser == nil {
		return false, ErrUnauthorized
	}

	if input.ExistingPassword == nil {
		return false, user.ErrCurrentPasswordIncorrect
	}

	// changing current user password
	userIDStr := currentUser.ID.String()
	userID := userIDStr

	tx := database.DB.MustBeginTx(ctx, nil)

	err := user.ChangePassword(tx, userID, *input.ExistingPassword, input.NewPassword)
	if err != nil {
		_ = tx.Rollback()
		return false, err
	}

	if err := tx.Commit(); err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) NewUser(ctx context.Context, input models.NewUserInput) (*string, error) {
	inviteKey := ""
	if input.InviteKey != nil {
		inviteKey = *input.InviteKey
	}

	var ret *string
	err := database.WithTransaction(ctx, func(txn database.Transaction) error {
		var txnErr error
		ret, txnErr = user.NewUser(txn.GetTx(), manager.GetInstance().EmailManager, input.Email, inviteKey)
		return txnErr
	})

	if err != nil {
		return nil, err
	}

	return ret, nil
}

func (r *mutationResolver) ActivateNewUser(ctx context.Context, input models.ActivateNewUserInput) (*models.User, error) {
	var ret *models.User
	err := database.WithTransaction(ctx, func(txn database.Transaction) error {
		var txnErr error
		ret, txnErr = user.ActivateNewUser(txn.GetTx(), input.Name, input.Email, input.ActivationKey, input.Password)
		return txnErr
	})

	if err != nil {
		return nil, err
	}

	return ret, nil
}

func (r *mutationResolver) GenerateInviteCode(ctx context.Context) (string, error) {
	// INVITE role allows generating invite keys without tokens
	requireToken := true
	if err := validateInvite(ctx); err == nil {
		requireToken = false
	}

	currentUser := getCurrentUser(ctx)
	var ret string
	err := database.WithTransaction(ctx, func(txn database.Transaction) error {
		uqb := models.NewUserQueryBuilder(txn.GetTx())
		ikqb := models.NewInviteCodeQueryBuilder(txn.GetTx())

		var txnErr error
		ret, txnErr = user.GenerateInviteKey(&uqb, &ikqb, currentUser.ID, requireToken)
		if txnErr != nil {
			return txnErr
		}

		// log the operation
		logger.Userf(currentUser.Name, "GenerateInviteCode", "%s", ret)

		return nil
	})

	if err != nil {
		return "", err
	}

	return ret, nil
}

func (r *mutationResolver) RescindInviteCode(ctx context.Context, code string) (bool, error) {
	// INVITE role allows generating invite keys without tokens
	requireToken := true
	if err := validateInvite(ctx); err == nil {
		requireToken = false
	}

	tokenManagerErr := validateManageInvites(ctx)

	currentUser := getCurrentUser(ctx)
	err := database.WithTransaction(ctx, func(txn database.Transaction) error {
		uqb := models.NewUserQueryBuilder(txn.GetTx())
		ikqb := models.NewInviteCodeQueryBuilder(txn.GetTx())

		inviteKeyID, _ := uuid.FromString(code)
		userID := currentUser.ID

		// non-token managers may only rescind their own invite code
		if tokenManagerErr == nil {
			inviteKey, err := ikqb.Find(inviteKeyID)
			if err != nil {
				return err
			}

			if inviteKey == nil {
				return errors.New("invalid key")
			}

			userID = inviteKey.GeneratedBy
		}

		txnErr := user.RescindInviteKey(&uqb, &ikqb, inviteKeyID, userID, requireToken)
		if txnErr != nil {
			return txnErr
		}

		// log the operation
		logger.Userf(currentUser.Name, "RescindInviteCode", "%s", code)

		return nil
	})

	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) GrantInvite(ctx context.Context, input models.GrantInviteInput) (int, error) {
	if err := validateManageInvites(ctx); err != nil {
		return 0, err
	}

	currentUser := getCurrentUser(ctx)
	var ret int
	err := database.WithTransaction(ctx, func(txn database.Transaction) error {
		qb := models.NewUserQueryBuilder(txn.GetTx())
		userID, _ := uuid.FromString(input.UserID)

		var txnErr error
		ret, txnErr = user.GrantInviteTokens(&qb, userID, input.Amount)
		if txnErr != nil {
			return txnErr
		}

		// log the operation
		logger.Userf(currentUser.Name, "GrantInvite", "+ %d to %s = %d", input.Amount, userID.String(), ret)

		return nil
	})

	if err != nil {
		return 0, err
	}

	return ret, nil
}

func (r *mutationResolver) RevokeInvite(ctx context.Context, input models.RevokeInviteInput) (int, error) {
	if err := validateManageInvites(ctx); err != nil {
		return 0, err
	}

	currentUser := getCurrentUser(ctx)
	var ret int
	err := database.WithTransaction(ctx, func(txn database.Transaction) error {
		qb := models.NewUserQueryBuilder(txn.GetTx())
		userID, _ := uuid.FromString(input.UserID)

		var txnErr error
		ret, txnErr = user.RepealInviteTokens(&qb, userID, input.Amount)
		if txnErr != nil {
			return txnErr
		}

		// log the operation
		logger.Userf(currentUser.Name, "RevokeInvite", "- %d to %s = %d", input.Amount, userID.String(), ret)

		return nil
	})

	if err != nil {
		return 0, err
	}

	return ret, nil
}
