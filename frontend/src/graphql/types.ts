export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  Time: string;
  Upload: File;
};

export type ActivateNewUserInput = {
  activation_key: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type ApplyEditInput = {
  id: Scalars["ID"];
};

export type BodyModification = {
  __typename: "BodyModification";
  description?: Maybe<Scalars["String"]>;
  location: Scalars["String"];
};

export type BodyModificationCriterionInput = {
  description?: InputMaybe<Scalars["String"]>;
  location?: InputMaybe<Scalars["String"]>;
  modifier: CriterionModifier;
};

export type BodyModificationInput = {
  description?: InputMaybe<Scalars["String"]>;
  location: Scalars["String"];
};

export type BreastTypeCriterionInput = {
  modifier: CriterionModifier;
  value?: InputMaybe<BreastTypeEnum>;
};

export enum BreastTypeEnum {
  FAKE = "FAKE",
  NA = "NA",
  NATURAL = "NATURAL",
}

export type CancelEditInput = {
  id: Scalars["ID"];
};

export enum CriterionModifier {
  /** = */
  EQUALS = "EQUALS",
  EXCLUDES = "EXCLUDES",
  /** > */
  GREATER_THAN = "GREATER_THAN",
  INCLUDES = "INCLUDES",
  /** INCLUDES ALL */
  INCLUDES_ALL = "INCLUDES_ALL",
  /** IS NULL */
  IS_NULL = "IS_NULL",
  /** < */
  LESS_THAN = "LESS_THAN",
  /** != */
  NOT_EQUALS = "NOT_EQUALS",
  /** IS NOT NULL */
  NOT_NULL = "NOT_NULL",
}

export enum DateAccuracyEnum {
  DAY = "DAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
}

export type DateCriterionInput = {
  modifier: CriterionModifier;
  value: Scalars["Date"];
};

export type Draft = {
  __typename: "Draft";
  created: Scalars["Time"];
  data: DraftData;
  expires: Scalars["Time"];
  id: Scalars["ID"];
};

export type DraftData = PerformerDraft | SceneDraft;

export type DraftEntity = {
  __typename: "DraftEntity";
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
};

export type DraftEntityInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
};

export type DraftFingerprint = {
  __typename: "DraftFingerprint";
  algorithm: FingerprintAlgorithm;
  duration: Scalars["Int"];
  hash: Scalars["String"];
};

export type DraftSubmissionStatus = {
  __typename: "DraftSubmissionStatus";
  id?: Maybe<Scalars["ID"]>;
};

export type Edit = {
  __typename: "Edit";
  applied: Scalars["Boolean"];
  closed?: Maybe<Scalars["Time"]>;
  comments: Array<EditComment>;
  created: Scalars["Time"];
  /** Is the edit considered destructive. */
  destructive: Scalars["Boolean"];
  details?: Maybe<EditDetails>;
  expires?: Maybe<Scalars["Time"]>;
  id: Scalars["ID"];
  /** Objects to merge with the target. Only applicable to merges */
  merge_sources: Array<EditTarget>;
  /** Previous state of fields being modified - null if operation is create or delete. */
  old_details?: Maybe<EditDetails>;
  operation: OperationEnum;
  /** Entity specific options */
  options?: Maybe<PerformerEditOptions>;
  status: VoteStatusEnum;
  /** Object being edited - null if creating a new object */
  target?: Maybe<EditTarget>;
  target_type: TargetTypeEnum;
  updated?: Maybe<Scalars["Time"]>;
  user?: Maybe<User>;
  /**  = Accepted - Rejected */
  vote_count: Scalars["Int"];
  votes: Array<EditVote>;
};

export type EditComment = {
  __typename: "EditComment";
  comment: Scalars["String"];
  date: Scalars["Time"];
  id: Scalars["ID"];
  user?: Maybe<User>;
};

export type EditCommentInput = {
  comment: Scalars["String"];
  id: Scalars["ID"];
};

export type EditDetails = PerformerEdit | SceneEdit | StudioEdit | TagEdit;

export type EditInput = {
  comment?: InputMaybe<Scalars["String"]>;
  /** Not required for create type */
  id?: InputMaybe<Scalars["ID"]>;
  /** Only required for merge type */
  merge_source_ids?: InputMaybe<Array<Scalars["ID"]>>;
  operation: OperationEnum;
};

export type EditQueryInput = {
  /** Filter by applied status */
  applied?: InputMaybe<Scalars["Boolean"]>;
  direction?: SortDirectionEnum;
  /** Filter by favorite status */
  is_favorite?: InputMaybe<Scalars["Boolean"]>;
  /** Filter by operation */
  operation?: InputMaybe<OperationEnum>;
  page?: Scalars["Int"];
  per_page?: Scalars["Int"];
  sort?: EditSortEnum;
  /** Filter by status */
  status?: InputMaybe<VoteStatusEnum>;
  /** Filter by target id */
  target_id?: InputMaybe<Scalars["ID"]>;
  /** Filter by target type */
  target_type?: InputMaybe<TargetTypeEnum>;
  /** Filter by user id */
  user_id?: InputMaybe<Scalars["ID"]>;
  /** Filter by vote count */
  vote_count?: InputMaybe<IntCriterionInput>;
};

export enum EditSortEnum {
  CLOSED_AT = "CLOSED_AT",
  CREATED_AT = "CREATED_AT",
  UPDATED_AT = "UPDATED_AT",
}

export type EditTarget = Performer | Scene | Studio | Tag;

export type EditVote = {
  __typename: "EditVote";
  date: Scalars["Time"];
  user?: Maybe<User>;
  vote: VoteTypeEnum;
};

export type EditVoteInput = {
  id: Scalars["ID"];
  vote: VoteTypeEnum;
};

export enum EthnicityEnum {
  ASIAN = "ASIAN",
  BLACK = "BLACK",
  CAUCASIAN = "CAUCASIAN",
  INDIAN = "INDIAN",
  LATIN = "LATIN",
  MIDDLE_EASTERN = "MIDDLE_EASTERN",
  MIXED = "MIXED",
  OTHER = "OTHER",
}

export enum EthnicityFilterEnum {
  ASIAN = "ASIAN",
  BLACK = "BLACK",
  CAUCASIAN = "CAUCASIAN",
  INDIAN = "INDIAN",
  LATIN = "LATIN",
  MIDDLE_EASTERN = "MIDDLE_EASTERN",
  MIXED = "MIXED",
  OTHER = "OTHER",
  UNKNOWN = "UNKNOWN",
}

export type EyeColorCriterionInput = {
  modifier: CriterionModifier;
  value?: InputMaybe<EyeColorEnum>;
};

export enum EyeColorEnum {
  BLUE = "BLUE",
  BROWN = "BROWN",
  GREEN = "GREEN",
  GREY = "GREY",
  HAZEL = "HAZEL",
  RED = "RED",
}

export enum FavoriteFilter {
  ALL = "ALL",
  PERFORMER = "PERFORMER",
  STUDIO = "STUDIO",
}

export type Fingerprint = {
  __typename: "Fingerprint";
  algorithm: FingerprintAlgorithm;
  created: Scalars["Time"];
  duration: Scalars["Int"];
  hash: Scalars["String"];
  submissions: Scalars["Int"];
  updated: Scalars["Time"];
  user_submitted: Scalars["Boolean"];
};

export enum FingerprintAlgorithm {
  MD5 = "MD5",
  OSHASH = "OSHASH",
  PHASH = "PHASH",
}

export type FingerprintEditInput = {
  algorithm: FingerprintAlgorithm;
  created: Scalars["Time"];
  duration: Scalars["Int"];
  hash: Scalars["String"];
  /** @deprecated Unused */
  submissions?: InputMaybe<Scalars["Int"]>;
  /** @deprecated Unused */
  updated?: InputMaybe<Scalars["Time"]>;
  user_ids?: InputMaybe<Array<Scalars["ID"]>>;
};

export type FingerprintInput = {
  algorithm: FingerprintAlgorithm;
  duration: Scalars["Int"];
  hash: Scalars["String"];
  /** assumes current user if omitted. Ignored for non-modify Users */
  user_ids?: InputMaybe<Array<Scalars["ID"]>>;
};

export type FingerprintQueryInput = {
  algorithm: FingerprintAlgorithm;
  hash: Scalars["String"];
};

export type FingerprintSubmission = {
  fingerprint: FingerprintInput;
  scene_id: Scalars["ID"];
  unmatch?: InputMaybe<Scalars["Boolean"]>;
};

export type FuzzyDate = {
  __typename: "FuzzyDate";
  accuracy: DateAccuracyEnum;
  date: Scalars["Date"];
};

export enum GenderEnum {
  FEMALE = "FEMALE",
  INTERSEX = "INTERSEX",
  MALE = "MALE",
  NON_BINARY = "NON_BINARY",
  TRANSGENDER_FEMALE = "TRANSGENDER_FEMALE",
  TRANSGENDER_MALE = "TRANSGENDER_MALE",
}

export enum GenderFilterEnum {
  FEMALE = "FEMALE",
  INTERSEX = "INTERSEX",
  MALE = "MALE",
  NON_BINARY = "NON_BINARY",
  TRANSGENDER_FEMALE = "TRANSGENDER_FEMALE",
  TRANSGENDER_MALE = "TRANSGENDER_MALE",
  UNKNOWN = "UNKNOWN",
}

export type GrantInviteInput = {
  amount: Scalars["Int"];
  user_id: Scalars["ID"];
};

export type HairColorCriterionInput = {
  modifier: CriterionModifier;
  value?: InputMaybe<HairColorEnum>;
};

export enum HairColorEnum {
  AUBURN = "AUBURN",
  BALD = "BALD",
  BLACK = "BLACK",
  BLONDE = "BLONDE",
  BRUNETTE = "BRUNETTE",
  GREY = "GREY",
  OTHER = "OTHER",
  RED = "RED",
  VARIOUS = "VARIOUS",
}

export type IdCriterionInput = {
  modifier: CriterionModifier;
  value: Array<Scalars["ID"]>;
};

export type Image = {
  __typename: "Image";
  height: Scalars["Int"];
  id: Scalars["ID"];
  url: Scalars["String"];
  width: Scalars["Int"];
};

export type ImageCreateInput = {
  file?: InputMaybe<Scalars["Upload"]>;
  url?: InputMaybe<Scalars["String"]>;
};

export type ImageDestroyInput = {
  id: Scalars["ID"];
};

export type ImageUpdateInput = {
  id: Scalars["ID"];
  url?: InputMaybe<Scalars["String"]>;
};

export type IntCriterionInput = {
  modifier: CriterionModifier;
  value: Scalars["Int"];
};

export type Measurements = {
  __typename: "Measurements";
  band_size?: Maybe<Scalars["Int"]>;
  cup_size?: Maybe<Scalars["String"]>;
  hip?: Maybe<Scalars["Int"]>;
  waist?: Maybe<Scalars["Int"]>;
};

export type MultiIdCriterionInput = {
  modifier: CriterionModifier;
  value?: InputMaybe<Array<Scalars["ID"]>>;
};

export type MultiStringCriterionInput = {
  modifier: CriterionModifier;
  value: Array<Scalars["String"]>;
};

export type Mutation = {
  __typename: "Mutation";
  activateNewUser?: Maybe<User>;
  /** Apply edit without voting */
  applyEdit: Edit;
  /** Cancel edit without voting */
  cancelEdit: Edit;
  /** Changes the password for the current user */
  changePassword: Scalars["Boolean"];
  destroyDraft: Scalars["Boolean"];
  /** Comment on an edit */
  editComment: Edit;
  /** Vote to accept/reject an edit */
  editVote: Edit;
  /** Favorite or unfavorite a performer */
  favoritePerformer: Scalars["Boolean"];
  /** Favorite or unfavorite a studio */
  favoriteStudio: Scalars["Boolean"];
  /** Generates an invite code using an invite token */
  generateInviteCode?: Maybe<Scalars["ID"]>;
  /** Adds invite tokens for a user */
  grantInvite: Scalars["Int"];
  imageCreate?: Maybe<Image>;
  imageDestroy: Scalars["Boolean"];
  /** User interface for registering */
  newUser?: Maybe<Scalars["String"]>;
  performerCreate?: Maybe<Performer>;
  performerDestroy: Scalars["Boolean"];
  /** Propose a new performer or modification to a performer */
  performerEdit: Edit;
  /** Update a pending performer edit */
  performerEditUpdate: Edit;
  performerUpdate?: Maybe<Performer>;
  /** Regenerates the api key for the given user, or the current user if id not provided */
  regenerateAPIKey: Scalars["String"];
  /** Removes a pending invite code - refunding the token */
  rescindInviteCode: Scalars["Boolean"];
  /** Generates an email to reset a user password */
  resetPassword: Scalars["Boolean"];
  /** Removes invite tokens from a user */
  revokeInvite: Scalars["Int"];
  sceneCreate?: Maybe<Scene>;
  sceneDestroy: Scalars["Boolean"];
  /** Propose a new scene or modification to a scene */
  sceneEdit: Edit;
  /** Update a pending scene edit */
  sceneEditUpdate: Edit;
  sceneUpdate?: Maybe<Scene>;
  siteCreate?: Maybe<Site>;
  siteDestroy: Scalars["Boolean"];
  siteUpdate?: Maybe<Site>;
  studioCreate?: Maybe<Studio>;
  studioDestroy: Scalars["Boolean"];
  /** Propose a new studio or modification to a studio */
  studioEdit: Edit;
  /** Update a pending studio edit */
  studioEditUpdate: Edit;
  studioUpdate?: Maybe<Studio>;
  /** Matches/unmatches a scene to fingerprint */
  submitFingerprint: Scalars["Boolean"];
  submitPerformerDraft: DraftSubmissionStatus;
  /** Draft submissions */
  submitSceneDraft: DraftSubmissionStatus;
  tagCategoryCreate?: Maybe<TagCategory>;
  tagCategoryDestroy: Scalars["Boolean"];
  tagCategoryUpdate?: Maybe<TagCategory>;
  tagCreate?: Maybe<Tag>;
  tagDestroy: Scalars["Boolean"];
  /** Propose a new tag or modification to a tag */
  tagEdit: Edit;
  /** Update a pending tag edit */
  tagEditUpdate: Edit;
  tagUpdate?: Maybe<Tag>;
  userCreate?: Maybe<User>;
  userDestroy: Scalars["Boolean"];
  userUpdate?: Maybe<User>;
};

export type MutationActivateNewUserArgs = {
  input: ActivateNewUserInput;
};

export type MutationApplyEditArgs = {
  input: ApplyEditInput;
};

export type MutationCancelEditArgs = {
  input: CancelEditInput;
};

export type MutationChangePasswordArgs = {
  input: UserChangePasswordInput;
};

export type MutationDestroyDraftArgs = {
  id: Scalars["ID"];
};

export type MutationEditCommentArgs = {
  input: EditCommentInput;
};

export type MutationEditVoteArgs = {
  input: EditVoteInput;
};

export type MutationFavoritePerformerArgs = {
  favorite: Scalars["Boolean"];
  id: Scalars["ID"];
};

export type MutationFavoriteStudioArgs = {
  favorite: Scalars["Boolean"];
  id: Scalars["ID"];
};

export type MutationGrantInviteArgs = {
  input: GrantInviteInput;
};

export type MutationImageCreateArgs = {
  input: ImageCreateInput;
};

export type MutationImageDestroyArgs = {
  input: ImageDestroyInput;
};

export type MutationNewUserArgs = {
  input: NewUserInput;
};

export type MutationPerformerCreateArgs = {
  input: PerformerCreateInput;
};

export type MutationPerformerDestroyArgs = {
  input: PerformerDestroyInput;
};

export type MutationPerformerEditArgs = {
  input: PerformerEditInput;
};

export type MutationPerformerEditUpdateArgs = {
  id: Scalars["ID"];
  input: PerformerEditInput;
};

export type MutationPerformerUpdateArgs = {
  input: PerformerUpdateInput;
};

export type MutationRegenerateApiKeyArgs = {
  userID?: InputMaybe<Scalars["ID"]>;
};

export type MutationRescindInviteCodeArgs = {
  code: Scalars["ID"];
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationRevokeInviteArgs = {
  input: RevokeInviteInput;
};

export type MutationSceneCreateArgs = {
  input: SceneCreateInput;
};

export type MutationSceneDestroyArgs = {
  input: SceneDestroyInput;
};

export type MutationSceneEditArgs = {
  input: SceneEditInput;
};

export type MutationSceneEditUpdateArgs = {
  id: Scalars["ID"];
  input: SceneEditInput;
};

export type MutationSceneUpdateArgs = {
  input: SceneUpdateInput;
};

export type MutationSiteCreateArgs = {
  input: SiteCreateInput;
};

export type MutationSiteDestroyArgs = {
  input: SiteDestroyInput;
};

export type MutationSiteUpdateArgs = {
  input: SiteUpdateInput;
};

export type MutationStudioCreateArgs = {
  input: StudioCreateInput;
};

export type MutationStudioDestroyArgs = {
  input: StudioDestroyInput;
};

export type MutationStudioEditArgs = {
  input: StudioEditInput;
};

export type MutationStudioEditUpdateArgs = {
  id: Scalars["ID"];
  input: StudioEditInput;
};

export type MutationStudioUpdateArgs = {
  input: StudioUpdateInput;
};

export type MutationSubmitFingerprintArgs = {
  input: FingerprintSubmission;
};

export type MutationSubmitPerformerDraftArgs = {
  input: PerformerDraftInput;
};

export type MutationSubmitSceneDraftArgs = {
  input: SceneDraftInput;
};

export type MutationTagCategoryCreateArgs = {
  input: TagCategoryCreateInput;
};

export type MutationTagCategoryDestroyArgs = {
  input: TagCategoryDestroyInput;
};

export type MutationTagCategoryUpdateArgs = {
  input: TagCategoryUpdateInput;
};

export type MutationTagCreateArgs = {
  input: TagCreateInput;
};

export type MutationTagDestroyArgs = {
  input: TagDestroyInput;
};

export type MutationTagEditArgs = {
  input: TagEditInput;
};

export type MutationTagEditUpdateArgs = {
  id: Scalars["ID"];
  input: TagEditInput;
};

export type MutationTagUpdateArgs = {
  input: TagUpdateInput;
};

export type MutationUserCreateArgs = {
  input: UserCreateInput;
};

export type MutationUserDestroyArgs = {
  input: UserDestroyInput;
};

export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
};

