//go:build integration
// +build integration

package api_test

import (
	"reflect"
	"testing"

	"github.com/gofrs/uuid"
	"github.com/stashapp/stash-box/pkg/models"
)

type tagEditTestRunner struct {
	testRunner
}

func createTagEditTestRunner(t *testing.T) *tagEditTestRunner {
	return &tagEditTestRunner{
		testRunner: *asAdmin(t),
	}
}

func (s *tagEditTestRunner) testCreateTagEdit() {
	category, err := s.createTestTagCategory(nil)
	if err != nil {
		return
	}
	categoryID := category.ID
	name := "Name"
	description := "Description"
	tagEditDetailsInput := models.TagEditDetailsInput{
		Name:        &name,
		Description: &description,
		Aliases:     []string{"Alias1"},
		CategoryID:  &categoryID,
	}
	edit, err := s.createTestTagEdit(models.OperationEnumCreate, &tagEditDetailsInput, nil)
	if err == nil {
		s.verifyCreatedTagEdit(tagEditDetailsInput, edit)
	}
}

func (s *tagEditTestRunner) verifyCreatedTagEdit(input models.TagEditDetailsInput, edit *models.Edit) {
	r := s.resolver.Edit()

	if edit.ID == uuid.Nil {
		s.t.Errorf("Expected created edit id to be non-zero")
	}

	details, _ := r.Details(s.ctx, edit)
	tagDetails := details.(*models.TagEdit)

	s.verifyEditOperation(models.OperationEnumCreate.String(), edit)
	s.verifyEditStatus(models.VoteStatusEnumPending.String(), edit)
	s.verifyEditTargetType(models.TargetTypeEnumTag.String(), edit)
	s.verifyEditApplication(false, edit)

	// ensure basic attributes are set correctly
	if *input.Name != *tagDetails.Name {
		s.fieldMismatch(input.Name, tagDetails.Name, "Name")
	}

	if *input.Description != *tagDetails.Description {
		s.fieldMismatch(input.Description, tagDetails.Description, "Description")
	}

	if !reflect.DeepEqual(input.Aliases, tagDetails.AddedAliases) {
		s.fieldMismatch(input.Aliases, tagDetails.AddedAliases, "Aliases")
	}

	if *input.CategoryID != *tagDetails.CategoryID {
		s.fieldMismatch(*input.CategoryID, *tagDetails.CategoryID, "CategoryID")
	}
}

func (s *tagEditTestRunner) testFindEditById() {
	createdEdit, err := s.createTestTagEdit(models.OperationEnumCreate, nil, nil)
	if err != nil {
		return
	}

	edit, err := s.resolver.Query().FindEdit(s.ctx, createdEdit.ID)
	if err != nil {
		s.t.Errorf("Error finding edit: %s", err.Error())
		return
	}

	// ensure returned tag is not nil
	if edit == nil {
		s.t.Error("Did not find edit by id")
		return
	}
}

func (s *tagEditTestRunner) testModifyTagEdit() {
	existingCategory, err := s.createTestTagCategory(nil)
	if err != nil {
		return
	}
	existingCategoryID := existingCategory.ID
	existingName := "tagName"
	existingAlias := "tagAlias"
	tagCreateInput := models.TagCreateInput{
		Name:       existingName,
		Aliases:    []string{existingAlias},
		CategoryID: &existingCategoryID,
	}
	createdTag, err := s.createTestTag(&tagCreateInput)
	if err != nil {
		return
	}

	newCategory, err := s.createTestTagCategory(nil)
	if err != nil {
		return
	}
	newCategoryID := newCategory.ID
	newDescription := "newDescription"
	newAlias := "newTagAlias"
	newName := "newName"
	tagEditDetailsInput := models.TagEditDetailsInput{
		Name:        &newName,
		Description: &newDescription,
		Aliases:     []string{newAlias},
		CategoryID:  &newCategoryID,
	}
	id := createdTag.UUID()
	editInput := models.EditInput{
		Operation: models.OperationEnumModify,
		ID:        &id,
	}

	createdUpdateEdit, err := s.createTestTagEdit(models.OperationEnumModify, &tagEditDetailsInput, &editInput)

	s.verifyUpdatedTagEdit(createdTag, tagEditDetailsInput, createdUpdateEdit)
}

