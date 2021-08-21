package api

import (
	"context"
	"errors"
	"sort"
	"time"

	"github.com/gofrs/uuid"
	"github.com/stashapp/stash-box/pkg/models"
	"github.com/stashapp/stash-box/pkg/utils"
)

type editResolver struct{ *Resolver }

func (r *editResolver) ID(ctx context.Context, obj *models.Edit) (string, error) {
	return obj.ID.String(), nil
}

func (r *editResolver) User(ctx context.Context, obj *models.Edit) (*models.User, error) {
	fac := r.getRepoFactory(ctx)
	qb := fac.User()
	user, err := qb.Find(obj.UserID)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *editResolver) Created(ctx context.Context, obj *models.Edit) (*time.Time, error) {
	return &obj.CreatedAt.Timestamp, nil
}

func (r *editResolver) Updated(ctx context.Context, obj *models.Edit) (*time.Time, error) {
	return &obj.UpdatedAt.Timestamp, nil
}

func (r *editResolver) Target(ctx context.Context, obj *models.Edit) (models.EditTarget, error) {
	var operation models.OperationEnum
	var status models.VoteStatusEnum
	utils.ResolveEnumString(obj.Operation, &operation)
	utils.ResolveEnumString(obj.Status, &status)
	if operation == models.OperationEnumCreate && status != models.VoteStatusEnumAccepted && status != models.VoteStatusEnumImmediateAccepted {
		return nil, nil
	}

	fac := r.getRepoFactory(ctx)
	eqb := fac.Edit()

	var targetType models.TargetTypeEnum
	utils.ResolveEnumString(obj.TargetType, &targetType)
	if targetType == "TAG" {
		tagID, err := eqb.FindTagID(obj.ID)
		if err != nil {
			return nil, err
		}

		tqb := fac.Tag()
		target, err := tqb.Find(*tagID)
		if err != nil {
			return nil, err
		}

		return target, nil
	} else if targetType == "PERFORMER" {
		performerID, err := eqb.FindPerformerID(obj.ID)
		if err != nil {
			return nil, err
		}

		pqb := fac.Performer()
		target, err := pqb.Find(*performerID)
		if err != nil {
			return nil, err
		}

		return target, nil
	} else {
		return nil, errors.New("not implemented")
	}
}

func (r *editResolver) TargetType(ctx context.Context, obj *models.Edit) (models.TargetTypeEnum, error) {
	var ret models.TargetTypeEnum
	if !utils.ResolveEnumString(obj.TargetType, &ret) {
		return "", nil
	}

	return ret, nil
}

func (r *editResolver) MergeSources(ctx context.Context, obj *models.Edit) ([]models.EditTarget, error) {
	mergeSources := []models.EditTarget{}
	editData := obj.GetData()
	if editData == nil {
		return mergeSources, nil
	}

	if len(editData.MergeSources) > 0 {
		fac := r.getRepoFactory(ctx)
		var ret models.TargetTypeEnum
		utils.ResolveEnumString(obj.TargetType, &ret)
		if ret == "TAG" {
			tqb := fac.Tag()
			for _, tagStringID := range editData.MergeSources {
				tagID, _ := uuid.FromString(tagStringID)
				tag, err := tqb.Find(tagID)
				if err == nil {
					mergeSources = append(mergeSources, tag)
				}
			}
		} else if ret == "PERFORMER" {
			pqb := fac.Performer()
			for _, performerStringID := range editData.MergeSources {
				performerID, _ := uuid.FromString(performerStringID)
				performer, err := pqb.Find(performerID)
				if err == nil {
					mergeSources = append(mergeSources, performer)
				}
			}
		} else {
			return nil, errors.New("not implemented")
		}
	}
	return mergeSources, nil
}

func (r *editResolver) Operation(ctx context.Context, obj *models.Edit) (models.OperationEnum, error) {
	var ret models.OperationEnum
	if !utils.ResolveEnumString(obj.Operation, &ret) {
		return "", nil
	}

	return ret, nil
}

func (r *editResolver) Details(ctx context.Context, obj *models.Edit) (models.EditDetails, error) {
	var ret models.EditDetails
	var targetType models.TargetTypeEnum
	utils.ResolveEnumString(obj.TargetType, &targetType)
	if targetType == "TAG" {
		tagData, err := obj.GetTagData()
		if err != nil {
			return nil, err
		}
		ret = tagData.New
	} else if targetType == "PERFORMER" {
		performerData, err := obj.GetPerformerData()
		if err != nil {
			return nil, err
		}
		ret = performerData.New
	}

	return ret, nil
}

func (r *editResolver) OldDetails(ctx context.Context, obj *models.Edit) (models.EditDetails, error) {
	var ret models.EditDetails
	var targetType models.TargetTypeEnum
	utils.ResolveEnumString(obj.TargetType, &targetType)
	if targetType == "TAG" {
		tagData, err := obj.GetTagData()
		if err != nil {
			return nil, err
		}
		ret = tagData.Old
	} else if targetType == "PERFORMER" {
		performerData, err := obj.GetPerformerData()
		if err != nil {
			return nil, err
		}
		ret = performerData.Old
	}

	return ret, nil
}

func (r *editResolver) Comments(ctx context.Context, obj *models.Edit) ([]*models.EditComment, error) {
	fac := r.getRepoFactory(ctx)
	qb := fac.Edit()
	comments, err := qb.GetComments(obj.ID)

	if err != nil {
		return nil, err
	}

	var ret []*models.EditComment
	for _, comment := range comments {
		ret = append(ret, comment)
	}

	sort.Slice(comments, func(i, j int) bool {
		return comments[i].CreatedAt.Timestamp.Before(comments[j].CreatedAt.Timestamp)
	})

	return ret, nil
}

func (r *editResolver) Votes(ctx context.Context, obj *models.Edit) ([]*models.VoteComment, error) {
	// TODO
	return nil, nil
}

func (r *editResolver) Status(ctx context.Context, obj *models.Edit) (models.VoteStatusEnum, error) {
	var ret models.VoteStatusEnum
	if !utils.ResolveEnumString(obj.Status, &ret) {
		return "", nil
	}

	return ret, nil
}

func (r *editResolver) Options(ctx context.Context, obj *models.Edit) (*models.PerformerEditOptions, error) {
	if obj.TargetType == "PERFORMER" {
		data, err := obj.GetPerformerData()
		if err != nil {
			return nil, err
		}

		options := models.PerformerEditOptions{
			SetMergeAliases:  data.SetMergeAliases,
			SetModifyAliases: data.SetModifyAliases,
		}
		return &options, nil
	}
	return nil, nil
}