export type NewUserInput = {
  email: Scalars["String"];
  invite_key?: InputMaybe<Scalars["String"]>;
};

export enum OperationEnum {
  CREATE = "CREATE",
  DESTROY = "DESTROY",
  MERGE = "MERGE",
  MODIFY = "MODIFY",
}

export type Performer = {
  __typename: "Performer";
  age?: Maybe<Scalars["Int"]>;
  aliases: Array<Scalars["String"]>;
  band_size?: Maybe<Scalars["Int"]>;
  birth_date?: Maybe<Scalars["String"]>;
  /** @deprecated Please use `birth_date` */
  birthdate?: Maybe<FuzzyDate>;
  breast_type?: Maybe<BreastTypeEnum>;
  career_end_year?: Maybe<Scalars["Int"]>;
  career_start_year?: Maybe<Scalars["Int"]>;
  country?: Maybe<Scalars["String"]>;
  created: Scalars["Time"];
  cup_size?: Maybe<Scalars["String"]>;
  deleted: Scalars["Boolean"];
  disambiguation?: Maybe<Scalars["String"]>;
  edits: Array<Edit>;
  ethnicity?: Maybe<EthnicityEnum>;
  eye_color?: Maybe<EyeColorEnum>;
  gender?: Maybe<GenderEnum>;
  hair_color?: Maybe<HairColorEnum>;
  /** Height in cm */
  height?: Maybe<Scalars["Int"]>;
  hip_size?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  images: Array<Image>;
  is_favorite: Scalars["Boolean"];
  /** @deprecated Use individual fields, cup/band/waist/hip_size */
  measurements: Measurements;
  merged_ids: Array<Scalars["ID"]>;
  name: Scalars["String"];
  piercings?: Maybe<Array<BodyModification>>;
  scene_count: Scalars["Int"];
  studios: Array<PerformerStudio>;
  tattoos?: Maybe<Array<BodyModification>>;
  updated: Scalars["Time"];
  urls: Array<Url>;
  waist_size?: Maybe<Scalars["Int"]>;
};

export type PerformerAppearance = {
  __typename: "PerformerAppearance";
  /** Performing as alias */
  as?: Maybe<Scalars["String"]>;
  performer: Performer;
};

export type PerformerAppearanceInput = {
  /** Performing as alias */
  as?: InputMaybe<Scalars["String"]>;
  performer_id: Scalars["ID"];
};

export type PerformerCreateInput = {
  aliases?: InputMaybe<Array<Scalars["String"]>>;
  band_size?: InputMaybe<Scalars["Int"]>;
  birthdate?: InputMaybe<Scalars["String"]>;
  breast_type?: InputMaybe<BreastTypeEnum>;
  career_end_year?: InputMaybe<Scalars["Int"]>;
  career_start_year?: InputMaybe<Scalars["Int"]>;
  country?: InputMaybe<Scalars["String"]>;
  cup_size?: InputMaybe<Scalars["String"]>;
  disambiguation?: InputMaybe<Scalars["String"]>;
  draft_id?: InputMaybe<Scalars["ID"]>;
  ethnicity?: InputMaybe<EthnicityEnum>;
  eye_color?: InputMaybe<EyeColorEnum>;
  gender?: InputMaybe<GenderEnum>;
  hair_color?: InputMaybe<HairColorEnum>;
  height?: InputMaybe<Scalars["Int"]>;
  hip_size?: InputMaybe<Scalars["Int"]>;
  image_ids?: InputMaybe<Array<Scalars["ID"]>>;
  name: Scalars["String"];
  piercings?: InputMaybe<Array<BodyModificationInput>>;
  tattoos?: InputMaybe<Array<BodyModificationInput>>;
  urls?: InputMaybe<Array<UrlInput>>;
  waist_size?: InputMaybe<Scalars["Int"]>;
};

export type PerformerDestroyInput = {
  id: Scalars["ID"];
};

export type PerformerDraft = {
  __typename: "PerformerDraft";
  aliases?: Maybe<Scalars["String"]>;
  birthdate?: Maybe<Scalars["String"]>;
  breast_type?: Maybe<Scalars["String"]>;
  career_end_year?: Maybe<Scalars["Int"]>;
  career_start_year?: Maybe<Scalars["Int"]>;
  country?: Maybe<Scalars["String"]>;
  ethnicity?: Maybe<Scalars["String"]>;
  eye_color?: Maybe<Scalars["String"]>;
  gender?: Maybe<Scalars["String"]>;
  hair_color?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  image?: Maybe<Image>;
  measurements?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  piercings?: Maybe<Scalars["String"]>;
  tattoos?: Maybe<Scalars["String"]>;
  urls?: Maybe<Array<Scalars["String"]>>;
};

export type PerformerDraftInput = {
  aliases?: InputMaybe<Scalars["String"]>;
  birthdate?: InputMaybe<Scalars["String"]>;
  breast_type?: InputMaybe<Scalars["String"]>;
  career_end_year?: InputMaybe<Scalars["Int"]>;
  career_start_year?: InputMaybe<Scalars["Int"]>;
  country?: InputMaybe<Scalars["String"]>;
  ethnicity?: InputMaybe<Scalars["String"]>;
  eye_color?: InputMaybe<Scalars["String"]>;
  gender?: InputMaybe<Scalars["String"]>;
  hair_color?: InputMaybe<Scalars["String"]>;
  height?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  image?: InputMaybe<Scalars["Upload"]>;
  measurements?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  piercings?: InputMaybe<Scalars["String"]>;
  tattoos?: InputMaybe<Scalars["String"]>;
  urls?: InputMaybe<Array<Scalars["String"]>>;
};

export type PerformerEdit = {
  __typename: "PerformerEdit";
  added_aliases?: Maybe<Array<Scalars["String"]>>;
  added_images?: Maybe<Array<Maybe<Image>>>;
  added_piercings?: Maybe<Array<BodyModification>>;
  added_tattoos?: Maybe<Array<BodyModification>>;
  added_urls?: Maybe<Array<Url>>;
  aliases: Array<Scalars["String"]>;
  band_size?: Maybe<Scalars["Int"]>;
  birthdate?: Maybe<Scalars["String"]>;
  breast_type?: Maybe<BreastTypeEnum>;
  career_end_year?: Maybe<Scalars["Int"]>;
  career_start_year?: Maybe<Scalars["Int"]>;
  country?: Maybe<Scalars["String"]>;
  cup_size?: Maybe<Scalars["String"]>;
  disambiguation?: Maybe<Scalars["String"]>;
  draft_id?: Maybe<Scalars["ID"]>;
  ethnicity?: Maybe<EthnicityEnum>;
  eye_color?: Maybe<EyeColorEnum>;
  gender?: Maybe<GenderEnum>;
  hair_color?: Maybe<HairColorEnum>;
  /** Height in cm */
  height?: Maybe<Scalars["Int"]>;
  hip_size?: Maybe<Scalars["Int"]>;
  images: Array<Image>;
  name?: Maybe<Scalars["String"]>;
  piercings: Array<BodyModification>;
  removed_aliases?: Maybe<Array<Scalars["String"]>>;
  removed_images?: Maybe<Array<Maybe<Image>>>;
  removed_piercings?: Maybe<Array<BodyModification>>;
  removed_tattoos?: Maybe<Array<BodyModification>>;
  removed_urls?: Maybe<Array<Url>>;
  tattoos: Array<BodyModification>;
  urls: Array<Url>;
  waist_size?: Maybe<Scalars["Int"]>;
};

export type PerformerEditDetailsInput = {
  aliases?: InputMaybe<Array<Scalars["String"]>>;
  band_size?: InputMaybe<Scalars["Int"]>;
  birthdate?: InputMaybe<Scalars["String"]>;
  breast_type?: InputMaybe<BreastTypeEnum>;
  career_end_year?: InputMaybe<Scalars["Int"]>;
  career_start_year?: InputMaybe<Scalars["Int"]>;
  country?: InputMaybe<Scalars["String"]>;
  cup_size?: InputMaybe<Scalars["String"]>;
  disambiguation?: InputMaybe<Scalars["String"]>;
  draft_id?: InputMaybe<Scalars["ID"]>;
  ethnicity?: InputMaybe<EthnicityEnum>;
  eye_color?: InputMaybe<EyeColorEnum>;
  gender?: InputMaybe<GenderEnum>;
  hair_color?: InputMaybe<HairColorEnum>;
  height?: InputMaybe<Scalars["Int"]>;
  hip_size?: InputMaybe<Scalars["Int"]>;
  image_ids?: InputMaybe<Array<Scalars["ID"]>>;
  name?: InputMaybe<Scalars["String"]>;
  piercings?: InputMaybe<Array<BodyModificationInput>>;
  tattoos?: InputMaybe<Array<BodyModificationInput>>;
  urls?: InputMaybe<Array<UrlInput>>;
  waist_size?: InputMaybe<Scalars["Int"]>;
};

export type PerformerEditInput = {
  /** Not required for destroy type */
  details?: InputMaybe<PerformerEditDetailsInput>;
  edit: EditInput;
  /** Controls aliases modification for merges and name modifications */
  options?: InputMaybe<PerformerEditOptionsInput>;
};

export type PerformerEditOptions = {
  __typename: "PerformerEditOptions";
  /** Set performer alias on scenes attached to merge sources to old name */
  set_merge_aliases: Scalars["Boolean"];
  /** Set performer alias on scenes without alias to old name if name is changed */
  set_modify_aliases: Scalars["Boolean"];
};

export type PerformerEditOptionsInput = {
  /** Set performer alias on scenes attached to merge sources to old name */
  set_merge_aliases?: InputMaybe<Scalars["Boolean"]>;
  /** Set performer alias on scenes without alias to old name if name is changed */
  set_modify_aliases?: InputMaybe<Scalars["Boolean"]>;
};

export type PerformerQueryInput = {
  age?: InputMaybe<IntCriterionInput>;
  /** Search aliases only - assumes like query unless quoted */
  alias?: InputMaybe<Scalars["String"]>;
  band_size?: InputMaybe<IntCriterionInput>;
  birth_year?: InputMaybe<IntCriterionInput>;
  birthdate?: InputMaybe<DateCriterionInput>;
  breast_type?: InputMaybe<BreastTypeCriterionInput>;
  career_end_year?: InputMaybe<IntCriterionInput>;
  career_start_year?: InputMaybe<IntCriterionInput>;
  country?: InputMaybe<StringCriterionInput>;
  cup_size?: InputMaybe<StringCriterionInput>;
  direction?: SortDirectionEnum;
  disambiguation?: InputMaybe<StringCriterionInput>;
  ethnicity?: InputMaybe<EthnicityFilterEnum>;
  eye_color?: InputMaybe<EyeColorCriterionInput>;
  gender?: InputMaybe<GenderFilterEnum>;
  hair_color?: InputMaybe<HairColorCriterionInput>;
  height?: InputMaybe<IntCriterionInput>;
  hip_size?: InputMaybe<IntCriterionInput>;
  /** Filter by performerfavorite status for the current user */
  is_favorite?: InputMaybe<Scalars["Boolean"]>;
  /** Searches name only - assumes like query unless quoted */
  name?: InputMaybe<Scalars["String"]>;
  /** Searches name and disambiguation - assumes like query unless quoted */
  names?: InputMaybe<Scalars["String"]>;
  page?: Scalars["Int"];
  per_page?: Scalars["Int"];
  piercings?: InputMaybe<BodyModificationCriterionInput>;
  sort?: PerformerSortEnum;
  tattoos?: InputMaybe<BodyModificationCriterionInput>;
  /** Filter to search urls - assumes like query unless quoted */
  url?: InputMaybe<Scalars["String"]>;
  waist_size?: InputMaybe<IntCriterionInput>;
};

export enum PerformerSortEnum {
  BIRTHDATE = "BIRTHDATE",
  CAREER_START_YEAR = "CAREER_START_YEAR",
  CREATED_AT = "CREATED_AT",
  DEBUT = "DEBUT",
  NAME = "NAME",
  SCENE_COUNT = "SCENE_COUNT",
  UPDATED_AT = "UPDATED_AT",
}

export type PerformerStudio = {
  __typename: "PerformerStudio";
  scene_count: Scalars["Int"];
  studio: Studio;
};

export type PerformerUpdateInput = {
  aliases?: InputMaybe<Array<Scalars["String"]>>;
  band_size?: InputMaybe<Scalars["Int"]>;
  birthdate?: InputMaybe<Scalars["String"]>;
  breast_type?: InputMaybe<BreastTypeEnum>;
  career_end_year?: InputMaybe<Scalars["Int"]>;
  career_start_year?: InputMaybe<Scalars["Int"]>;
  country?: InputMaybe<Scalars["String"]>;
  cup_size?: InputMaybe<Scalars["String"]>;
  disambiguation?: InputMaybe<Scalars["String"]>;
  ethnicity?: InputMaybe<EthnicityEnum>;
  eye_color?: InputMaybe<EyeColorEnum>;
  gender?: InputMaybe<GenderEnum>;
  hair_color?: InputMaybe<HairColorEnum>;
  height?: InputMaybe<Scalars["Int"]>;
  hip_size?: InputMaybe<Scalars["Int"]>;
  id: Scalars["ID"];
  image_ids?: InputMaybe<Array<Scalars["ID"]>>;
  name?: InputMaybe<Scalars["String"]>;
  piercings?: InputMaybe<Array<BodyModificationInput>>;
  tattoos?: InputMaybe<Array<BodyModificationInput>>;
  urls?: InputMaybe<Array<UrlInput>>;
  waist_size?: InputMaybe<Scalars["Int"]>;
};

/** The query root for this schema */
export type Query = {
  __typename: "Query";
  findDraft?: Maybe<Draft>;
  findDrafts: Array<Draft>;
  findEdit?: Maybe<Edit>;
  /** Find a performer by ID */
  findPerformer?: Maybe<Performer>;
  /** Find a scene by ID */
  findScene?: Maybe<Scene>;
  /** Finds a scene by an algorithm-specific checksum */
  findSceneByFingerprint: Array<Scene>;
  /**
   * Finds scenes that match a list of hashes
   * @deprecated Use findScenesBySceneFingerprints
   */
  findScenesByFingerprints: Array<Scene>;
  /** @deprecated Use findScenesBySceneFingerprints */
  findScenesByFullFingerprints: Array<Scene>;
  findScenesBySceneFingerprints: Array<Array<Scene>>;
  /** Find an external site by ID */
  findSite?: Maybe<Site>;
  /** Find a studio by ID or name */
  findStudio?: Maybe<Studio>;
  /** Find a tag by ID or name, or aliases */
  findTag?: Maybe<Tag>;
  /** Find a tag category by ID */
  findTagCategory?: Maybe<TagCategory>;
  /** Find user by ID or username */
  findUser?: Maybe<User>;
  getConfig: StashBoxConfig;
  /** Returns currently authenticated user */
  me?: Maybe<User>;
  queryEdits: QueryEditsResultType;
  queryExistingScene: QueryExistingSceneResult;
  queryPerformers: QueryPerformersResultType;
  queryScenes: QueryScenesResultType;
  querySites: QuerySitesResultType;
  queryStudios: QueryStudiosResultType;
  queryTagCategories: QueryTagCategoriesResultType;
  queryTags: QueryTagsResultType;
  queryUsers: QueryUsersResultType;
  searchPerformer: Array<Performer>;
  searchScene: Array<Scene>;
  searchTag: Array<Tag>;
  version: Version;
};

/** The query root for this schema */
export type QueryFindDraftArgs = {
  id: Scalars["ID"];
};

/** The query root for this schema */
export type QueryFindEditArgs = {
  id: Scalars["ID"];
};

/** The query root for this schema */
export type QueryFindPerformerArgs = {
  id: Scalars["ID"];
};

/** The query root for this schema */
export type QueryFindSceneArgs = {
  id: Scalars["ID"];
};

/** The query root for this schema */
export type QueryFindSceneByFingerprintArgs = {
  fingerprint: FingerprintQueryInput;
};

/** The query root for this schema */
export type QueryFindScenesByFingerprintsArgs = {
  fingerprints: Array<Scalars["String"]>;
};

/** The query root for this schema */
export type QueryFindScenesByFullFingerprintsArgs = {
  fingerprints: Array<FingerprintQueryInput>;
};

/** The query root for this schema */
export type QueryFindScenesBySceneFingerprintsArgs = {
  fingerprints: Array<Array<FingerprintQueryInput>>;
};

/** The query root for this schema */
export type QueryFindSiteArgs = {
  id: Scalars["ID"];
};

/** The query root for this schema */
export type QueryFindStudioArgs = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** The query root for this schema */
export type QueryFindTagArgs = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** The query root for this schema */
export type QueryFindTagCategoryArgs = {
  id: Scalars["ID"];
};

/** The query root for this schema */
export type QueryFindUserArgs = {
  id?: InputMaybe<Scalars["ID"]>;
  username?: InputMaybe<Scalars["String"]>;
};

/** The query root for this schema */
export type QueryQueryEditsArgs = {
  input: EditQueryInput;
};

/** The query root for this schema */
export type QueryQueryExistingSceneArgs = {
  input: QueryExistingSceneInput;
};

/** The query root for this schema */
export type QueryQueryPerformersArgs = {
  input: PerformerQueryInput;
};