func (s *tagEditTestRunner) verifyUpdatedTagEdit(originalTag *tagOutput, input models.TagEditDetailsInput, edit *models.Edit) {
	tagDetails := s.getEditTagDetails(edit)

	s.verifyEditOperation(models.OperationEnumModify.String(), edit)
	s.verifyEditStatus(models.VoteStatusEnumPending.String(), edit)
	s.verifyEditTargetType(models.TargetTypeEnumTag.String(), edit)
	s.verifyEditApplication(false, edit)

	// ensure basic attributes are set correctly
	if *input.Name != *tagDetails.Name {
		s.fieldMismatch(*input.Name, *tagDetails.Name, "Name")
	}

	if *input.Description != *tagDetails.Description {
		s.fieldMismatch(input.Description, tagDetails.Description, "Description")
	}

	tagAliases := originalTag.Aliases
	if !reflect.DeepEqual(tagAliases, tagDetails.RemovedAliases) {
		s.fieldMismatch(tagAliases, tagDetails.RemovedAliases, "RemovedAliases")
	}

	if !reflect.DeepEqual(input.Aliases, tagDetails.AddedAliases) {
		s.fieldMismatch(input.Aliases, tagDetails.AddedAliases, "AddedAliases")
	}

	if *input.CategoryID != *tagDetails.CategoryID {
		s.fieldMismatch(*input.CategoryID, *tagDetails.CategoryID, "CategoryID")
	}
}

func (s *tagEditTestRunner) testDestroyTagEdit() {
	createdTag, err := s.createTestTag(nil)
	if err != nil {
		return
	}

	tagID := createdTag.UUID()

	tagEditDetailsInput := models.TagEditDetailsInput{}
	editInput := models.EditInput{
		Operation: models.OperationEnumDestroy,
		ID:        &tagID,
	}
	destroyEdit, err := s.createTestTagEdit(models.OperationEnumDestroy, &tagEditDetailsInput, &editInput)

	s.verifyDestroyTagEdit(tagID, destroyEdit)
}

func (s *tagEditTestRunner) verifyDestroyTagEdit(tagID uuid.UUID, edit *models.Edit) {
	s.verifyEditOperation(models.OperationEnumDestroy.String(), edit)
	s.verifyEditStatus(models.VoteStatusEnumPending.String(), edit)
	s.verifyEditTargetType(models.TargetTypeEnumTag.String(), edit)
	s.verifyEditApplication(false, edit)

	editTarget := s.getEditTagTarget(edit)

	if tagID != editTarget.ID {
		s.fieldMismatch(tagID, editTarget.ID.String(), "ID")
	}
}

func (s *tagEditTestRunner) testMergeTagEdit() {
	existingName := "tagName2"
	existingAlias := "tagAlias2"
	tagCreateInput := models.TagCreateInput{
		Name:    existingName,
		Aliases: []string{existingAlias},
	}
	createdPrimaryTag, err := s.createTestTag(&tagCreateInput)
	if err != nil {
		return
	}

	createdMergeTag, err := s.createTestTag(nil)

	newDescription := "newDescription2"
	newAlias := "newTagAlias2"
	newName := "newName2"
	tagEditDetailsInput := models.TagEditDetailsInput{
		Name:        &newName,
		Description: &newDescription,
		Aliases:     []string{newAlias},
	}
	id := createdPrimaryTag.UUID()
	mergeSources := []uuid.UUID{createdMergeTag.UUID()}
	editInput := models.EditInput{
		Operation:      models.OperationEnumMerge,
		ID:             &id,
		MergeSourceIds: mergeSources,
	}

	createdMergeEdit, err := s.createTestTagEdit(models.OperationEnumMerge, &tagEditDetailsInput, &editInput)

	s.verifyMergeTagEdit(createdPrimaryTag, tagEditDetailsInput, createdMergeEdit, mergeSources)
}

