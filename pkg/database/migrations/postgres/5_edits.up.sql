CREATE TABLE "edits" (
  "id" uuid not null primary key,
  "user_id" uuid,
  "operation" varchar(10) not null,
  "target_type" varchar(10) not null,
  "data" jsonb,
  "votes" integer not null default 0,
  "status" varchar(20) not null,
  "applied" boolean default FALSE not null,
  "created_at" timestamp not null,
  "updated_at" timestamp not null,
  foreign key("user_id") references "users"("id") on delete set null
);
CREATE INDEX edit_merge_sources_idx ON edits USING gin ((data->'merge_sources') jsonb_path_ops);

CREATE TABLE "edit_comments" (
  "id" UUID not null primary key,
  "edit_id" UUID not null,
  "user_id" UUID,
  "created_at" TIMESTAMP not null,
  "text" TEXT not null,
  FOREIGN KEY("edit_id") REFERENCES "edits"("id") ON DELETE CASCADE,
  FOREIGN KEY("user_id") REFERENCES "users"("id") ON DELETE SET NULL 
);

CREATE TABLE "performer_edits" (
  "edit_id" uuid not null,
  "performer_id" uuid not null,
  foreign key("edit_id") references "edits"("id"),
  foreign key("performer_id") references "performers"("id")
);

CREATE TABLE "studio_edits" (
  "edit_id" uuid not null,
  "studio_id" uuid not null,
  foreign key("edit_id") references "edits"("id"),
  foreign key("studio_id") references "studios"("id")
);

CREATE TABLE "tag_edits" (
  "edit_id" uuid not null,
  "tag_id" uuid not null,
  foreign key("edit_id") references "edits"("id"),
  foreign key("tag_id") references "tags"("id")
);

CREATE TABLE "scene_edits" (
  "edit_id" uuid not null,
  "scene_id" uuid not null,
  foreign key("edit_id") references "edits"("id"),
  foreign key("scene_id") references "scenes"("id")
);