/** The query root for this schema */
export type QueryQueryScenesArgs = {
  input: SceneQueryInput;
};

/** The query root for this schema */
export type QueryQueryStudiosArgs = {
  input: StudioQueryInput;
};

/** The query root for this schema */
export type QueryQueryTagsArgs = {
  input: TagQueryInput;
};

/** The query root for this schema */
export type QueryQueryUsersArgs = {
  input: UserQueryInput;
};

/** The query root for this schema */
export type QuerySearchPerformerArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  term: Scalars["String"];
};

/** The query root for this schema */
export type QuerySearchSceneArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  term: Scalars["String"];
};

/** The query root for this schema */
export type QuerySearchTagArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  term: Scalars["String"];
};

export type QueryEditsResultType = {
  __typename: "QueryEditsResultType";
  count: Scalars["Int"];
  edits: Array<Edit>;
};

export type QueryExistingSceneInput = {
  fingerprints: Array<FingerprintInput>;
  studio_id?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type QueryExistingSceneResult = {
  __typename: "QueryExistingSceneResult";
  edits: Array<Edit>;
  scenes: Array<Scene>;
};

export type QueryPerformersResultType = {
  __typename: "QueryPerformersResultType";
  count: Scalars["Int"];
  performers: Array<Performer>;
};

export type QueryScenesResultType = {
  __typename: "QueryScenesResultType";
  count: Scalars["Int"];
  scenes: Array<Scene>;
};

export type QuerySitesResultType = {
  __typename: "QuerySitesResultType";
  count: Scalars["Int"];
  sites: Array<Site>;
};

export type QueryStudiosResultType = {
  __typename: "QueryStudiosResultType";
  count: Scalars["Int"];
  studios: Array<Studio>;
};

export type QueryTagCategoriesResultType = {
  __typename: "QueryTagCategoriesResultType";
  count: Scalars["Int"];
  tag_categories: Array<TagCategory>;
};

export type QueryTagsResultType = {
  __typename: "QueryTagsResultType";
  count: Scalars["Int"];
  tags: Array<Tag>;
};

export type QueryUsersResultType = {
  __typename: "QueryUsersResultType";
  count: Scalars["Int"];
  users: Array<User>;
};

export type ResetPasswordInput = {
  email: Scalars["String"];
};

export type RevokeInviteInput = {
  amount: Scalars["Int"];
  user_id: Scalars["ID"];
};

export type RoleCriterionInput = {
  modifier: CriterionModifier;
  value: Array<RoleEnum>;
};

export enum RoleEnum {
  ADMIN = "ADMIN",
  BOT = "BOT",
  EDIT = "EDIT",
  /** May generate invites without tokens */
  INVITE = "INVITE",
  /** May grant and rescind invite tokens and resind invite keys */
  MANAGE_INVITES = "MANAGE_INVITES",
  MODIFY = "MODIFY",
  READ = "READ",
  VOTE = "VOTE",
}

export type Scene = {
  __typename: "Scene";
  code?: Maybe<Scalars["String"]>;
  created: Scalars["Time"];
  /** @deprecated Please use `release_date` instead */
  date?: Maybe<Scalars["String"]>;
  deleted: Scalars["Boolean"];
  details?: Maybe<Scalars["String"]>;
  director?: Maybe<Scalars["String"]>;
  duration?: Maybe<Scalars["Int"]>;
  edits: Array<Edit>;
  fingerprints: Array<Fingerprint>;
  id: Scalars["ID"];
  images: Array<Image>;
  performers: Array<PerformerAppearance>;
  release_date?: Maybe<Scalars["String"]>;
  studio?: Maybe<Studio>;
  tags: Array<Tag>;
  title?: Maybe<Scalars["String"]>;
  updated: Scalars["Time"];
  urls: Array<Url>;
};

export type SceneCreateInput = {
  code?: InputMaybe<Scalars["String"]>;
  date: Scalars["String"];
  details?: InputMaybe<Scalars["String"]>;
  director?: InputMaybe<Scalars["String"]>;
  duration?: InputMaybe<Scalars["Int"]>;
  fingerprints: Array<FingerprintEditInput>;
  image_ids?: InputMaybe<Array<Scalars["ID"]>>;
  performers?: InputMaybe<Array<PerformerAppearanceInput>>;
  studio_id?: InputMaybe<Scalars["ID"]>;
  tag_ids?: InputMaybe<Array<Scalars["ID"]>>;
  title?: InputMaybe<Scalars["String"]>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type SceneDestroyInput = {
  id: Scalars["ID"];
};

export type SceneDraft = {
  __typename: "SceneDraft";
  code?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  details?: Maybe<Scalars["String"]>;
  director?: Maybe<Scalars["String"]>;
  fingerprints: Array<DraftFingerprint>;
  id?: Maybe<Scalars["ID"]>;
  image?: Maybe<Image>;
  performers: Array<SceneDraftPerformer>;
  studio?: Maybe<SceneDraftStudio>;
  tags?: Maybe<Array<SceneDraftTag>>;
  title?: Maybe<Scalars["String"]>;
  url?: Maybe<Url>;
};

export type SceneDraftInput = {
  code?: InputMaybe<Scalars["String"]>;
  date?: InputMaybe<Scalars["String"]>;
  details?: InputMaybe<Scalars["String"]>;
  director?: InputMaybe<Scalars["String"]>;
  fingerprints: Array<FingerprintInput>;
  id?: InputMaybe<Scalars["ID"]>;
  image?: InputMaybe<Scalars["Upload"]>;
  performers: Array<DraftEntityInput>;
  studio?: InputMaybe<DraftEntityInput>;
  tags?: InputMaybe<Array<DraftEntityInput>>;
  title?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["String"]>;
};

export type SceneDraftPerformer = DraftEntity | Performer;

export type SceneDraftStudio = DraftEntity | Studio;

export type SceneDraftTag = DraftEntity | Tag;

export type SceneEdit = {
  __typename: "SceneEdit";
  added_fingerprints?: Maybe<Array<Fingerprint>>;
  added_images?: Maybe<Array<Maybe<Image>>>;
  /** Added or modified performer appearance entries */
  added_performers?: Maybe<Array<PerformerAppearance>>;
  added_tags?: Maybe<Array<Tag>>;
  added_urls?: Maybe<Array<Url>>;
  code?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  details?: Maybe<Scalars["String"]>;
  director?: Maybe<Scalars["String"]>;
  draft_id?: Maybe<Scalars["ID"]>;
  duration?: Maybe<Scalars["Int"]>;
  fingerprints: Array<Fingerprint>;
  images: Array<Image>;
  performers: Array<PerformerAppearance>;
  removed_fingerprints?: Maybe<Array<Fingerprint>>;
  removed_images?: Maybe<Array<Maybe<Image>>>;
  removed_performers?: Maybe<Array<PerformerAppearance>>;
  removed_tags?: Maybe<Array<Tag>>;
  removed_urls?: Maybe<Array<Url>>;
  studio?: Maybe<Studio>;
  tags: Array<Tag>;
  title?: Maybe<Scalars["String"]>;
  urls: Array<Url>;
};

export type SceneEditDetailsInput = {
  code?: InputMaybe<Scalars["String"]>;
  date?: InputMaybe<Scalars["String"]>;
  details?: InputMaybe<Scalars["String"]>;
  director?: InputMaybe<Scalars["String"]>;
  draft_id?: InputMaybe<Scalars["ID"]>;
  duration?: InputMaybe<Scalars["Int"]>;
  fingerprints?: InputMaybe<Array<FingerprintInput>>;
  image_ids?: InputMaybe<Array<Scalars["ID"]>>;
  performers?: InputMaybe<Array<PerformerAppearanceInput>>;
  studio_id?: InputMaybe<Scalars["ID"]>;
  tag_ids?: InputMaybe<Array<Scalars["ID"]>>;
  title?: InputMaybe<Scalars["String"]>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type SceneEditInput = {
  /** Not required for destroy type */
  details?: InputMaybe<SceneEditDetailsInput>;
  edit: EditInput;
};

export type SceneQueryInput = {
  /** Filter to include scenes with performer appearing as alias */
  alias?: InputMaybe<StringCriterionInput>;
  /** Filter by date */
  date?: InputMaybe<DateCriterionInput>;
  direction?: SortDirectionEnum;
  /** Filter by favorited entity */
  favorites?: InputMaybe<FavoriteFilter>;
  /** Filter to only include scenes with these fingerprints */
  fingerprints?: InputMaybe<MultiStringCriterionInput>;
  page?: Scalars["Int"];
  /** Filter to only include scenes with this studio as primary or parent */
  parentStudio?: InputMaybe<Scalars["String"]>;
  per_page?: Scalars["Int"];
  /** Filter to only include scenes with these performers */
  performers?: InputMaybe<MultiIdCriterionInput>;
  sort?: SceneSortEnum;
  /** Filter to only include scenes with this studio */
  studios?: InputMaybe<MultiIdCriterionInput>;
  /** Filter to only include scenes with these tags */
  tags?: InputMaybe<MultiIdCriterionInput>;
  /** Filter to search title and details - assumes like query unless quoted */
  text?: InputMaybe<Scalars["String"]>;
  /** Filter to search title - assumes like query unless quoted */
  title?: InputMaybe<Scalars["String"]>;
  /** Filter to search urls - assumes like query unless quoted */
  url?: InputMaybe<Scalars["String"]>;
};

export enum SceneSortEnum {
  CREATED_AT = "CREATED_AT",
  DATE = "DATE",
  TITLE = "TITLE",
  TRENDING = "TRENDING",
  UPDATED_AT = "UPDATED_AT",
}

export type SceneUpdateInput = {
  code?: InputMaybe<Scalars["String"]>;
  date?: InputMaybe<Scalars["String"]>;
  details?: InputMaybe<Scalars["String"]>;
  director?: InputMaybe<Scalars["String"]>;
  duration?: InputMaybe<Scalars["Int"]>;
  fingerprints?: InputMaybe<Array<FingerprintEditInput>>;
  id: Scalars["ID"];
  image_ids?: InputMaybe<Array<Scalars["ID"]>>;
  performers?: InputMaybe<Array<PerformerAppearanceInput>>;
  studio_id?: InputMaybe<Scalars["ID"]>;
  tag_ids?: InputMaybe<Array<Scalars["ID"]>>;
  title?: InputMaybe<Scalars["String"]>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type Site = {
  __typename: "Site";
  created: Scalars["Time"];
  description?: Maybe<Scalars["String"]>;
  icon: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  regex?: Maybe<Scalars["String"]>;
  updated: Scalars["Time"];
  url?: Maybe<Scalars["String"]>;
  valid_types: Array<ValidSiteTypeEnum>;
};

export type SiteCreateInput = {
  description?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  regex?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["String"]>;
  valid_types: Array<ValidSiteTypeEnum>;
};

export type SiteDestroyInput = {
  id: Scalars["ID"];
};

export type SiteUpdateInput = {
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  regex?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["String"]>;
  valid_types: Array<ValidSiteTypeEnum>;
};

export enum SortDirectionEnum {
  ASC = "ASC",
  DESC = "DESC",
}

export type StashBoxConfig = {
  __typename: "StashBoxConfig";
  host_url: Scalars["String"];
  min_destructive_voting_period: Scalars["Int"];
  require_activation: Scalars["Boolean"];
  require_invite: Scalars["Boolean"];
  vote_application_threshold: Scalars["Int"];
  vote_cron_interval: Scalars["String"];
  vote_promotion_threshold?: Maybe<Scalars["Int"]>;
  voting_period: Scalars["Int"];
};

export type StringCriterionInput = {
  modifier: CriterionModifier;
  value: Scalars["String"];
};

export type Studio = {
  __typename: "Studio";
  child_studios: Array<Studio>;
  created: Scalars["Time"];
  deleted: Scalars["Boolean"];
  id: Scalars["ID"];
  images: Array<Image>;
  is_favorite: Scalars["Boolean"];
  name: Scalars["String"];
  parent?: Maybe<Studio>;
  updated: Scalars["Time"];
  urls: Array<Url>;
};

export type StudioCreateInput = {
  image_ids?: InputMaybe<Array<Scalars["ID"]>>;
  name: Scalars["String"];
  parent_id?: InputMaybe<Scalars["ID"]>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type StudioDestroyInput = {
  id: Scalars["ID"];
};

export type StudioEdit = {
  __typename: "StudioEdit";
  added_images?: Maybe<Array<Maybe<Image>>>;
  /** Added and modified URLs */
  added_urls?: Maybe<Array<Url>>;
  images: Array<Image>;
  name?: Maybe<Scalars["String"]>;
  parent?: Maybe<Studio>;
  removed_images?: Maybe<Array<Maybe<Image>>>;
  removed_urls?: Maybe<Array<Url>>;
  urls: Array<Url>;
};

export type StudioEditDetailsInput = {
  image_ids?: InputMaybe<Array<Scalars["ID"]>>;
  name?: InputMaybe<Scalars["String"]>;
  parent_id?: InputMaybe<Scalars["ID"]>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type StudioEditInput = {
  /** Not required for destroy type */
  details?: InputMaybe<StudioEditDetailsInput>;
  edit: EditInput;
};

export type StudioQueryInput = {
  direction?: SortDirectionEnum;
  has_parent?: InputMaybe<Scalars["Boolean"]>;
  /** Filter by studio favorite status for the current user */
  is_favorite?: InputMaybe<Scalars["Boolean"]>;
  /** Filter to search name - assumes like query unless quoted */
  name?: InputMaybe<Scalars["String"]>;
  /** Filter to search studio and parent studio name - assumes like query unless quoted */
  names?: InputMaybe<Scalars["String"]>;
  page?: Scalars["Int"];
  parent?: InputMaybe<IdCriterionInput>;
  per_page?: Scalars["Int"];
  sort?: StudioSortEnum;
  /** Filter to search url - assumes like query unless quoted */
  url?: InputMaybe<Scalars["String"]>;
};

export enum StudioSortEnum {
  CREATED_AT = "CREATED_AT",
  NAME = "NAME",
  UPDATED_AT = "UPDATED_AT",
}

export type StudioUpdateInput = {
  id: Scalars["ID"];
  image_ids?: InputMaybe<Array<Scalars["ID"]>>;
  name?: InputMaybe<Scalars["String"]>;
  parent_id?: InputMaybe<Scalars["ID"]>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type Tag = {
  __typename: "Tag";
  aliases: Array<Scalars["String"]>;
  category?: Maybe<TagCategory>;
  created: Scalars["Time"];
  deleted: Scalars["Boolean"];
  description?: Maybe<Scalars["String"]>;
  edits: Array<Edit>;
  id: Scalars["ID"];
  name: Scalars["String"];
  updated: Scalars["Time"];
};

export type TagCategory = {
  __typename: "TagCategory";
  description?: Maybe<Scalars["String"]>;
  group: TagGroupEnum;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type TagCategoryCreateInput = {
  description?: InputMaybe<Scalars["String"]>;
  group: TagGroupEnum;
  name: Scalars["String"];
};

export type TagCategoryDestroyInput = {
  id: Scalars["ID"];
};

export type TagCategoryUpdateInput = {
  description?: InputMaybe<Scalars["String"]>;
  group?: InputMaybe<TagGroupEnum>;
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type TagCreateInput = {
  aliases?: InputMaybe<Array<Scalars["String"]>>;
  category_id?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
};

export type TagDestroyInput = {
  id: Scalars["ID"];
};

export type TagEdit = {
  __typename: "TagEdit";
  added_aliases?: Maybe<Array<Scalars["String"]>>;
  aliases: Array<Scalars["String"]>;
  category?: Maybe<TagCategory>;
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  removed_aliases?: Maybe<Array<Scalars["String"]>>;
};

export type TagEditDetailsInput = {
  aliases?: InputMaybe<Array<Scalars["String"]>>;
  category_id?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type TagEditInput = {
  /** Not required for destroy type */
  details?: InputMaybe<TagEditDetailsInput>;
  edit: EditInput;
};

export enum TagGroupEnum {
  ACTION = "ACTION",
  PEOPLE = "PEOPLE",
  SCENE = "SCENE",
}

export type TagQueryInput = {
  /** Filter to category ID */
  category_id?: InputMaybe<Scalars["ID"]>;
  direction?: SortDirectionEnum;
  /** Filter to search name - assumes like query unless quoted */
  name?: InputMaybe<Scalars["String"]>;
  /** Searches name and aliases - assumes like query unless quoted */
  names?: InputMaybe<Scalars["String"]>;
  page?: Scalars["Int"];
  per_page?: Scalars["Int"];
  sort?: TagSortEnum;
  /** Filter to search name, aliases and description - assumes like query unless quoted */
  text?: InputMaybe<Scalars["String"]>;
};

export enum TagSortEnum {
  CREATED_AT = "CREATED_AT",
  NAME = "NAME",
  UPDATED_AT = "UPDATED_AT",
}

export type TagUpdateInput = {
  aliases?: InputMaybe<Array<Scalars["String"]>>;
  category_id?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export enum TargetTypeEnum {
  PERFORMER = "PERFORMER",
  SCENE = "SCENE",
  STUDIO = "STUDIO",
  TAG = "TAG",
}

export type Url = {
  __typename: "URL";
  site: Site;
  /** @deprecated Use the site field instead */
  type: Scalars["String"];
  url: Scalars["String"];
};

export type UrlInput = {
  site_id: Scalars["ID"];
  url: Scalars["String"];
};

export type User = {
  __typename: "User";
  active_invite_codes?: Maybe<Array<Scalars["String"]>>;
  /** Calls to the API from this user over a configurable time period */
  api_calls: Scalars["Int"];
  /** Should not be visible to other users */
  api_key?: Maybe<Scalars["String"]>;
  /**  Edit counts by status  */
  edit_count: UserEditCount;
  /** Should not be visible to other users */
  email?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  invite_tokens?: Maybe<Scalars["Int"]>;
  invited_by?: Maybe<User>;
  name: Scalars["String"];
  /** Should not be visible to other users */
  roles?: Maybe<Array<RoleEnum>>;
  /**  Vote counts by type  */
  vote_count: UserVoteCount;
};

export type UserChangePasswordInput = {
  /** Password in plain text */
  existing_password?: InputMaybe<Scalars["String"]>;
  new_password: Scalars["String"];
  reset_key?: InputMaybe<Scalars["String"]>;
};

export type UserCreateInput = {
  email: Scalars["String"];
  invited_by_id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
  /** Password in plain text */
  password: Scalars["String"];
  roles: Array<RoleEnum>;
};

export type UserDestroyInput = {
  id: Scalars["ID"];
};

export type UserEditCount = {
  __typename: "UserEditCount";
  accepted: Scalars["Int"];
  canceled: Scalars["Int"];
  failed: Scalars["Int"];
  immediate_accepted: Scalars["Int"];
  immediate_rejected: Scalars["Int"];
  pending: Scalars["Int"];
  rejected: Scalars["Int"];
};

export type UserQueryInput = {
  /** Filter by api key */
  apiKey?: InputMaybe<Scalars["String"]>;
  /** Filter by number of API calls */
  api_calls?: InputMaybe<IntCriterionInput>;
  /** Filter to search email - assumes like query unless quoted */
  email?: InputMaybe<Scalars["String"]>;
  /** Filter by user that invited */
  invited_by?: InputMaybe<Scalars["ID"]>;
  /** Filter to search user name - assumes like query unless quoted */
  name?: InputMaybe<Scalars["String"]>;
  page?: Scalars["Int"];
  per_page?: Scalars["Int"];
  /** Filter by roles */
  roles?: InputMaybe<RoleCriterionInput>;
  /** Filter by successful edits */
  successful_edits?: InputMaybe<IntCriterionInput>;
  /** Filter by votes on successful edits */
  successful_votes?: InputMaybe<IntCriterionInput>;
  /** Filter by unsuccessful edits */
  unsuccessful_edits?: InputMaybe<IntCriterionInput>;
  /** Filter by votes on unsuccessful edits */
  unsuccessful_votes?: InputMaybe<IntCriterionInput>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  /** Password in plain text */
  password?: InputMaybe<Scalars["String"]>;
  roles?: InputMaybe<Array<RoleEnum>>;
};

export type UserVoteCount = {
  __typename: "UserVoteCount";
  abstain: Scalars["Int"];
  accept: Scalars["Int"];
  immediate_accept: Scalars["Int"];
  immediate_reject: Scalars["Int"];
  reject: Scalars["Int"];
};

export enum ValidSiteTypeEnum {
  PERFORMER = "PERFORMER",
  SCENE = "SCENE",
  STUDIO = "STUDIO",
}

export type Version = {
  __typename: "Version";
  build_time: Scalars["String"];
  build_type: Scalars["String"];
  hash: Scalars["String"];
  version: Scalars["String"];
};

export enum VoteStatusEnum {
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  FAILED = "FAILED",
  IMMEDIATE_ACCEPTED = "IMMEDIATE_ACCEPTED",
  IMMEDIATE_REJECTED = "IMMEDIATE_REJECTED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export enum VoteTypeEnum {
  ABSTAIN = "ABSTAIN",
  ACCEPT = "ACCEPT",
  /** Immediately accepts the edit - bypassing the vote */
  IMMEDIATE_ACCEPT = "IMMEDIATE_ACCEPT",
  /** Immediately rejects the edit - bypassing the vote */
  IMMEDIATE_REJECT = "IMMEDIATE_REJECT",
  REJECT = "REJECT",
}

export type CommentFragment = {
  __typename: "EditComment";
  id: string;
  date: string;
  comment: string;
  user?: { __typename: "User"; id: string; name: string } | null;
};

export type EditFragment = {
  __typename: "Edit";
  id: string;
  target_type: TargetTypeEnum;
  operation: OperationEnum;
  status: VoteStatusEnum;
  applied: boolean;
  created: string;
  updated?: string | null;
  closed?: string | null;
  expires?: string | null;
  vote_count: number;
  destructive: boolean;
  comments: Array<{
    __typename: "EditComment";
    id: string;
    date: string;
    comment: string;
    user?: { __typename: "User"; id: string; name: string } | null;
  }>;
  votes: Array<{
    __typename: "EditVote";
    date: string;
    vote: VoteTypeEnum;
    user?: { __typename: "User"; id: string; name: string } | null;
  }>;
  user?: { __typename: "User"; id: string; name: string } | null;
  target?:
    | {
        __typename: "Performer";
        id: string;
        name: string;
        disambiguation?: string | null;
        deleted: boolean;
        aliases: Array<string>;
        gender?: GenderEnum | null;
        birth_date?: string | null;
        age?: number | null;
        height?: number | null;
        hair_color?: HairColorEnum | null;
        eye_color?: EyeColorEnum | null;
        ethnicity?: EthnicityEnum | null;
        country?: string | null;
        career_end_year?: number | null;
        career_start_year?: number | null;
        breast_type?: BreastTypeEnum | null;
        waist_size?: number | null;
        hip_size?: number | null;
        band_size?: number | null;
        cup_size?: string | null;
        is_favorite: boolean;
        tattoos?: Array<{
          __typename: "BodyModification";
          location: string;
          description?: string | null;
        }> | null;
        piercings?: Array<{
          __typename: "BodyModification";
          location: string;
          description?: string | null;
        }> | null;
        urls: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }>;
        images: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        }>;
      }
    | {
        __typename: "Scene";
        id: string;
        release_date?: string | null;
        title?: string | null;
        deleted: boolean;
        details?: string | null;
        director?: string | null;
        code?: string | null;
        duration?: number | null;
        urls: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }>;
        images: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        }>;
        studio?: {
          __typename: "Studio";
          id: string;
          name: string;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
        } | null;
        performers: Array<{
          __typename: "PerformerAppearance";
          as?: string | null;
          performer: {
            __typename: "Performer";
            id: string;
            name: string;
            disambiguation?: string | null;
            deleted: boolean;
            gender?: GenderEnum | null;
            aliases: Array<string>;
          };
        }>;
        fingerprints: Array<{
          __typename: "Fingerprint";
          hash: string;
          algorithm: FingerprintAlgorithm;
          duration: number;
          submissions: number;
          user_submitted: boolean;
          created: string;
          updated: string;
        }>;
        tags: Array<{
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          aliases: Array<string>;
        }>;
      }
    | {
        __typename: "Studio";
        id: string;
        name: string;
        deleted: boolean;
        is_favorite: boolean;
        child_studios: Array<{
          __typename: "Studio";
          id: string;
          name: string;
        }>;
        parent?: { __typename: "Studio"; id: string; name: string } | null;
        urls: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }>;
        images: Array<{
          __typename: "Image";
          id: string;
          url: string;
          height: number;
          width: number;
        }>;
      }
    | {
        __typename: "Tag";
        id: string;
        name: string;
        description?: string | null;
        deleted: boolean;
        aliases: Array<string>;
        category?: {
          __typename: "TagCategory";
          id: string;
          name: string;
        } | null;
      }
    | null;
  details?:
    | {
        __typename: "PerformerEdit";
        name?: string | null;
        disambiguation?: string | null;
        added_aliases?: Array<string> | null;
        removed_aliases?: Array<string> | null;
        gender?: GenderEnum | null;
        birthdate?: string | null;
        ethnicity?: EthnicityEnum | null;
        country?: string | null;
        eye_color?: EyeColorEnum | null;
        hair_color?: HairColorEnum | null;
        height?: number | null;
        cup_size?: string | null;
        band_size?: number | null;
        waist_size?: number | null;
        hip_size?: number | null;
        breast_type?: BreastTypeEnum | null;
        career_start_year?: number | null;
        career_end_year?: number | null;
        draft_id?: string | null;
        added_urls?: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }> | null;
        removed_urls?: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }> | null;
        added_tattoos?: Array<{
          __typename: "BodyModification";
          location: string;
          description?: string | null;
        }> | null;
        removed_tattoos?: Array<{
          __typename: "BodyModification";
          location: string;
          description?: string | null;
        }> | null;
        added_piercings?: Array<{
          __typename: "BodyModification";
          location: string;
          description?: string | null;
        }> | null;
        removed_piercings?: Array<{
          __typename: "BodyModification";
          location: string;
          description?: string | null;
        }> | null;
        added_images?: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        } | null> | null;
        removed_images?: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        } | null> | null;
      }
    | {
        __typename: "SceneEdit";
        title?: string | null;
        details?: string | null;
        date?: string | null;
        duration?: number | null;
        director?: string | null;
        code?: string | null;
        draft_id?: string | null;
        added_urls?: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }> | null;
        removed_urls?: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }> | null;
        studio?: {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        } | null;
        added_performers?: Array<{
          __typename: "PerformerAppearance";
          as?: string | null;
          performer: {
            __typename: "Performer";
            id: string;
            name: string;
            disambiguation?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            gender?: GenderEnum | null;
            birth_date?: string | null;
            age?: number | null;
            height?: number | null;
            hair_color?: HairColorEnum | null;
            eye_color?: EyeColorEnum | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            career_end_year?: number | null;
            career_start_year?: number | null;
            breast_type?: BreastTypeEnum | null;
            waist_size?: number | null;
            hip_size?: number | null;
            band_size?: number | null;
            cup_size?: string | null;
            is_favorite: boolean;
            tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
          };
        }> | null;
        removed_performers?: Array<{
          __typename: "PerformerAppearance";
          as?: string | null;
          performer: {
            __typename: "Performer";
            id: string;
            name: string;
            disambiguation?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            gender?: GenderEnum | null;
            birth_date?: string | null;
            age?: number | null;
            height?: number | null;
            hair_color?: HairColorEnum | null;
            eye_color?: EyeColorEnum | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            career_end_year?: number | null;
            career_start_year?: number | null;
            breast_type?: BreastTypeEnum | null;
            waist_size?: number | null;
            hip_size?: number | null;
            band_size?: number | null;
            cup_size?: string | null;
            is_favorite: boolean;
            tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
          };
        }> | null;
        added_tags?: Array<{
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }> | null;
        removed_tags?: Array<{
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }> | null;
        added_images?: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        } | null> | null;
        removed_images?: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        } | null> | null;
        added_fingerprints?: Array<{
          __typename: "Fingerprint";
          hash: string;
          algorithm: FingerprintAlgorithm;
          duration: number;
        }> | null;
        removed_fingerprints?: Array<{
          __typename: "Fingerprint";
          hash: string;
          algorithm: FingerprintAlgorithm;
          duration: number;
        }> | null;
      }
    | {
        __typename: "StudioEdit";
        name?: string | null;
        added_urls?: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }> | null;
        removed_urls?: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }> | null;
        parent?: {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        } | null;
        added_images?: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        } | null> | null;
        removed_images?: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        } | null> | null;
      }
    | {
        __typename: "TagEdit";
        name?: string | null;
        description?: string | null;
        added_aliases?: Array<string> | null;
        removed_aliases?: Array<string> | null;
        category?: {
          __typename: "TagCategory";
          id: string;
          name: string;
        } | null;
      }
    | null;
  old_details?:
    | {
        __typename: "PerformerEdit";
        name?: string | null;
        disambiguation?: string | null;
        gender?: GenderEnum | null;
        birthdate?: string | null;
        ethnicity?: EthnicityEnum | null;
        country?: string | null;
        eye_color?: EyeColorEnum | null;
        hair_color?: HairColorEnum | null;
        height?: number | null;
        cup_size?: string | null;
        band_size?: number | null;
        waist_size?: number | null;
        hip_size?: number | null;
        breast_type?: BreastTypeEnum | null;
        career_start_year?: number | null;
        career_end_year?: number | null;
      }
    | {
        __typename: "SceneEdit";
        title?: string | null;
        details?: string | null;
        date?: string | null;
        duration?: number | null;
        director?: string | null;
        code?: string | null;
        added_urls?: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }> | null;
        removed_urls?: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }> | null;
        studio?: {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        } | null;
        added_performers?: Array<{
          __typename: "PerformerAppearance";
          as?: string | null;
          performer: {
            __typename: "Performer";
            id: string;
            name: string;
            disambiguation?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            gender?: GenderEnum | null;
            birth_date?: string | null;
            age?: number | null;
            height?: number | null;
            hair_color?: HairColorEnum | null;
            eye_color?: EyeColorEnum | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            career_end_year?: number | null;
            career_start_year?: number | null;
            breast_type?: BreastTypeEnum | null;
            waist_size?: number | null;
            hip_size?: number | null;
            band_size?: number | null;
            cup_size?: string | null;
            is_favorite: boolean;
            tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
          };
        }> | null;
        removed_performers?: Array<{
          __typename: "PerformerAppearance";
          as?: string | null;
          performer: {
            __typename: "Performer";
            id: string;
            name: string;
            disambiguation?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            gender?: GenderEnum | null;
            birth_date?: string | null;
            age?: number | null;
            height?: number | null;
            hair_color?: HairColorEnum | null;
            eye_color?: EyeColorEnum | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            career_end_year?: number | null;
            career_start_year?: number | null;
            breast_type?: BreastTypeEnum | null;
            waist_size?: number | null;
            hip_size?: number | null;
            band_size?: number | null;
            cup_size?: string | null;
            is_favorite: boolean;
            tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
          };
        }> | null;
        added_tags?: Array<{
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }> | null;
        removed_tags?: Array<{
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }> | null;
        added_images?: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        } | null> | null;
        removed_images?: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        } | null> | null;
        added_fingerprints?: Array<{
          __typename: "Fingerprint";
          hash: string;
          algorithm: FingerprintAlgorithm;
          duration: number;
        }> | null;
        removed_fingerprints?: Array<{
          __typename: "Fingerprint";
          hash: string;
          algorithm: FingerprintAlgorithm;
          duration: number;
        }> | null;
      }
    | {
        __typename: "StudioEdit";
        name?: string | null;
        parent?: {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        } | null;
      }
    | {
        __typename: "TagEdit";
        name?: string | null;
        description?: string | null;
        category?: {
          __typename: "TagCategory";
          id: string;
          name: string;
        } | null;
      }
    | null;
  merge_sources: Array<
    | {
        __typename: "Performer";
        id: string;
        name: string;
        disambiguation?: string | null;
        deleted: boolean;
        aliases: Array<string>;
        gender?: GenderEnum | null;
        birth_date?: string | null;
        age?: number | null;
        height?: number | null;
        hair_color?: HairColorEnum | null;
        eye_color?: EyeColorEnum | null;
        ethnicity?: EthnicityEnum | null;
        country?: string | null;
        career_end_year?: number | null;
        career_start_year?: number | null;
        breast_type?: BreastTypeEnum | null;
        waist_size?: number | null;
        hip_size?: number | null;
        band_size?: number | null;
        cup_size?: string | null;
        is_favorite: boolean;
        tattoos?: Array<{
          __typename: "BodyModification";
          location: string;
          description?: string | null;
        }> | null;
        piercings?: Array<{
          __typename: "BodyModification";
          location: string;
          description?: string | null;
        }> | null;
        urls: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }>;
        images: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        }>;
      }
    | {
        __typename: "Scene";
        id: string;
        release_date?: string | null;
        title?: string | null;
        deleted: boolean;
        details?: string | null;
        director?: string | null;
        code?: string | null;
        duration?: number | null;
        urls: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }>;
        images: Array<{
          __typename: "Image";
          id: string;
          url: string;
          width: number;
          height: number;
        }>;
        studio?: {
          __typename: "Studio";
          id: string;
          name: string;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
        } | null;
        performers: Array<{
          __typename: "PerformerAppearance";
          as?: string | null;
          performer: {
            __typename: "Performer";
            id: string;
            name: string;
            disambiguation?: string | null;
            deleted: boolean;
            gender?: GenderEnum | null;
            aliases: Array<string>;
          };
        }>;
        fingerprints: Array<{
          __typename: "Fingerprint";
          hash: string;
          algorithm: FingerprintAlgorithm;
          duration: number;
          submissions: number;
          user_submitted: boolean;
          created: string;
          updated: string;
        }>;
        tags: Array<{
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          aliases: Array<string>;
        }>;
      }
    | {
        __typename: "Studio";
        id: string;
        name: string;
        deleted: boolean;
        is_favorite: boolean;
        child_studios: Array<{
          __typename: "Studio";
          id: string;
          name: string;
        }>;
        parent?: { __typename: "Studio"; id: string; name: string } | null;
        urls: Array<{
          __typename: "URL";
          url: string;
          site: { __typename: "Site"; id: string; name: string; icon: string };
        }>;
        images: Array<{
          __typename: "Image";
          id: string;
          url: string;
          height: number;
          width: number;
        }>;
      }
    | {
        __typename: "Tag";
        id: string;
        name: string;
        description?: string | null;
        deleted: boolean;
        aliases: Array<string>;
        category?: {
          __typename: "TagCategory";
          id: string;
          name: string;
        } | null;
      }
  >;
  options?: {
    __typename: "PerformerEditOptions";
    set_modify_aliases: boolean;
    set_merge_aliases: boolean;
  } | null;
};