func (s *tagEditTestRunner) verifyMergeTagEdit(originalTag *tagOutput, input models.TagEditDetailsInput, edit *models.Edit, inputMergeSources []uuid.UUID) {
	tagDetails := s.getEditTagDetails(edit)

	s.verifyEditOperation(models.OperationEnumMerge.String(), edit)
	s.verifyEditStatus(models.VoteStatusEnumPending.String(), edit)
	s.verifyEditTargetType(models.TargetTypeEnumTag.String(), edit)
	s.verifyEditApplication(false, edit)

	// ensure basic attributes are set correctly
	if *input.Name != *tagDetails.Name {
		s.fieldMismatch(*input.Name, *tagDetails.Name, "Name")
	}

	if *input.Description != *tagDetails.Description {
		s.fieldMismatch(input.Description, tagDetails.Description, "Description")
	}

	tagAliases := originalTag.Aliases
	if !reflect.DeepEqual(tagAliases, tagDetails.RemovedAliases) {
		s.fieldMismatch(tagAliases, tagDetails.RemovedAliases, "RemovedAliases")
	}

	if !reflect.DeepEqual(input.Aliases, tagDetails.AddedAliases) {
		s.fieldMismatch(input.Aliases, tagDetails.AddedAliases, "AddedAliases")
	}

	var mergeSources []uuid.UUID
	merges, _ := s.resolver.Edit().MergeSources(s.ctx, edit)
	for i := range merges {
		merge := merges[i].(*models.Tag)
		mergeSources = append(mergeSources, merge.ID)
	}
	if !reflect.DeepEqual(inputMergeSources, mergeSources) {
		s.fieldMismatch(inputMergeSources, mergeSources, "MergeSources")
	}
}

func (s *tagEditTestRunner) testApplyCreateTagEdit() {
	name := "Name"
	description := "Description"
	category, err := s.createTestTagCategory(nil)
	if err != nil {
		return
	}
	categoryID := category.ID
	tagEditDetailsInput := models.TagEditDetailsInput{
		Name:        &name,
		Description: &description,
		Aliases:     []string{"Alias1"},
		CategoryID:  &categoryID,
	}
	edit, err := s.createTestTagEdit(models.OperationEnumCreate, &tagEditDetailsInput, nil)
	appliedEdit, err := s.applyEdit(edit.ID)
	if err == nil {
		s.verifyAppliedTagCreateEdit(tagEditDetailsInput, appliedEdit)
	}
}

func (s *tagEditTestRunner) verifyAppliedTagCreateEdit(input models.TagEditDetailsInput, edit *models.Edit) {
	if edit.ID == uuid.Nil {
		s.t.Errorf("Expected created edit id to be non-zero")
	}

	s.verifyEditOperation(models.OperationEnumCreate.String(), edit)
	s.verifyEditStatus(models.VoteStatusEnumImmediateAccepted.String(), edit)
	s.verifyEditTargetType(models.TargetTypeEnumTag.String(), edit)
	s.verifyEditApplication(true, edit)

	tag := s.getEditTagTarget(edit)

	// ensure basic attributes are set correctly
	if *input.Name != tag.Name {
		s.fieldMismatch(input.Name, tag.Name, "Name")
	}

	desc, _ := s.resolver.Tag().Description(s.ctx, tag)
	if *input.Description != *desc {
		s.fieldMismatch(*input.Description, *desc, "Description")
	}

	aliases, _ := s.resolver.Tag().Aliases(s.ctx, tag)
	if !reflect.DeepEqual(input.Aliases, aliases) {
		s.fieldMismatch(input.Aliases, aliases, "Aliases")
	}

	if *input.CategoryID != tag.CategoryID.UUID {
		s.fieldMismatch(*input.CategoryID, tag.CategoryID.UUID.String(), "CategoryID")
	}
}

func (s *tagEditTestRunner) testApplyModifyTagEdit() {
	existingName := "tagName3"
	existingAlias := "tagAlias3"
	tagCreateInput := models.TagCreateInput{
		Name:    existingName,
		Aliases: []string{existingAlias},
	}
	createdTag, err := s.createTestTag(&tagCreateInput)
	if err != nil {
		return
	}

	newDescription := "newDescription3"
	newAlias := "newTagAlias3"
	newName := "newName3"
	newCategory, err := s.createTestTagCategory(nil)
	if err != nil {
		return
	}
	newCategoryID := newCategory.ID
	tagEditDetailsInput := models.TagEditDetailsInput{
		Name:        &newName,
		Description: &newDescription,
		Aliases:     []string{newAlias},
		CategoryID:  &newCategoryID,
	}
	id := createdTag.UUID()
	editInput := models.EditInput{
		Operation: models.OperationEnumModify,
		ID:        &id,
	}

	createdUpdateEdit, err := s.createTestTagEdit(models.OperationEnumModify, &tagEditDetailsInput, &editInput)
	if err != nil {
		return
	}
	appliedEdit, err := s.applyEdit(createdUpdateEdit.ID)
	if err != nil {
		return
	}

	modifiedTag, _ := s.resolver.Query().FindTag(s.ctx, &id, nil)
	s.verifyApplyModifyTagEdit(tagEditDetailsInput, modifiedTag, appliedEdit)
}