export type FingerprintFragment = {
  __typename: "Fingerprint";
  hash: string;
  algorithm: FingerprintAlgorithm;
  duration: number;
};

export type ImageFragment = {
  __typename: "Image";
  id: string;
  url: string;
  width: number;
  height: number;
};

export type PerformerFragment = {
  __typename: "Performer";
  id: string;
  name: string;
  disambiguation?: string | null;
  deleted: boolean;
  aliases: Array<string>;
  gender?: GenderEnum | null;
  birth_date?: string | null;
  age?: number | null;
  height?: number | null;
  hair_color?: HairColorEnum | null;
  eye_color?: EyeColorEnum | null;
  ethnicity?: EthnicityEnum | null;
  country?: string | null;
  career_end_year?: number | null;
  career_start_year?: number | null;
  breast_type?: BreastTypeEnum | null;
  waist_size?: number | null;
  hip_size?: number | null;
  band_size?: number | null;
  cup_size?: string | null;
  is_favorite: boolean;
  tattoos?: Array<{
    __typename: "BodyModification";
    location: string;
    description?: string | null;
  }> | null;
  piercings?: Array<{
    __typename: "BodyModification";
    location: string;
    description?: string | null;
  }> | null;
  urls: Array<{
    __typename: "URL";
    url: string;
    site: { __typename: "Site"; id: string; name: string; icon: string };
  }>;
  images: Array<{
    __typename: "Image";
    id: string;
    url: string;
    width: number;
    height: number;
  }>;
};