func (s *tagEditTestRunner) verifyApplyModifyTagEdit(input models.TagEditDetailsInput, updatedTag *models.Tag, edit *models.Edit) {
	s.verifyEditOperation(models.OperationEnumModify.String(), edit)
	s.verifyEditStatus(models.VoteStatusEnumImmediateAccepted.String(), edit)
	s.verifyEditTargetType(models.TargetTypeEnumTag.String(), edit)
	s.verifyEditApplication(true, edit)

	// ensure basic attributes are set correctly
	if *input.Name != updatedTag.Name {
		s.fieldMismatch(*input.Name, updatedTag.Name, "Name")
	}

	updatedDesc, _ := s.resolver.Tag().Description(s.ctx, updatedTag)
	if *input.Description != *updatedDesc {
		s.fieldMismatch(*input.Description, *updatedDesc, "Description")
	}

	tagAliases, _ := s.resolver.Tag().Aliases(s.ctx, updatedTag)
	if !reflect.DeepEqual(input.Aliases, tagAliases) {
		s.fieldMismatch(tagAliases, input.Aliases, "Aliases")
	}

	if !updatedTag.CategoryID.Valid || *input.CategoryID != updatedTag.CategoryID.UUID {
		s.fieldMismatch(*input.CategoryID, updatedTag.CategoryID.UUID.String(), "CategoryID")
	}
}

func (s *tagEditTestRunner) testApplyDestroyTagEdit() {
	createdTag, err := s.createTestTag(nil)
	if err != nil {
		return
	}

	tagID := createdTag.UUID()
	sceneInput := models.SceneCreateInput{
		TagIds: []uuid.UUID{tagID},
		Date:   "2020-03-02",
	}
	scene, _ := s.createTestScene(&sceneInput)

	tagEditDetailsInput := models.TagEditDetailsInput{}
	editInput := models.EditInput{
		Operation: models.OperationEnumDestroy,
		ID:        &tagID,
	}
	destroyEdit, err := s.createTestTagEdit(models.OperationEnumDestroy, &tagEditDetailsInput, &editInput)
	if err != nil {
		return
	}
	appliedEdit, err := s.applyEdit(destroyEdit.ID)

	destroyedTag, _ := s.resolver.Query().FindTag(s.ctx, &tagID, nil)

	scene, err = s.client.findScene(scene.UUID())
	if err != nil {
		s.t.Errorf("Error finding scene: %s", err.Error())
		return
	}
	s.verifyApplyDestroyTagEdit(destroyedTag, appliedEdit, scene)
}

func (s *tagEditTestRunner) verifyApplyDestroyTagEdit(destroyedTag *models.Tag, edit *models.Edit, scene *sceneOutput) {
	s.verifyEditOperation(models.OperationEnumDestroy.String(), edit)
	s.verifyEditStatus(models.VoteStatusEnumImmediateAccepted.String(), edit)
	s.verifyEditTargetType(models.TargetTypeEnumTag.String(), edit)
	s.verifyEditApplication(true, edit)

	if destroyedTag.Deleted != true {
		s.fieldMismatch(destroyedTag.Deleted, true, "Deleted")
	}

	sceneTags := scene.Tags
	if len(sceneTags) > 0 {
		s.fieldMismatch(len(sceneTags), 0, "Scene tag count")
	}
}