export type QuerySceneFragment = {
  __typename: "Scene";
  id: string;
  release_date?: string | null;
  title?: string | null;
  duration?: number | null;
  urls: Array<{
    __typename: "URL";
    url: string;
    site: { __typename: "Site"; id: string; name: string; icon: string };
  }>;
  images: Array<{
    __typename: "Image";
    id: string;
    url: string;
    width: number;
    height: number;
  }>;
  studio?: { __typename: "Studio"; id: string; name: string } | null;
  performers: Array<{
    __typename: "PerformerAppearance";
    as?: string | null;
    performer: {
      __typename: "Performer";
      id: string;
      name: string;
      disambiguation?: string | null;
      deleted: boolean;
      gender?: GenderEnum | null;
      aliases: Array<string>;
    };
  }>;
};

export type SceneFragment = {
  __typename: "Scene";
  id: string;
  release_date?: string | null;
  title?: string | null;
  deleted: boolean;
  details?: string | null;
  director?: string | null;
  code?: string | null;
  duration?: number | null;
  urls: Array<{
    __typename: "URL";
    url: string;
    site: { __typename: "Site"; id: string; name: string; icon: string };
  }>;
  images: Array<{
    __typename: "Image";
    id: string;
    url: string;
    width: number;
    height: number;
  }>;
  studio?: {
    __typename: "Studio";
    id: string;
    name: string;
    parent?: { __typename: "Studio"; id: string; name: string } | null;
  } | null;
  performers: Array<{
    __typename: "PerformerAppearance";
    as?: string | null;
    performer: {
      __typename: "Performer";
      id: string;
      name: string;
      disambiguation?: string | null;
      deleted: boolean;
      gender?: GenderEnum | null;
      aliases: Array<string>;
    };
  }>;
  fingerprints: Array<{
    __typename: "Fingerprint";
    hash: string;
    algorithm: FingerprintAlgorithm;
    duration: number;
    submissions: number;
    user_submitted: boolean;
    created: string;
    updated: string;
  }>;
  tags: Array<{
    __typename: "Tag";
    id: string;
    name: string;
    description?: string | null;
    aliases: Array<string>;
  }>;
};

export type ScenePerformerFragment = {
  __typename: "Performer";
  id: string;
  name: string;
  disambiguation?: string | null;
  deleted: boolean;
  gender?: GenderEnum | null;
  aliases: Array<string>;
};

export type SearchPerformerFragment = {
  __typename: "Performer";
  id: string;
  name: string;
  disambiguation?: string | null;
  deleted: boolean;
  gender?: GenderEnum | null;
  aliases: Array<string>;
  country?: string | null;
  career_start_year?: number | null;
  career_end_year?: number | null;
  scene_count: number;
  birth_date?: string | null;
  is_favorite: boolean;
  urls: Array<{
    __typename: "URL";
    url: string;
    site: { __typename: "Site"; id: string; name: string; icon: string };
  }>;
  images: Array<{
    __typename: "Image";
    id: string;
    url: string;
    width: number;
    height: number;
  }>;
};

export type StudioFragment = {
  __typename: "Studio";
  id: string;
  name: string;
  deleted: boolean;
  is_favorite: boolean;
  child_studios: Array<{ __typename: "Studio"; id: string; name: string }>;
  parent?: { __typename: "Studio"; id: string; name: string } | null;
  urls: Array<{
    __typename: "URL";
    url: string;
    site: { __typename: "Site"; id: string; name: string; icon: string };
  }>;
  images: Array<{
    __typename: "Image";
    id: string;
    url: string;
    height: number;
    width: number;
  }>;
};

export type TagFragment = {
  __typename: "Tag";
  id: string;
  name: string;
  description?: string | null;
  deleted: boolean;
  aliases: Array<string>;
  category?: { __typename: "TagCategory"; id: string; name: string } | null;
};

export type UrlFragment = {
  __typename: "URL";
  url: string;
  site: { __typename: "Site"; id: string; name: string; icon: string };
};

export type ActivateNewUserMutationVariables = Exact<{
  input: ActivateNewUserInput;
}>;

export type ActivateNewUserMutation = {
  __typename: "Mutation";
  activateNewUser?: { __typename: "User"; id: string } | null;
};

export type AddImageMutationVariables = Exact<{
  imageData: ImageCreateInput;
}>;

export type AddImageMutation = {
  __typename: "Mutation";
  imageCreate?: {
    __typename: "Image";
    id: string;
    url: string;
    width: number;
    height: number;
  } | null;
};

export type AddSceneMutationVariables = Exact<{
  sceneData: SceneCreateInput;
}>;

export type AddSceneMutation = {
  __typename: "Mutation";
  sceneCreate?: {
    __typename: "Scene";
    id: string;
    release_date?: string | null;
    title?: string | null;
    code?: string | null;
    details?: string | null;
    director?: string | null;
    urls: Array<{
      __typename: "URL";
      url: string;
      site: { __typename: "Site"; id: string; name: string };
    }>;
    studio?: { __typename: "Studio"; id: string; name: string } | null;
    performers: Array<{
      __typename: "PerformerAppearance";
      performer: {
        __typename: "Performer";
        name: string;
        id: string;
        gender?: GenderEnum | null;
        aliases: Array<string>;
      };
    }>;
    fingerprints: Array<{
      __typename: "Fingerprint";
      hash: string;
      algorithm: FingerprintAlgorithm;
      duration: number;
    }>;
    tags: Array<{
      __typename: "Tag";
      id: string;
      name: string;
      description?: string | null;
    }>;
  } | null;
};

export type AddSiteMutationVariables = Exact<{
  siteData: SiteCreateInput;
}>;

export type AddSiteMutation = {
  __typename: "Mutation";
  siteCreate?: {
    __typename: "Site";
    id: string;
    name: string;
    description?: string | null;
    url?: string | null;
    regex?: string | null;
    valid_types: Array<ValidSiteTypeEnum>;
  } | null;
};

export type AddStudioMutationVariables = Exact<{
  studioData: StudioCreateInput;
}>;

export type AddStudioMutation = {
  __typename: "Mutation";
  studioCreate?: {
    __typename: "Studio";
    id: string;
    name: string;
    urls: Array<{
      __typename: "URL";
      url: string;
      site: { __typename: "Site"; id: string; name: string };
    }>;
  } | null;
};

export type AddTagCategoryMutationVariables = Exact<{
  categoryData: TagCategoryCreateInput;
}>;

export type AddTagCategoryMutation = {
  __typename: "Mutation";
  tagCategoryCreate?: {
    __typename: "TagCategory";
    id: string;
    name: string;
    description?: string | null;
    group: TagGroupEnum;
  } | null;
};

export type AddUserMutationVariables = Exact<{
  userData: UserCreateInput;
}>;

export type AddUserMutation = {
  __typename: "Mutation";
  userCreate?: {
    __typename: "User";
    id: string;
    name: string;
    email?: string | null;
    roles?: Array<RoleEnum> | null;
  } | null;
};

export type ApplyEditMutationVariables = Exact<{
  input: ApplyEditInput;
}>;

export type ApplyEditMutation = {
  __typename: "Mutation";
  applyEdit: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    closed?: string | null;
    expires?: string | null;
    vote_count: number;
    destructive: boolean;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    votes: Array<{
      __typename: "EditVote";
      date: string;
      vote: VoteTypeEnum;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          added_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    old_details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    merge_sources: Array<
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
  };
};

export type CancelEditMutationVariables = Exact<{
  input: CancelEditInput;
}>;

export type CancelEditMutation = {
  __typename: "Mutation";
  cancelEdit: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | { __typename: "Performer" }
      | { __typename: "Scene" }
      | { __typename: "Studio" }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
        }
      | null;
    details?:
      | { __typename: "PerformerEdit" }
      | { __typename: "SceneEdit" }
      | { __typename: "StudioEdit" }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
        }
      | null;
    merge_sources: Array<
      | { __typename: "Performer" }
      | { __typename: "Scene" }
      | { __typename: "Studio" }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
        }
    >;
  };
};

export type ChangePasswordMutationVariables = Exact<{
  userData: UserChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename: "Mutation";
  changePassword: boolean;
};

export type DeleteDraftMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteDraftMutation = {
  __typename: "Mutation";
  destroyDraft: boolean;
};

export type DeleteSceneMutationVariables = Exact<{
  input: SceneDestroyInput;
}>;

export type DeleteSceneMutation = {
  __typename: "Mutation";
  sceneDestroy: boolean;
};

export type DeleteSiteMutationVariables = Exact<{
  input: SiteDestroyInput;
}>;

export type DeleteSiteMutation = {
  __typename: "Mutation";
  siteDestroy: boolean;
};

export type DeleteStudioMutationVariables = Exact<{
  input: StudioDestroyInput;
}>;

export type DeleteStudioMutation = {
  __typename: "Mutation";
  studioDestroy: boolean;
};

export type DeleteTagCategoryMutationVariables = Exact<{
  input: TagCategoryDestroyInput;
}>;

export type DeleteTagCategoryMutation = {
  __typename: "Mutation";
  tagCategoryDestroy: boolean;
};

export type DeleteUserMutationVariables = Exact<{
  input: UserDestroyInput;
}>;

export type DeleteUserMutation = {
  __typename: "Mutation";
  userDestroy: boolean;
};

export type EditCommentMutationVariables = Exact<{
  input: EditCommentInput;
}>;

export type EditCommentMutation = {
  __typename: "Mutation";
  editComment: {
    __typename: "Edit";
    id: string;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
  };
};

export type FavoritePerformerMutationVariables = Exact<{
  id: Scalars["ID"];
  favorite: Scalars["Boolean"];
}>;

export type FavoritePerformerMutation = {
  __typename: "Mutation";
  favoritePerformer: boolean;
};

export type FavoriteStudioMutationVariables = Exact<{
  id: Scalars["ID"];
  favorite: Scalars["Boolean"];
}>;

export type FavoriteStudioMutation = {
  __typename: "Mutation";
  favoriteStudio: boolean;
};

export type GenerateInviteCodeMutationVariables = Exact<{
  [key: string]: never;
}>;

export type GenerateInviteCodeMutation = {
  __typename: "Mutation";
  generateInviteCode?: string | null;
};

export type GrantInviteMutationVariables = Exact<{
  input: GrantInviteInput;
}>;

export type GrantInviteMutation = {
  __typename: "Mutation";
  grantInvite: number;
};

export type NewUserMutationVariables = Exact<{
  input: NewUserInput;
}>;

export type NewUserMutation = {
  __typename: "Mutation";
  newUser?: string | null;
};

export type PerformerEditMutationVariables = Exact<{
  performerData: PerformerEditInput;
}>;

export type PerformerEditMutation = {
  __typename: "Mutation";
  performerEdit: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    closed?: string | null;
    expires?: string | null;
    vote_count: number;
    destructive: boolean;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    votes: Array<{
      __typename: "EditVote";
      date: string;
      vote: VoteTypeEnum;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          added_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    old_details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    merge_sources: Array<
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
  };
};

export type PerformerEditUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  performerData: PerformerEditInput;
}>;

export type PerformerEditUpdateMutation = {
  __typename: "Mutation";
  performerEditUpdate: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    closed?: string | null;
    expires?: string | null;
    vote_count: number;
    destructive: boolean;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    votes: Array<{
      __typename: "EditVote";
      date: string;
      vote: VoteTypeEnum;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          added_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    old_details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    merge_sources: Array<
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
  };
};

export type RegenerateApiKeyMutationVariables = Exact<{
  user_id?: InputMaybe<Scalars["ID"]>;
}>;

export type RegenerateApiKeyMutation = {
  __typename: "Mutation";
  regenerateAPIKey: string;
};

export type RescindInviteCodeMutationVariables = Exact<{
  code: Scalars["ID"];
}>;

export type RescindInviteCodeMutation = {
  __typename: "Mutation";
  rescindInviteCode: boolean;
};

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;

export type ResetPasswordMutation = {
  __typename: "Mutation";
  resetPassword: boolean;
};

export type RevokeInviteMutationVariables = Exact<{
  input: RevokeInviteInput;
}>;

export type RevokeInviteMutation = {
  __typename: "Mutation";
  revokeInvite: number;
};

export type SceneEditMutationVariables = Exact<{
  sceneData: SceneEditInput;
}>;

export type SceneEditMutation = {
  __typename: "Mutation";
  sceneEdit: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    closed?: string | null;
    expires?: string | null;
    vote_count: number;
    destructive: boolean;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    votes: Array<{
      __typename: "EditVote";
      date: string;
      vote: VoteTypeEnum;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          added_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    old_details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    merge_sources: Array<
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
  };
};

export type SceneEditUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  sceneData: SceneEditInput;
}>;

export type SceneEditUpdateMutation = {
  __typename: "Mutation";
  sceneEditUpdate: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    closed?: string | null;
    expires?: string | null;
    vote_count: number;
    destructive: boolean;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    votes: Array<{
      __typename: "EditVote";
      date: string;
      vote: VoteTypeEnum;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          added_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    old_details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    merge_sources: Array<
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
  };
};

export type StudioEditMutationVariables = Exact<{
  studioData: StudioEditInput;
}>;

export type StudioEditMutation = {
  __typename: "Mutation";
  studioEdit: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    closed?: string | null;
    expires?: string | null;
    vote_count: number;
    destructive: boolean;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    votes: Array<{
      __typename: "EditVote";
      date: string;
      vote: VoteTypeEnum;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          added_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    old_details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    merge_sources: Array<
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
  };
};

export type StudioEditUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  studioData: StudioEditInput;
}>;

export type StudioEditUpdateMutation = {
  __typename: "Mutation";
  studioEditUpdate: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    closed?: string | null;
    expires?: string | null;
    vote_count: number;
    destructive: boolean;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    votes: Array<{
      __typename: "EditVote";
      date: string;
      vote: VoteTypeEnum;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          added_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    old_details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    merge_sources: Array<
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
  };
};

export type TagEditMutationVariables = Exact<{
  tagData: TagEditInput;
}>;

export type TagEditMutation = {
  __typename: "Mutation";
  tagEdit: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    closed?: string | null;
    expires?: string | null;
    vote_count: number;
    destructive: boolean;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    votes: Array<{
      __typename: "EditVote";
      date: string;
      vote: VoteTypeEnum;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          added_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    old_details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    merge_sources: Array<
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
  };
};

export type TagEditUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  tagData: TagEditInput;
}>;

export type TagEditUpdateMutation = {
  __typename: "Mutation";
  tagEditUpdate: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    closed?: string | null;
    expires?: string | null;
    vote_count: number;
    destructive: boolean;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    votes: Array<{
      __typename: "EditVote";
      date: string;
      vote: VoteTypeEnum;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          added_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    old_details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    merge_sources: Array<
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
  };
};

export type UnmatchFingerprintMutationVariables = Exact<{
  scene_id: Scalars["ID"];
  algorithm: FingerprintAlgorithm;
  hash: Scalars["String"];
  duration: Scalars["Int"];
}>;

export type UnmatchFingerprintMutation = {
  __typename: "Mutation";
  unmatchFingerprint: boolean;
};

export type UpdateSceneMutationVariables = Exact<{
  updateData: SceneUpdateInput;
}>;

export type UpdateSceneMutation = {
  __typename: "Mutation";
  sceneUpdate?: {
    __typename: "Scene";
    id: string;
    release_date?: string | null;
    details?: string | null;
    director?: string | null;
    code?: string | null;
    duration?: number | null;
    title?: string | null;
    urls: Array<{
      __typename: "URL";
      url: string;
      site: { __typename: "Site"; id: string; name: string };
    }>;
    studio?: { __typename: "Studio"; id: string; name: string } | null;
    performers: Array<{
      __typename: "PerformerAppearance";
      performer: {
        __typename: "Performer";
        name: string;
        id: string;
        gender?: GenderEnum | null;
        aliases: Array<string>;
      };
    }>;
    fingerprints: Array<{
      __typename: "Fingerprint";
      hash: string;
      algorithm: FingerprintAlgorithm;
      duration: number;
    }>;
    tags: Array<{
      __typename: "Tag";
      id: string;
      name: string;
      description?: string | null;
    }>;
  } | null;
};

export type UpdateSiteMutationVariables = Exact<{
  siteData: SiteUpdateInput;
}>;

export type UpdateSiteMutation = {
  __typename: "Mutation";
  siteUpdate?: {
    __typename: "Site";
    id: string;
    name: string;
    description?: string | null;
    url?: string | null;
    regex?: string | null;
    valid_types: Array<ValidSiteTypeEnum>;
  } | null;
};

export type UpdateStudioMutationVariables = Exact<{
  input: StudioUpdateInput;
}>;

export type UpdateStudioMutation = {
  __typename: "Mutation";
  studioUpdate?: {
    __typename: "Studio";
    id: string;
    name: string;
    deleted: boolean;
    is_favorite: boolean;
    child_studios: Array<{ __typename: "Studio"; id: string; name: string }>;
    parent?: { __typename: "Studio"; id: string; name: string } | null;
    urls: Array<{
      __typename: "URL";
      url: string;
      site: { __typename: "Site"; id: string; name: string; icon: string };
    }>;
    images: Array<{
      __typename: "Image";
      id: string;
      url: string;
      height: number;
      width: number;
    }>;
  } | null;
};

export type UpdateTagCategoryMutationVariables = Exact<{
  categoryData: TagCategoryUpdateInput;
}>;

export type UpdateTagCategoryMutation = {
  __typename: "Mutation";
  tagCategoryUpdate?: {
    __typename: "TagCategory";
    id: string;
    name: string;
    description?: string | null;
    group: TagGroupEnum;
  } | null;
};

export type UpdateUserMutationVariables = Exact<{
  userData: UserUpdateInput;
}>;

export type UpdateUserMutation = {
  __typename: "Mutation";
  userUpdate?: {
    __typename: "User";
    id: string;
    name: string;
    email?: string | null;
    roles?: Array<RoleEnum> | null;
  } | null;
};

export type VoteMutationVariables = Exact<{
  input: EditVoteInput;
}>;

export type VoteMutation = {
  __typename: "Mutation";
  editVote: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    closed?: string | null;
    expires?: string | null;
    vote_count: number;
    destructive: boolean;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    votes: Array<{
      __typename: "EditVote";
      date: string;
      vote: VoteTypeEnum;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          added_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    old_details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    merge_sources: Array<
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
  };
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
  __typename: "Query";
  queryTagCategories: {
    __typename: "QueryTagCategoriesResultType";
    count: number;
    tag_categories: Array<{
      __typename: "TagCategory";
      id: string;
      name: string;
      description?: string | null;
      group: TagGroupEnum;
    }>;
  };
};

export type CategoryQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type CategoryQuery = {
  __typename: "Query";
  findTagCategory?: {
    __typename: "TagCategory";
    id: string;
    name: string;
    description?: string | null;
    group: TagGroupEnum;
  } | null;
};

export type ConfigQueryVariables = Exact<{ [key: string]: never }>;

export type ConfigQuery = {
  __typename: "Query";
  getConfig: {
    __typename: "StashBoxConfig";
    host_url: string;
    require_invite: boolean;
    require_activation: boolean;
    vote_promotion_threshold?: number | null;
    vote_application_threshold: number;
    voting_period: number;
    min_destructive_voting_period: number;
    vote_cron_interval: string;
  };
};

export type DraftQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DraftQuery = {
  __typename: "Query";
  findDraft?: {
    __typename: "Draft";
    id: string;
    created: string;
    expires: string;
    data:
      | {
          __typename: "PerformerDraft";
          id?: string | null;
          name: string;
          aliases?: string | null;
          gender?: string | null;
          birthdate?: string | null;
          urls?: Array<string> | null;
          ethnicity?: string | null;
          country?: string | null;
          eye_color?: string | null;
          hair_color?: string | null;
          height?: string | null;
          measurements?: string | null;
          breast_type?: string | null;
          tattoos?: string | null;
          piercings?: string | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          image?: {
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null;
        }
      | {
          __typename: "SceneDraft";
          id?: string | null;
          title?: string | null;
          code?: string | null;
          details?: string | null;
          director?: string | null;
          date?: string | null;
          url?: {
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          } | null;
          studio?:
            | {
                __typename: "DraftEntity";
                name: string;
                draftID?: string | null;
              }
            | {
                __typename: "Studio";
                id: string;
                name: string;
                deleted: boolean;
                is_favorite: boolean;
                child_studios: Array<{
                  __typename: "Studio";
                  id: string;
                  name: string;
                }>;
                parent?: {
                  __typename: "Studio";
                  id: string;
                  name: string;
                } | null;
                urls: Array<{
                  __typename: "URL";
                  url: string;
                  site: {
                    __typename: "Site";
                    id: string;
                    name: string;
                    icon: string;
                  };
                }>;
                images: Array<{
                  __typename: "Image";
                  id: string;
                  url: string;
                  height: number;
                  width: number;
                }>;
              }
            | null;
          performers: Array<
            | {
                __typename: "DraftEntity";
                name: string;
                draftID?: string | null;
              }
            | {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                aliases: Array<string>;
                gender?: GenderEnum | null;
                birth_date?: string | null;
                age?: number | null;
                height?: number | null;
                hair_color?: HairColorEnum | null;
                eye_color?: EyeColorEnum | null;
                ethnicity?: EthnicityEnum | null;
                country?: string | null;
                career_end_year?: number | null;
                career_start_year?: number | null;
                breast_type?: BreastTypeEnum | null;
                waist_size?: number | null;
                hip_size?: number | null;
                band_size?: number | null;
                cup_size?: string | null;
                is_favorite: boolean;
                tattoos?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                piercings?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                urls: Array<{
                  __typename: "URL";
                  url: string;
                  site: {
                    __typename: "Site";
                    id: string;
                    name: string;
                    icon: string;
                  };
                }>;
                images: Array<{
                  __typename: "Image";
                  id: string;
                  url: string;
                  width: number;
                  height: number;
                }>;
              }
          >;
          tags?: Array<
            | {
                __typename: "DraftEntity";
                name: string;
                draftID?: string | null;
              }
            | {
                __typename: "Tag";
                id: string;
                name: string;
                description?: string | null;
                deleted: boolean;
                aliases: Array<string>;
                category?: {
                  __typename: "TagCategory";
                  id: string;
                  name: string;
                } | null;
              }
          > | null;
          fingerprints: Array<{
            __typename: "DraftFingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }>;
          image?: {
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null;
        };
  } | null;
};

export type DraftsQueryVariables = Exact<{ [key: string]: never }>;

export type DraftsQuery = {
  __typename: "Query";
  findDrafts: Array<{
    __typename: "Draft";
    id: string;
    created: string;
    expires: string;
    data:
      | { __typename: "PerformerDraft"; id?: string | null; name: string }
      | { __typename: "SceneDraft"; id?: string | null; title?: string | null };
  }>;
};

export type EditQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type EditQuery = {
  __typename: "Query";
  findEdit?: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    closed?: string | null;
    expires?: string | null;
    vote_count: number;
    destructive: boolean;
    comments: Array<{
      __typename: "EditComment";
      id: string;
      date: string;
      comment: string;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    votes: Array<{
      __typename: "EditVote";
      date: string;
      vote: VoteTypeEnum;
      user?: { __typename: "User"; id: string; name: string } | null;
    }>;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          added_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          removed_piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          added_aliases?: Array<string> | null;
          removed_aliases?: Array<string> | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    old_details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          added_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          removed_urls?: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }> | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          added_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          removed_performers?: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }> | null;
          added_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          removed_tags?: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }> | null;
          added_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          removed_images?: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          } | null> | null;
          added_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
          removed_fingerprints?: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }> | null;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    merge_sources: Array<
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
  } | null;
};

export type EditUpdateQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type EditUpdateQuery = {
  __typename: "Query";
  findEdit?: {
    __typename: "Edit";
    id: string;
    target_type: TargetTypeEnum;
    operation: OperationEnum;
    status: VoteStatusEnum;
    applied: boolean;
    created: string;
    updated?: string | null;
    vote_count: number;
    merge_sources: Array<
      | { __typename: "Performer"; id: string }
      | { __typename: "Scene"; id: string }
      | { __typename: "Studio"; id: string }
      | { __typename: "Tag"; id: string }
    >;
    options?: {
      __typename: "PerformerEditOptions";
      set_modify_aliases: boolean;
      set_merge_aliases: boolean;
    } | null;
    user?: { __typename: "User"; id: string; name: string } | null;
    target?:
      | {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          aliases: Array<string>;
          gender?: GenderEnum | null;
          birth_date?: string | null;
          age?: number | null;
          height?: number | null;
          hair_color?: HairColorEnum | null;
          eye_color?: EyeColorEnum | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          career_end_year?: number | null;
          career_start_year?: number | null;
          breast_type?: BreastTypeEnum | null;
          waist_size?: number | null;
          hip_size?: number | null;
          band_size?: number | null;
          cup_size?: string | null;
          is_favorite: boolean;
          tattoos?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          piercings?: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }> | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "Scene";
          id: string;
          release_date?: string | null;
          title?: string | null;
          deleted: boolean;
          details?: string | null;
          director?: string | null;
          code?: string | null;
          duration?: number | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
          } | null;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              gender?: GenderEnum | null;
              aliases: Array<string>;
            };
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
            submissions: number;
            user_submitted: boolean;
            created: string;
            updated: string;
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            aliases: Array<string>;
          }>;
        }
      | {
          __typename: "Studio";
          id: string;
          name: string;
          deleted: boolean;
          is_favorite: boolean;
          child_studios: Array<{
            __typename: "Studio";
            id: string;
            name: string;
          }>;
          parent?: { __typename: "Studio"; id: string; name: string } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            height: number;
            width: number;
          }>;
        }
      | {
          __typename: "Tag";
          aliases: Array<string>;
          id: string;
          name: string;
          description?: string | null;
          deleted: boolean;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
    details?:
      | {
          __typename: "PerformerEdit";
          name?: string | null;
          disambiguation?: string | null;
          gender?: GenderEnum | null;
          birthdate?: string | null;
          ethnicity?: EthnicityEnum | null;
          country?: string | null;
          eye_color?: EyeColorEnum | null;
          hair_color?: HairColorEnum | null;
          height?: number | null;
          cup_size?: string | null;
          band_size?: number | null;
          waist_size?: number | null;
          hip_size?: number | null;
          breast_type?: BreastTypeEnum | null;
          career_start_year?: number | null;
          career_end_year?: number | null;
          aliases: Array<string>;
          draft_id?: string | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          tattoos: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }>;
          piercings: Array<{
            __typename: "BodyModification";
            location: string;
            description?: string | null;
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "SceneEdit";
          title?: string | null;
          details?: string | null;
          date?: string | null;
          duration?: number | null;
          director?: string | null;
          code?: string | null;
          draft_id?: string | null;
          studio?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          performers: Array<{
            __typename: "PerformerAppearance";
            as?: string | null;
            performer: {
              __typename: "Performer";
              id: string;
              name: string;
              disambiguation?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              gender?: GenderEnum | null;
              birth_date?: string | null;
              age?: number | null;
              height?: number | null;
              hair_color?: HairColorEnum | null;
              eye_color?: EyeColorEnum | null;
              ethnicity?: EthnicityEnum | null;
              country?: string | null;
              career_end_year?: number | null;
              career_start_year?: number | null;
              breast_type?: BreastTypeEnum | null;
              waist_size?: number | null;
              hip_size?: number | null;
              band_size?: number | null;
              cup_size?: string | null;
              is_favorite: boolean;
              tattoos?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              piercings?: Array<{
                __typename: "BodyModification";
                location: string;
                description?: string | null;
              }> | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                width: number;
                height: number;
              }>;
            };
          }>;
          tags: Array<{
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }>;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
          fingerprints: Array<{
            __typename: "Fingerprint";
            hash: string;
            algorithm: FingerprintAlgorithm;
            duration: number;
          }>;
        }
      | {
          __typename: "StudioEdit";
          name?: string | null;
          urls: Array<{
            __typename: "URL";
            url: string;
            site: {
              __typename: "Site";
              id: string;
              name: string;
              icon: string;
            };
          }>;
          parent?: {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          } | null;
          images: Array<{
            __typename: "Image";
            id: string;
            url: string;
            width: number;
            height: number;
          }>;
        }
      | {
          __typename: "TagEdit";
          name?: string | null;
          description?: string | null;
          aliases: Array<string>;
          category?: {
            __typename: "TagCategory";
            id: string;
            name: string;
          } | null;
        }
      | null;
  } | null;
};

export type EditsQueryVariables = Exact<{
  input: EditQueryInput;
}>;

export type EditsQuery = {
  __typename: "Query";
  queryEdits: {
    __typename: "QueryEditsResultType";
    count: number;
    edits: Array<{
      __typename: "Edit";
      id: string;
      target_type: TargetTypeEnum;
      operation: OperationEnum;
      status: VoteStatusEnum;
      applied: boolean;
      created: string;
      updated?: string | null;
      closed?: string | null;
      expires?: string | null;
      vote_count: number;
      destructive: boolean;
      comments: Array<{
        __typename: "EditComment";
        id: string;
        date: string;
        comment: string;
        user?: { __typename: "User"; id: string; name: string } | null;
      }>;
      votes: Array<{
        __typename: "EditVote";
        date: string;
        vote: VoteTypeEnum;
        user?: { __typename: "User"; id: string; name: string } | null;
      }>;
      user?: { __typename: "User"; id: string; name: string } | null;
      target?:
        | {
            __typename: "Performer";
            id: string;
            name: string;
            disambiguation?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            gender?: GenderEnum | null;
            birth_date?: string | null;
            age?: number | null;
            height?: number | null;
            hair_color?: HairColorEnum | null;
            eye_color?: EyeColorEnum | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            career_end_year?: number | null;
            career_start_year?: number | null;
            breast_type?: BreastTypeEnum | null;
            waist_size?: number | null;
            hip_size?: number | null;
            band_size?: number | null;
            cup_size?: string | null;
            is_favorite: boolean;
            tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
          }
        | {
            __typename: "Scene";
            id: string;
            release_date?: string | null;
            title?: string | null;
            deleted: boolean;
            details?: string | null;
            director?: string | null;
            code?: string | null;
            duration?: number | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
            studio?: {
              __typename: "Studio";
              id: string;
              name: string;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
            } | null;
            performers: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                gender?: GenderEnum | null;
                aliases: Array<string>;
              };
            }>;
            fingerprints: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
              submissions: number;
              user_submitted: boolean;
              created: string;
              updated: string;
            }>;
            tags: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              aliases: Array<string>;
            }>;
          }
        | {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          }
        | {
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }
        | null;
      details?:
        | {
            __typename: "PerformerEdit";
            name?: string | null;
            disambiguation?: string | null;
            added_aliases?: Array<string> | null;
            removed_aliases?: Array<string> | null;
            gender?: GenderEnum | null;
            birthdate?: string | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            eye_color?: EyeColorEnum | null;
            hair_color?: HairColorEnum | null;
            height?: number | null;
            cup_size?: string | null;
            band_size?: number | null;
            waist_size?: number | null;
            hip_size?: number | null;
            breast_type?: BreastTypeEnum | null;
            career_start_year?: number | null;
            career_end_year?: number | null;
            draft_id?: string | null;
            added_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            removed_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            added_tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            removed_tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            added_piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            removed_piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            added_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            removed_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
          }
        | {
            __typename: "SceneEdit";
            title?: string | null;
            details?: string | null;
            date?: string | null;
            duration?: number | null;
            director?: string | null;
            code?: string | null;
            draft_id?: string | null;
            added_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            removed_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            studio?: {
              __typename: "Studio";
              id: string;
              name: string;
              deleted: boolean;
              is_favorite: boolean;
              child_studios: Array<{
                __typename: "Studio";
                id: string;
                name: string;
              }>;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                height: number;
                width: number;
              }>;
            } | null;
            added_performers?: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                aliases: Array<string>;
                gender?: GenderEnum | null;
                birth_date?: string | null;
                age?: number | null;
                height?: number | null;
                hair_color?: HairColorEnum | null;
                eye_color?: EyeColorEnum | null;
                ethnicity?: EthnicityEnum | null;
                country?: string | null;
                career_end_year?: number | null;
                career_start_year?: number | null;
                breast_type?: BreastTypeEnum | null;
                waist_size?: number | null;
                hip_size?: number | null;
                band_size?: number | null;
                cup_size?: string | null;
                is_favorite: boolean;
                tattoos?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                piercings?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                urls: Array<{
                  __typename: "URL";
                  url: string;
                  site: {
                    __typename: "Site";
                    id: string;
                    name: string;
                    icon: string;
                  };
                }>;
                images: Array<{
                  __typename: "Image";
                  id: string;
                  url: string;
                  width: number;
                  height: number;
                }>;
              };
            }> | null;
            removed_performers?: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                aliases: Array<string>;
                gender?: GenderEnum | null;
                birth_date?: string | null;
                age?: number | null;
                height?: number | null;
                hair_color?: HairColorEnum | null;
                eye_color?: EyeColorEnum | null;
                ethnicity?: EthnicityEnum | null;
                country?: string | null;
                career_end_year?: number | null;
                career_start_year?: number | null;
                breast_type?: BreastTypeEnum | null;
                waist_size?: number | null;
                hip_size?: number | null;
                band_size?: number | null;
                cup_size?: string | null;
                is_favorite: boolean;
                tattoos?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                piercings?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                urls: Array<{
                  __typename: "URL";
                  url: string;
                  site: {
                    __typename: "Site";
                    id: string;
                    name: string;
                    icon: string;
                  };
                }>;
                images: Array<{
                  __typename: "Image";
                  id: string;
                  url: string;
                  width: number;
                  height: number;
                }>;
              };
            }> | null;
            added_tags?: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              category?: {
                __typename: "TagCategory";
                id: string;
                name: string;
              } | null;
            }> | null;
            removed_tags?: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              category?: {
                __typename: "TagCategory";
                id: string;
                name: string;
              } | null;
            }> | null;
            added_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            removed_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            added_fingerprints?: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
            }> | null;
            removed_fingerprints?: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
            }> | null;
          }
        | {
            __typename: "StudioEdit";
            name?: string | null;
            added_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            removed_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            parent?: {
              __typename: "Studio";
              id: string;
              name: string;
              deleted: boolean;
              is_favorite: boolean;
              child_studios: Array<{
                __typename: "Studio";
                id: string;
                name: string;
              }>;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                height: number;
                width: number;
              }>;
            } | null;
            added_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            removed_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
          }
        | {
            __typename: "TagEdit";
            name?: string | null;
            description?: string | null;
            added_aliases?: Array<string> | null;
            removed_aliases?: Array<string> | null;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }
        | null;
      old_details?:
        | {
            __typename: "PerformerEdit";
            name?: string | null;
            disambiguation?: string | null;
            gender?: GenderEnum | null;
            birthdate?: string | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            eye_color?: EyeColorEnum | null;
            hair_color?: HairColorEnum | null;
            height?: number | null;
            cup_size?: string | null;
            band_size?: number | null;
            waist_size?: number | null;
            hip_size?: number | null;
            breast_type?: BreastTypeEnum | null;
            career_start_year?: number | null;
            career_end_year?: number | null;
          }
        | {
            __typename: "SceneEdit";
            title?: string | null;
            details?: string | null;
            date?: string | null;
            duration?: number | null;
            director?: string | null;
            code?: string | null;
            added_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            removed_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            studio?: {
              __typename: "Studio";
              id: string;
              name: string;
              deleted: boolean;
              is_favorite: boolean;
              child_studios: Array<{
                __typename: "Studio";
                id: string;
                name: string;
              }>;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                height: number;
                width: number;
              }>;
            } | null;
            added_performers?: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                aliases: Array<string>;
                gender?: GenderEnum | null;
                birth_date?: string | null;
                age?: number | null;
                height?: number | null;
                hair_color?: HairColorEnum | null;
                eye_color?: EyeColorEnum | null;
                ethnicity?: EthnicityEnum | null;
                country?: string | null;
                career_end_year?: number | null;
                career_start_year?: number | null;
                breast_type?: BreastTypeEnum | null;
                waist_size?: number | null;
                hip_size?: number | null;
                band_size?: number | null;
                cup_size?: string | null;
                is_favorite: boolean;
                tattoos?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                piercings?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                urls: Array<{
                  __typename: "URL";
                  url: string;
                  site: {
                    __typename: "Site";
                    id: string;
                    name: string;
                    icon: string;
                  };
                }>;
                images: Array<{
                  __typename: "Image";
                  id: string;
                  url: string;
                  width: number;
                  height: number;
                }>;
              };
            }> | null;
            removed_performers?: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                aliases: Array<string>;
                gender?: GenderEnum | null;
                birth_date?: string | null;
                age?: number | null;
                height?: number | null;
                hair_color?: HairColorEnum | null;
                eye_color?: EyeColorEnum | null;
                ethnicity?: EthnicityEnum | null;
                country?: string | null;
                career_end_year?: number | null;
                career_start_year?: number | null;
                breast_type?: BreastTypeEnum | null;
                waist_size?: number | null;
                hip_size?: number | null;
                band_size?: number | null;
                cup_size?: string | null;
                is_favorite: boolean;
                tattoos?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                piercings?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                urls: Array<{
                  __typename: "URL";
                  url: string;
                  site: {
                    __typename: "Site";
                    id: string;
                    name: string;
                    icon: string;
                  };
                }>;
                images: Array<{
                  __typename: "Image";
                  id: string;
                  url: string;
                  width: number;
                  height: number;
                }>;
              };
            }> | null;
            added_tags?: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              category?: {
                __typename: "TagCategory";
                id: string;
                name: string;
              } | null;
            }> | null;
            removed_tags?: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              category?: {
                __typename: "TagCategory";
                id: string;
                name: string;
              } | null;
            }> | null;
            added_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            removed_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            added_fingerprints?: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
            }> | null;
            removed_fingerprints?: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
            }> | null;
          }
        | {
            __typename: "StudioEdit";
            name?: string | null;
            parent?: {
              __typename: "Studio";
              id: string;
              name: string;
              deleted: boolean;
              is_favorite: boolean;
              child_studios: Array<{
                __typename: "Studio";
                id: string;
                name: string;
              }>;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                height: number;
                width: number;
              }>;
            } | null;
          }
        | {
            __typename: "TagEdit";
            name?: string | null;
            description?: string | null;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }
        | null;
      merge_sources: Array<
        | {
            __typename: "Performer";
            id: string;
            name: string;
            disambiguation?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            gender?: GenderEnum | null;
            birth_date?: string | null;
            age?: number | null;
            height?: number | null;
            hair_color?: HairColorEnum | null;
            eye_color?: EyeColorEnum | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            career_end_year?: number | null;
            career_start_year?: number | null;
            breast_type?: BreastTypeEnum | null;
            waist_size?: number | null;
            hip_size?: number | null;
            band_size?: number | null;
            cup_size?: string | null;
            is_favorite: boolean;
            tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
          }
        | {
            __typename: "Scene";
            id: string;
            release_date?: string | null;
            title?: string | null;
            deleted: boolean;
            details?: string | null;
            director?: string | null;
            code?: string | null;
            duration?: number | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
            studio?: {
              __typename: "Studio";
              id: string;
              name: string;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
            } | null;
            performers: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                gender?: GenderEnum | null;
                aliases: Array<string>;
              };
            }>;
            fingerprints: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
              submissions: number;
              user_submitted: boolean;
              created: string;
              updated: string;
            }>;
            tags: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              aliases: Array<string>;
            }>;
          }
        | {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          }
        | {
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }
      >;
      options?: {
        __typename: "PerformerEditOptions";
        set_modify_aliases: boolean;
        set_merge_aliases: boolean;
      } | null;
    }>;
  };
};