func (s *tagEditTestRunner) testApplyMergeTagEdit() {
	mergeSource1, err := s.createTestTag(nil)
	if err != nil {
		return
	}
	mergeSource2, err := s.createTestTag(nil)
	if err != nil {
		return
	}
	mergeTarget, err := s.createTestTag(nil)
	if err != nil {
		return
	}

	// Scene with tag from both source and target, should not cause db unique error
	sceneInput := models.SceneCreateInput{
		TagIds: []uuid.UUID{mergeSource2.UUID(), mergeTarget.UUID()},
		Date:   "2020-03-02",
	}
	scene1, err := s.createTestScene(&sceneInput)
	if err != nil {
		return
	}

	sceneInput = models.SceneCreateInput{
		TagIds: []uuid.UUID{mergeSource1.UUID(), mergeSource2.UUID()},
		Date:   "2020-03-02",
	}
	scene2, err := s.createTestScene(&sceneInput)
	if err != nil {
		return
	}

	newDescription := "newDescription4"
	newAlias := "newTagAlias4"
	newName := "newName4"
	tagEditDetailsInput := models.TagEditDetailsInput{
		Name:        &newName,
		Description: &newDescription,
		Aliases:     []string{newAlias},
	}
	id := mergeTarget.UUID()
	mergeSources := []uuid.UUID{mergeSource1.UUID(), mergeSource2.UUID()}
	editInput := models.EditInput{
		Operation:      models.OperationEnumMerge,
		ID:             &id,
		MergeSourceIds: mergeSources,
	}

	mergeEdit, err := s.createTestTagEdit(models.OperationEnumMerge, &tagEditDetailsInput, &editInput)
	if err != nil {
		return
	}

	appliedMerge, err := s.applyEdit(mergeEdit.ID)
	if err != nil {
		return
	}

	scene1, err = s.client.findScene(scene1.UUID())
	if err != nil {
		s.t.Errorf("Error finding scene: %s", err.Error())
		return
	}
	scene2, err = s.client.findScene(scene2.UUID())
	if err != nil {
		s.t.Errorf("Error finding scene: %s", err.Error())
		return
	}

	s.verifyAppliedMergeTagEdit(tagEditDetailsInput, appliedMerge, scene1, scene2)
}

func (s *tagEditTestRunner) verifyAppliedMergeTagEdit(input models.TagEditDetailsInput, edit *models.Edit, scene1, scene2 *sceneOutput) {
	s.verifyEditOperation(models.OperationEnumMerge.String(), edit)
	s.verifyEditStatus(models.VoteStatusEnumImmediateAccepted.String(), edit)
	s.verifyEditTargetType(models.TargetTypeEnumTag.String(), edit)
	s.verifyEditApplication(true, edit)

	tagDetails := s.getEditTagDetails(edit)
	if *input.Name != *tagDetails.Name {
		s.fieldMismatch(*input.Name, *tagDetails.Name, "Name")
	}

	if *input.Description != *tagDetails.Description {
		s.fieldMismatch(input.Description, tagDetails.Description, "Description")
	}

	if !reflect.DeepEqual(input.Aliases, tagDetails.AddedAliases) {
		s.fieldMismatch(input.Aliases, tagDetails.AddedAliases, "AddedAliases")
	}

	merges, _ := s.resolver.Edit().MergeSources(s.ctx, edit)
	for i, _ := range merges {
		tag := merges[i].(*models.Tag)
		if tag.Deleted != true {
			s.fieldMismatch(tag.Deleted, true, "Deleted")
		}
	}

	editTarget := s.getEditTagTarget(edit)
	scene1Tags := scene1.Tags
	if len(scene1Tags) > 1 {
		s.fieldMismatch(len(scene1Tags), 1, "Scene 1 tag count")
	}
	if scene1Tags[0].ID != editTarget.ID.String() {
		s.fieldMismatch(scene1Tags[0].ID, editTarget.ID, "Scene 1 tag ID")
	}

	scene2Tags := scene2.Tags
	if len(scene2Tags) > 1 {
		s.fieldMismatch(len(scene2Tags), 1, "Scene 2 tag count")
	}
	if scene2Tags[0].ID != editTarget.ID.String() {
		s.fieldMismatch(scene2Tags[0].ID, editTarget.ID, "Scene 2 tag ID")
	}
}

func TestCreateTagEdit(t *testing.T) {
	pt := createTagEditTestRunner(t)
	pt.testCreateTagEdit()
}

func TestModifyTagEdit(t *testing.T) {
	pt := createTagEditTestRunner(t)
	pt.testModifyTagEdit()
}

func TestDestroyTagEdit(t *testing.T) {
	pt := createTagEditTestRunner(t)
	pt.testDestroyTagEdit()
}

func TestMergeTagEdit(t *testing.T) {
	pt := createTagEditTestRunner(t)
	pt.testMergeTagEdit()
}

func TestApplyCreateTagEdit(t *testing.T) {
	pt := createTagEditTestRunner(t)
	pt.testApplyCreateTagEdit()
}

func TestApplyModifyTagEdit(t *testing.T) {
	pt := createTagEditTestRunner(t)
	pt.testApplyModifyTagEdit()
}

func TestApplyDestroyTagEdit(t *testing.T) {
	pt := createTagEditTestRunner(t)
	pt.testApplyDestroyTagEdit()
}

func TestApplyMergeTagEdit(t *testing.T) {
	pt := createTagEditTestRunner(t)
	pt.testApplyMergeTagEdit()
}