export type FullPerformerQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type FullPerformerQuery = {
  __typename: "Query";
  findPerformer?: {
    __typename: "Performer";
    id: string;
    name: string;
    disambiguation?: string | null;
    deleted: boolean;
    aliases: Array<string>;
    gender?: GenderEnum | null;
    birth_date?: string | null;
    age?: number | null;
    height?: number | null;
    hair_color?: HairColorEnum | null;
    eye_color?: EyeColorEnum | null;
    ethnicity?: EthnicityEnum | null;
    country?: string | null;
    career_end_year?: number | null;
    career_start_year?: number | null;
    breast_type?: BreastTypeEnum | null;
    waist_size?: number | null;
    hip_size?: number | null;
    band_size?: number | null;
    cup_size?: string | null;
    is_favorite: boolean;
    studios: Array<{
      __typename: "PerformerStudio";
      scene_count: number;
      studio: {
        __typename: "Studio";
        id: string;
        name: string;
        parent?: { __typename: "Studio"; id: string; name: string } | null;
      };
    }>;
    tattoos?: Array<{
      __typename: "BodyModification";
      location: string;
      description?: string | null;
    }> | null;
    piercings?: Array<{
      __typename: "BodyModification";
      location: string;
      description?: string | null;
    }> | null;
    urls: Array<{
      __typename: "URL";
      url: string;
      site: { __typename: "Site"; id: string; name: string; icon: string };
    }>;
    images: Array<{
      __typename: "Image";
      id: string;
      url: string;
      width: number;
      height: number;
    }>;
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename: "Query";
  me?: {
    __typename: "User";
    id: string;
    name: string;
    roles?: Array<RoleEnum> | null;
  } | null;
};

export type PendingEditsCountQueryVariables = Exact<{
  type: TargetTypeEnum;
  id: Scalars["ID"];
}>;

export type PendingEditsCountQuery = {
  __typename: "Query";
  queryEdits: { __typename: "QueryEditsResultType"; count: number };
};

export type PerformerQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PerformerQuery = {
  __typename: "Query";
  findPerformer?: {
    __typename: "Performer";
    id: string;
    name: string;
    disambiguation?: string | null;
    deleted: boolean;
    aliases: Array<string>;
    gender?: GenderEnum | null;
    birth_date?: string | null;
    age?: number | null;
    height?: number | null;
    hair_color?: HairColorEnum | null;
    eye_color?: EyeColorEnum | null;
    ethnicity?: EthnicityEnum | null;
    country?: string | null;
    career_end_year?: number | null;
    career_start_year?: number | null;
    breast_type?: BreastTypeEnum | null;
    waist_size?: number | null;
    hip_size?: number | null;
    band_size?: number | null;
    cup_size?: string | null;
    is_favorite: boolean;
    tattoos?: Array<{
      __typename: "BodyModification";
      location: string;
      description?: string | null;
    }> | null;
    piercings?: Array<{
      __typename: "BodyModification";
      location: string;
      description?: string | null;
    }> | null;
    urls: Array<{
      __typename: "URL";
      url: string;
      site: { __typename: "Site"; id: string; name: string; icon: string };
    }>;
    images: Array<{
      __typename: "Image";
      id: string;
      url: string;
      width: number;
      height: number;
    }>;
  } | null;
};

export type PerformersQueryVariables = Exact<{
  input: PerformerQueryInput;
}>;

export type PerformersQuery = {
  __typename: "Query";
  queryPerformers: {
    __typename: "QueryPerformersResultType";
    count: number;
    performers: Array<{
      __typename: "Performer";
      id: string;
      name: string;
      disambiguation?: string | null;
      deleted: boolean;
      aliases: Array<string>;
      gender?: GenderEnum | null;
      birth_date?: string | null;
      age?: number | null;
      height?: number | null;
      hair_color?: HairColorEnum | null;
      eye_color?: EyeColorEnum | null;
      ethnicity?: EthnicityEnum | null;
      country?: string | null;
      career_end_year?: number | null;
      career_start_year?: number | null;
      breast_type?: BreastTypeEnum | null;
      waist_size?: number | null;
      hip_size?: number | null;
      band_size?: number | null;
      cup_size?: string | null;
      is_favorite: boolean;
      tattoos?: Array<{
        __typename: "BodyModification";
        location: string;
        description?: string | null;
      }> | null;
      piercings?: Array<{
        __typename: "BodyModification";
        location: string;
        description?: string | null;
      }> | null;
      urls: Array<{
        __typename: "URL";
        url: string;
        site: { __typename: "Site"; id: string; name: string; icon: string };
      }>;
      images: Array<{
        __typename: "Image";
        id: string;
        url: string;
        width: number;
        height: number;
      }>;
    }>;
  };
};

export type PublicUserQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type PublicUserQuery = {
  __typename: "Query";
  findUser?: {
    __typename: "User";
    id: string;
    name: string;
    vote_count: {
      __typename: "UserVoteCount";
      accept: number;
      reject: number;
      immediate_accept: number;
      immediate_reject: number;
      abstain: number;
    };
    edit_count: {
      __typename: "UserEditCount";
      immediate_accepted: number;
      immediate_rejected: number;
      accepted: number;
      rejected: number;
      failed: number;
      canceled: number;
      pending: number;
    };
  } | null;
};

export type QueryExistingSceneQueryVariables = Exact<{
  input: QueryExistingSceneInput;
}>;

export type QueryExistingSceneQuery = {
  __typename: "Query";
  queryExistingScene: {
    __typename: "QueryExistingSceneResult";
    scenes: Array<{
      __typename: "Scene";
      id: string;
      release_date?: string | null;
      title?: string | null;
      deleted: boolean;
      details?: string | null;
      director?: string | null;
      code?: string | null;
      duration?: number | null;
      urls: Array<{
        __typename: "URL";
        url: string;
        site: { __typename: "Site"; id: string; name: string; icon: string };
      }>;
      images: Array<{
        __typename: "Image";
        id: string;
        url: string;
        width: number;
        height: number;
      }>;
      studio?: {
        __typename: "Studio";
        id: string;
        name: string;
        parent?: { __typename: "Studio"; id: string; name: string } | null;
      } | null;
      performers: Array<{
        __typename: "PerformerAppearance";
        as?: string | null;
        performer: {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          gender?: GenderEnum | null;
          aliases: Array<string>;
        };
      }>;
      fingerprints: Array<{
        __typename: "Fingerprint";
        hash: string;
        algorithm: FingerprintAlgorithm;
        duration: number;
        submissions: number;
        user_submitted: boolean;
        created: string;
        updated: string;
      }>;
      tags: Array<{
        __typename: "Tag";
        id: string;
        name: string;
        description?: string | null;
        aliases: Array<string>;
      }>;
    }>;
    edits: Array<{
      __typename: "Edit";
      id: string;
      target_type: TargetTypeEnum;
      operation: OperationEnum;
      status: VoteStatusEnum;
      applied: boolean;
      created: string;
      updated?: string | null;
      closed?: string | null;
      expires?: string | null;
      vote_count: number;
      destructive: boolean;
      comments: Array<{
        __typename: "EditComment";
        id: string;
        date: string;
        comment: string;
        user?: { __typename: "User"; id: string; name: string } | null;
      }>;
      votes: Array<{
        __typename: "EditVote";
        date: string;
        vote: VoteTypeEnum;
        user?: { __typename: "User"; id: string; name: string } | null;
      }>;
      user?: { __typename: "User"; id: string; name: string } | null;
      target?:
        | {
            __typename: "Performer";
            id: string;
            name: string;
            disambiguation?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            gender?: GenderEnum | null;
            birth_date?: string | null;
            age?: number | null;
            height?: number | null;
            hair_color?: HairColorEnum | null;
            eye_color?: EyeColorEnum | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            career_end_year?: number | null;
            career_start_year?: number | null;
            breast_type?: BreastTypeEnum | null;
            waist_size?: number | null;
            hip_size?: number | null;
            band_size?: number | null;
            cup_size?: string | null;
            is_favorite: boolean;
            tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
          }
        | {
            __typename: "Scene";
            id: string;
            release_date?: string | null;
            title?: string | null;
            deleted: boolean;
            details?: string | null;
            director?: string | null;
            code?: string | null;
            duration?: number | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
            studio?: {
              __typename: "Studio";
              id: string;
              name: string;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
            } | null;
            performers: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                gender?: GenderEnum | null;
                aliases: Array<string>;
              };
            }>;
            fingerprints: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
              submissions: number;
              user_submitted: boolean;
              created: string;
              updated: string;
            }>;
            tags: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              aliases: Array<string>;
            }>;
          }
        | {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          }
        | {
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }
        | null;
      details?:
        | {
            __typename: "PerformerEdit";
            name?: string | null;
            disambiguation?: string | null;
            added_aliases?: Array<string> | null;
            removed_aliases?: Array<string> | null;
            gender?: GenderEnum | null;
            birthdate?: string | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            eye_color?: EyeColorEnum | null;
            hair_color?: HairColorEnum | null;
            height?: number | null;
            cup_size?: string | null;
            band_size?: number | null;
            waist_size?: number | null;
            hip_size?: number | null;
            breast_type?: BreastTypeEnum | null;
            career_start_year?: number | null;
            career_end_year?: number | null;
            draft_id?: string | null;
            added_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            removed_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            added_tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            removed_tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            added_piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            removed_piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            added_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            removed_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
          }
        | {
            __typename: "SceneEdit";
            title?: string | null;
            details?: string | null;
            date?: string | null;
            duration?: number | null;
            director?: string | null;
            code?: string | null;
            draft_id?: string | null;
            added_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            removed_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            studio?: {
              __typename: "Studio";
              id: string;
              name: string;
              deleted: boolean;
              is_favorite: boolean;
              child_studios: Array<{
                __typename: "Studio";
                id: string;
                name: string;
              }>;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                height: number;
                width: number;
              }>;
            } | null;
            added_performers?: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                aliases: Array<string>;
                gender?: GenderEnum | null;
                birth_date?: string | null;
                age?: number | null;
                height?: number | null;
                hair_color?: HairColorEnum | null;
                eye_color?: EyeColorEnum | null;
                ethnicity?: EthnicityEnum | null;
                country?: string | null;
                career_end_year?: number | null;
                career_start_year?: number | null;
                breast_type?: BreastTypeEnum | null;
                waist_size?: number | null;
                hip_size?: number | null;
                band_size?: number | null;
                cup_size?: string | null;
                is_favorite: boolean;
                tattoos?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                piercings?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                urls: Array<{
                  __typename: "URL";
                  url: string;
                  site: {
                    __typename: "Site";
                    id: string;
                    name: string;
                    icon: string;
                  };
                }>;
                images: Array<{
                  __typename: "Image";
                  id: string;
                  url: string;
                  width: number;
                  height: number;
                }>;
              };
            }> | null;
            removed_performers?: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                aliases: Array<string>;
                gender?: GenderEnum | null;
                birth_date?: string | null;
                age?: number | null;
                height?: number | null;
                hair_color?: HairColorEnum | null;
                eye_color?: EyeColorEnum | null;
                ethnicity?: EthnicityEnum | null;
                country?: string | null;
                career_end_year?: number | null;
                career_start_year?: number | null;
                breast_type?: BreastTypeEnum | null;
                waist_size?: number | null;
                hip_size?: number | null;
                band_size?: number | null;
                cup_size?: string | null;
                is_favorite: boolean;
                tattoos?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                piercings?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                urls: Array<{
                  __typename: "URL";
                  url: string;
                  site: {
                    __typename: "Site";
                    id: string;
                    name: string;
                    icon: string;
                  };
                }>;
                images: Array<{
                  __typename: "Image";
                  id: string;
                  url: string;
                  width: number;
                  height: number;
                }>;
              };
            }> | null;
            added_tags?: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              category?: {
                __typename: "TagCategory";
                id: string;
                name: string;
              } | null;
            }> | null;
            removed_tags?: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              category?: {
                __typename: "TagCategory";
                id: string;
                name: string;
              } | null;
            }> | null;
            added_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            removed_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            added_fingerprints?: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
            }> | null;
            removed_fingerprints?: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
            }> | null;
          }
        | {
            __typename: "StudioEdit";
            name?: string | null;
            added_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            removed_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            parent?: {
              __typename: "Studio";
              id: string;
              name: string;
              deleted: boolean;
              is_favorite: boolean;
              child_studios: Array<{
                __typename: "Studio";
                id: string;
                name: string;
              }>;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                height: number;
                width: number;
              }>;
            } | null;
            added_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            removed_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
          }
        | {
            __typename: "TagEdit";
            name?: string | null;
            description?: string | null;
            added_aliases?: Array<string> | null;
            removed_aliases?: Array<string> | null;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }
        | null;
      old_details?:
        | {
            __typename: "PerformerEdit";
            name?: string | null;
            disambiguation?: string | null;
            gender?: GenderEnum | null;
            birthdate?: string | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            eye_color?: EyeColorEnum | null;
            hair_color?: HairColorEnum | null;
            height?: number | null;
            cup_size?: string | null;
            band_size?: number | null;
            waist_size?: number | null;
            hip_size?: number | null;
            breast_type?: BreastTypeEnum | null;
            career_start_year?: number | null;
            career_end_year?: number | null;
          }
        | {
            __typename: "SceneEdit";
            title?: string | null;
            details?: string | null;
            date?: string | null;
            duration?: number | null;
            director?: string | null;
            code?: string | null;
            added_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            removed_urls?: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }> | null;
            studio?: {
              __typename: "Studio";
              id: string;
              name: string;
              deleted: boolean;
              is_favorite: boolean;
              child_studios: Array<{
                __typename: "Studio";
                id: string;
                name: string;
              }>;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                height: number;
                width: number;
              }>;
            } | null;
            added_performers?: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                aliases: Array<string>;
                gender?: GenderEnum | null;
                birth_date?: string | null;
                age?: number | null;
                height?: number | null;
                hair_color?: HairColorEnum | null;
                eye_color?: EyeColorEnum | null;
                ethnicity?: EthnicityEnum | null;
                country?: string | null;
                career_end_year?: number | null;
                career_start_year?: number | null;
                breast_type?: BreastTypeEnum | null;
                waist_size?: number | null;
                hip_size?: number | null;
                band_size?: number | null;
                cup_size?: string | null;
                is_favorite: boolean;
                tattoos?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                piercings?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                urls: Array<{
                  __typename: "URL";
                  url: string;
                  site: {
                    __typename: "Site";
                    id: string;
                    name: string;
                    icon: string;
                  };
                }>;
                images: Array<{
                  __typename: "Image";
                  id: string;
                  url: string;
                  width: number;
                  height: number;
                }>;
              };
            }> | null;
            removed_performers?: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                aliases: Array<string>;
                gender?: GenderEnum | null;
                birth_date?: string | null;
                age?: number | null;
                height?: number | null;
                hair_color?: HairColorEnum | null;
                eye_color?: EyeColorEnum | null;
                ethnicity?: EthnicityEnum | null;
                country?: string | null;
                career_end_year?: number | null;
                career_start_year?: number | null;
                breast_type?: BreastTypeEnum | null;
                waist_size?: number | null;
                hip_size?: number | null;
                band_size?: number | null;
                cup_size?: string | null;
                is_favorite: boolean;
                tattoos?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                piercings?: Array<{
                  __typename: "BodyModification";
                  location: string;
                  description?: string | null;
                }> | null;
                urls: Array<{
                  __typename: "URL";
                  url: string;
                  site: {
                    __typename: "Site";
                    id: string;
                    name: string;
                    icon: string;
                  };
                }>;
                images: Array<{
                  __typename: "Image";
                  id: string;
                  url: string;
                  width: number;
                  height: number;
                }>;
              };
            }> | null;
            added_tags?: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              category?: {
                __typename: "TagCategory";
                id: string;
                name: string;
              } | null;
            }> | null;
            removed_tags?: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              deleted: boolean;
              aliases: Array<string>;
              category?: {
                __typename: "TagCategory";
                id: string;
                name: string;
              } | null;
            }> | null;
            added_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            removed_images?: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            } | null> | null;
            added_fingerprints?: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
            }> | null;
            removed_fingerprints?: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
            }> | null;
          }
        | {
            __typename: "StudioEdit";
            name?: string | null;
            parent?: {
              __typename: "Studio";
              id: string;
              name: string;
              deleted: boolean;
              is_favorite: boolean;
              child_studios: Array<{
                __typename: "Studio";
                id: string;
                name: string;
              }>;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
              urls: Array<{
                __typename: "URL";
                url: string;
                site: {
                  __typename: "Site";
                  id: string;
                  name: string;
                  icon: string;
                };
              }>;
              images: Array<{
                __typename: "Image";
                id: string;
                url: string;
                height: number;
                width: number;
              }>;
            } | null;
          }
        | {
            __typename: "TagEdit";
            name?: string | null;
            description?: string | null;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }
        | null;
      merge_sources: Array<
        | {
            __typename: "Performer";
            id: string;
            name: string;
            disambiguation?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            gender?: GenderEnum | null;
            birth_date?: string | null;
            age?: number | null;
            height?: number | null;
            hair_color?: HairColorEnum | null;
            eye_color?: EyeColorEnum | null;
            ethnicity?: EthnicityEnum | null;
            country?: string | null;
            career_end_year?: number | null;
            career_start_year?: number | null;
            breast_type?: BreastTypeEnum | null;
            waist_size?: number | null;
            hip_size?: number | null;
            band_size?: number | null;
            cup_size?: string | null;
            is_favorite: boolean;
            tattoos?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            piercings?: Array<{
              __typename: "BodyModification";
              location: string;
              description?: string | null;
            }> | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
          }
        | {
            __typename: "Scene";
            id: string;
            release_date?: string | null;
            title?: string | null;
            deleted: boolean;
            details?: string | null;
            director?: string | null;
            code?: string | null;
            duration?: number | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              width: number;
              height: number;
            }>;
            studio?: {
              __typename: "Studio";
              id: string;
              name: string;
              parent?: {
                __typename: "Studio";
                id: string;
                name: string;
              } | null;
            } | null;
            performers: Array<{
              __typename: "PerformerAppearance";
              as?: string | null;
              performer: {
                __typename: "Performer";
                id: string;
                name: string;
                disambiguation?: string | null;
                deleted: boolean;
                gender?: GenderEnum | null;
                aliases: Array<string>;
              };
            }>;
            fingerprints: Array<{
              __typename: "Fingerprint";
              hash: string;
              algorithm: FingerprintAlgorithm;
              duration: number;
              submissions: number;
              user_submitted: boolean;
              created: string;
              updated: string;
            }>;
            tags: Array<{
              __typename: "Tag";
              id: string;
              name: string;
              description?: string | null;
              aliases: Array<string>;
            }>;
          }
        | {
            __typename: "Studio";
            id: string;
            name: string;
            deleted: boolean;
            is_favorite: boolean;
            child_studios: Array<{
              __typename: "Studio";
              id: string;
              name: string;
            }>;
            parent?: { __typename: "Studio"; id: string; name: string } | null;
            urls: Array<{
              __typename: "URL";
              url: string;
              site: {
                __typename: "Site";
                id: string;
                name: string;
                icon: string;
              };
            }>;
            images: Array<{
              __typename: "Image";
              id: string;
              url: string;
              height: number;
              width: number;
            }>;
          }
        | {
            __typename: "Tag";
            id: string;
            name: string;
            description?: string | null;
            deleted: boolean;
            aliases: Array<string>;
            category?: {
              __typename: "TagCategory";
              id: string;
              name: string;
            } | null;
          }
      >;
      options?: {
        __typename: "PerformerEditOptions";
        set_modify_aliases: boolean;
        set_merge_aliases: boolean;
      } | null;
    }>;
  };
};

export type SceneQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type SceneQuery = {
  __typename: "Query";
  findScene?: {
    __typename: "Scene";
    id: string;
    release_date?: string | null;
    title?: string | null;
    deleted: boolean;
    details?: string | null;
    director?: string | null;
    code?: string | null;
    duration?: number | null;
    urls: Array<{
      __typename: "URL";
      url: string;
      site: { __typename: "Site"; id: string; name: string; icon: string };
    }>;
    images: Array<{
      __typename: "Image";
      id: string;
      url: string;
      width: number;
      height: number;
    }>;
    studio?: {
      __typename: "Studio";
      id: string;
      name: string;
      parent?: { __typename: "Studio"; id: string; name: string } | null;
    } | null;
    performers: Array<{
      __typename: "PerformerAppearance";
      as?: string | null;
      performer: {
        __typename: "Performer";
        id: string;
        name: string;
        disambiguation?: string | null;
        deleted: boolean;
        gender?: GenderEnum | null;
        aliases: Array<string>;
      };
    }>;
    fingerprints: Array<{
      __typename: "Fingerprint";
      hash: string;
      algorithm: FingerprintAlgorithm;
      duration: number;
      submissions: number;
      user_submitted: boolean;
      created: string;
      updated: string;
    }>;
    tags: Array<{
      __typename: "Tag";
      id: string;
      name: string;
      description?: string | null;
      aliases: Array<string>;
    }>;
  } | null;
};

export type ScenesQueryVariables = Exact<{
  input: SceneQueryInput;
}>;

export type ScenesQuery = {
  __typename: "Query";
  queryScenes: {
    __typename: "QueryScenesResultType";
    count: number;
    scenes: Array<{
      __typename: "Scene";
      id: string;
      release_date?: string | null;
      title?: string | null;
      duration?: number | null;
      urls: Array<{
        __typename: "URL";
        url: string;
        site: { __typename: "Site"; id: string; name: string; icon: string };
      }>;
      images: Array<{
        __typename: "Image";
        id: string;
        url: string;
        width: number;
        height: number;
      }>;
      studio?: { __typename: "Studio"; id: string; name: string } | null;
      performers: Array<{
        __typename: "PerformerAppearance";
        as?: string | null;
        performer: {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          gender?: GenderEnum | null;
          aliases: Array<string>;
        };
      }>;
    }>;
  };
};

export type ScenesWithoutCountQueryVariables = Exact<{
  input: SceneQueryInput;
}>;

export type ScenesWithoutCountQuery = {
  __typename: "Query";
  queryScenes: {
    __typename: "QueryScenesResultType";
    scenes: Array<{
      __typename: "Scene";
      id: string;
      release_date?: string | null;
      title?: string | null;
      duration?: number | null;
      urls: Array<{
        __typename: "URL";
        url: string;
        site: { __typename: "Site"; id: string; name: string; icon: string };
      }>;
      images: Array<{
        __typename: "Image";
        id: string;
        url: string;
        width: number;
        height: number;
      }>;
      studio?: { __typename: "Studio"; id: string; name: string } | null;
      performers: Array<{
        __typename: "PerformerAppearance";
        as?: string | null;
        performer: {
          __typename: "Performer";
          id: string;
          name: string;
          disambiguation?: string | null;
          deleted: boolean;
          gender?: GenderEnum | null;
          aliases: Array<string>;
        };
      }>;
    }>;
  };
};

export type SearchAllQueryVariables = Exact<{
  term: Scalars["String"];
  limit?: InputMaybe<Scalars["Int"]>;
}>;

export type SearchAllQuery = {
  __typename: "Query";
  searchPerformer: Array<{
    __typename: "Performer";
    id: string;
    name: string;
    disambiguation?: string | null;
    deleted: boolean;
    gender?: GenderEnum | null;
    aliases: Array<string>;
    country?: string | null;
    career_start_year?: number | null;
    career_end_year?: number | null;
    scene_count: number;
    birth_date?: string | null;
    is_favorite: boolean;
    urls: Array<{
      __typename: "URL";
      url: string;
      site: { __typename: "Site"; id: string; name: string; icon: string };
    }>;
    images: Array<{
      __typename: "Image";
      id: string;
      url: string;
      width: number;
      height: number;
    }>;
  }>;
  searchScene: Array<{
    __typename: "Scene";
    id: string;
    release_date?: string | null;
    title?: string | null;
    deleted: boolean;
    duration?: number | null;
    code?: string | null;
    urls: Array<{
      __typename: "URL";
      url: string;
      site: { __typename: "Site"; id: string; name: string; icon: string };
    }>;
    images: Array<{
      __typename: "Image";
      id: string;
      url: string;
      width: number;
      height: number;
    }>;
    studio?: { __typename: "Studio"; id: string; name: string } | null;
    performers: Array<{
      __typename: "PerformerAppearance";
      as?: string | null;
      performer: {
        __typename: "Performer";
        id: string;
        name: string;
        disambiguation?: string | null;
        gender?: GenderEnum | null;
        aliases: Array<string>;
        deleted: boolean;
      };
    }>;
  }>;
};

export type SearchPerformersQueryVariables = Exact<{
  term: Scalars["String"];
  limit?: InputMaybe<Scalars["Int"]>;
}>;

export type SearchPerformersQuery = {
  __typename: "Query";
  searchPerformer: Array<{
    __typename: "Performer";
    id: string;
    name: string;
    disambiguation?: string | null;
    deleted: boolean;
    gender?: GenderEnum | null;
    aliases: Array<string>;
    country?: string | null;
    career_start_year?: number | null;
    career_end_year?: number | null;
    scene_count: number;
    birth_date?: string | null;
    is_favorite: boolean;
    urls: Array<{
      __typename: "URL";
      url: string;
      site: { __typename: "Site"; id: string; name: string; icon: string };
    }>;
    images: Array<{
      __typename: "Image";
      id: string;
      url: string;
      width: number;
      height: number;
    }>;
  }>;
};

export type SearchTagsQueryVariables = Exact<{
  term: Scalars["String"];
  limit?: InputMaybe<Scalars["Int"]>;
}>;

export type SearchTagsQuery = {
  __typename: "Query";
  searchTag: Array<{
    __typename: "Tag";
    deleted: boolean;
    id: string;
    name: string;
    description?: string | null;
    aliases: Array<string>;
  }>;
};

export type SiteQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type SiteQuery = {
  __typename: "Query";
  findSite?: {
    __typename: "Site";
    id: string;
    name: string;
    description?: string | null;
    url?: string | null;
    regex?: string | null;
    valid_types: Array<ValidSiteTypeEnum>;
    icon: string;
    created: string;
    updated: string;
  } | null;
};

export type SitesQueryVariables = Exact<{ [key: string]: never }>;

export type SitesQuery = {
  __typename: "Query";
  querySites: {
    __typename: "QuerySitesResultType";
    sites: Array<{
      __typename: "Site";
      id: string;
      name: string;
      description?: string | null;
      url?: string | null;
      regex?: string | null;
      valid_types: Array<ValidSiteTypeEnum>;
      icon: string;
      created: string;
      updated: string;
    }>;
  };
};

export type StudioQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type StudioQuery = {
  __typename: "Query";
  findStudio?: {
    __typename: "Studio";
    id: string;
    name: string;
    deleted: boolean;
    is_favorite: boolean;
    child_studios: Array<{ __typename: "Studio"; id: string; name: string }>;
    parent?: { __typename: "Studio"; id: string; name: string } | null;
    urls: Array<{
      __typename: "URL";
      url: string;
      site: { __typename: "Site"; id: string; name: string; icon: string };
    }>;
    images: Array<{
      __typename: "Image";
      id: string;
      url: string;
      height: number;
      width: number;
    }>;
  } | null;
};

export type StudiosQueryVariables = Exact<{
  input: StudioQueryInput;
}>;

export type StudiosQuery = {
  __typename: "Query";
  queryStudios: {
    __typename: "QueryStudiosResultType";
    count: number;
    studios: Array<{
      __typename: "Studio";
      id: string;
      name: string;
      deleted: boolean;
      is_favorite: boolean;
      parent?: { __typename: "Studio"; id: string; name: string } | null;
      urls: Array<{
        __typename: "URL";
        url: string;
        site: { __typename: "Site"; id: string; name: string; icon: string };
      }>;
      images: Array<{
        __typename: "Image";
        id: string;
        url: string;
        width: number;
        height: number;
      }>;
    }>;
  };
};

export type TagQueryVariables = Exact<{
  name?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
}>;

export type TagQuery = {
  __typename: "Query";
  findTag?: {
    __typename: "Tag";
    id: string;
    name: string;
    description?: string | null;
    aliases: Array<string>;
    deleted: boolean;
    category?: {
      __typename: "TagCategory";
      id: string;
      name: string;
      group: TagGroupEnum;
      description?: string | null;
    } | null;
  } | null;
};

export type TagsQueryVariables = Exact<{
  input: TagQueryInput;
}>;

export type TagsQuery = {
  __typename: "Query";
  queryTags: {
    __typename: "QueryTagsResultType";
    count: number;
    tags: Array<{
      __typename: "Tag";
      id: string;
      name: string;
      description?: string | null;
      aliases: Array<string>;
    }>;
  };
};

export type UserQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type UserQuery = {
  __typename: "Query";
  findUser?: {
    __typename: "User";
    id: string;
    name: string;
    email?: string | null;
    roles?: Array<RoleEnum> | null;
    api_key?: string | null;
    api_calls: number;
    invite_tokens?: number | null;
    active_invite_codes?: Array<string> | null;
    invited_by?: { __typename: "User"; id: string; name: string } | null;
    vote_count: {
      __typename: "UserVoteCount";
      accept: number;
      reject: number;
      immediate_accept: number;
      immediate_reject: number;
      abstain: number;
    };
    edit_count: {
      __typename: "UserEditCount";
      immediate_accepted: number;
      immediate_rejected: number;
      accepted: number;
      rejected: number;
      failed: number;
      canceled: number;
      pending: number;
    };
  } | null;
};

export type UsersQueryVariables = Exact<{
  input: UserQueryInput;
}>;

export type UsersQuery = {
  __typename: "Query";
  queryUsers: {
    __typename: "QueryUsersResultType";
    count: number;
    users: Array<{
      __typename: "User";
      id: string;
      name: string;
      email?: string | null;
      roles?: Array<RoleEnum> | null;
      api_key?: string | null;
      api_calls: number;
      invite_tokens?: number | null;
      invited_by?: { __typename: "User"; id: string; name: string } | null;
    }>;
  };
};

export type VersionQueryVariables = Exact<{ [key: string]: never }>;

export type VersionQuery = {
  __typename: "Query";
  version: {
    __typename: "Version";
    hash: string;
    version: string;
    build_time: string;
    build_type: string;
  };
};
