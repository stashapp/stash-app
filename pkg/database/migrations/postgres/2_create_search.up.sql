DO $$
BEGIN
  IF current_setting('is_superuser') = 'on' THEN
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
  END IF;
END$$;

CREATE TABLE scene_search AS 
SELECT
	S.id as scene_id,
	REGEXP_REPLACE(S.title, '[^a-zA-Z0-9 ]+', '', 'g') AS scene_title,
	S.date::TEXT AS scene_date,
	T.name || ' ' || REGEXP_REPLACE(T.name, '[^a-zA-Z0-9]', '', 'g') || ' ' || CASE WHEN TP.name IS NOT NULL THEN (TP.name || ' ' || REGEXP_REPLACE(TP.name, '[^a-zA-Z0-9]', '', 'g') ) ELSE '' END AS studio_name,
	STRING_AGG(P.name, ' ') || COALESCE(STRING_AGG(PS.as , ''), '') AS performer_names
FROM scenes S
LEFT JOIN scene_performers PS ON PS.scene_id = S.id
LEFT JOIN performers P ON PS.performer_id = P.id
LEFT JOIN studios T ON T.id = S.studio_id
LEFT JOIN studios TP ON T.parent_studio_id = TP.id
GROUP BY S.id, S.title, T.name, TP.name;

CREATE INDEX name_trgm_idx ON performers USING GIN (name gin_trgm_ops);
CREATE INDEX ts_idx ON scene_search USING gist (
	(
        to_tsvector('simple', COALESCE(scene_date, '')) ||
        to_tsvector('english', studio_name) ||
        to_tsvector('english', COALESCE(performer_names, '')) ||
        to_tsvector('english', scene_title)
	)
);

CREATE OR REPLACE FUNCTION update_performers() RETURNS TRIGGER AS $$
BEGIN
IF (NEW.name != OLD.name) THEN
UPDATE scene_search SET performer_names = SUBQUERY.performer_names
FROM (
SELECT S.id as scene_id, STRING_AGG(P.name, ' ') || COALESCE(STRING_AGG(PS.as , ''), '') AS performer_names
FROM scenes S
 LEFT JOIN scene_performers PS ON PS.scene_id = S.id
 LEFT JOIN performers P ON PS.performer_id = P.id
 WHERE P.id = NEW.id
 GROUP BY S.id
) SUBQUERY
WHERE scene_search.scene_id = SUBQUERY.scene_id;
END IF;
RETURN NULL;
END;
$$ LANGUAGE plpgsql; --The trigger used to update a table.

DROP TRIGGER IF EXISTS update_performer_search_name ON performers;
CREATE TRIGGER update_performer_search_name AFTER UPDATE ON performers FOR EACH ROW EXECUTE PROCEDURE update_performers();

CREATE OR REPLACE FUNCTION update_scene() RETURNS TRIGGER AS $$
BEGIN
IF (NEW.title != OLD.title OR New.date != OLD.date) THEN
UPDATE scene_search
SET scene_title = REGEXP_REPLACE(NEW.title, '[^a-zA-Z0-9 ]+', '', 'g'), scene_date = NEW.date
WHERE scene_id = NEW.id;
END IF;
RETURN NULL;
END;
$$ LANGUAGE plpgsql; --The trigger used to update a table.

DROP TRIGGER IF EXISTS update_scene_search_title ON scenes;
CREATE TRIGGER update_scene_search_title AFTER UPDATE ON scenes FOR EACH ROW EXECUTE PROCEDURE update_scene();

CREATE OR REPLACE FUNCTION insert_scene() RETURNS TRIGGER AS $$
BEGIN
INSERT INTO scene_search (scene_id, scene_title, scene_date, studio_name)
SELECT
	NEW.id,
	REGEXP_REPLACE(NEW.title, '[^a-zA-Z0-9 ]+', '', 'g'),
	NEW.date,
	T.name || ' ' || REGEXP_REPLACE(T.name, '[^a-zA-Z0-9]', '', 'g') || ' ' || CASE WHEN TP.name IS NOT NULL THEN (TP.name || ' ' || REGEXP_REPLACE(TP.name, '[^a-zA-Z0-9]', '', 'g') ) ELSE '' END
FROM studios T
LEFT JOIN studios TP ON T.parent_studio_id = TP.id
WHERE T.id = NEW.studio_id;
RETURN NULL;
END;
$$ LANGUAGE plpgsql; --The trigger used to update a table.

DROP TRIGGER IF EXISTS insert_scene_search ON scenes;
CREATE TRIGGER insert_scene_search AFTER INSERT ON scenes FOR EACH ROW EXECUTE PROCEDURE insert_scene();

CREATE OR REPLACE FUNCTION update_studio() RETURNS TRIGGER AS $$
BEGIN
IF (NEW.name != OLD.name) THEN
UPDATE scene_search SET studio_name = SUBQUERY.name
FROM (
	SELECT
		S.id,
		T.name || ' ' || REGEXP_REPLACE(T.name, '[^a-zA-Z0-9]', '', 'g') || ' ' || CASE WHEN TP.name IS NOT NULL THEN (TP.name || ' ' || REGEXP_REPLACE(TP.name, '[^a-zA-Z0-9]', '', 'g') ) ELSE '' END AS name
	FROM scenes S
	LEFT JOIN studios T ON T.id = S.studio_id 
	LEFT JOIN studios TP ON T.parent_studio_id = TP.id
	WHERE T.id = NEW.id
    OR TP.id = NEW.id
) SUBQUERY
WHERE scene_id = SUBQUERY.id;
END IF;
RETURN NULL;
END;
$$ LANGUAGE plpgsql; --The trigger used to update a table.

DROP TRIGGER IF EXISTS update_studio_search_name ON studios;
CREATE TRIGGER update_studio_search_name AFTER UPDATE ON studios FOR EACH ROW EXECUTE PROCEDURE update_studio();

CREATE OR REPLACE FUNCTION update_scene_performers() RETURNS TRIGGER AS $$
BEGIN
UPDATE scene_search SET performer_names = SUBQUERY.performer_names
FROM (
SELECT S.id as scene_id, STRING_AGG(P.name, ' ') || COALESCE(STRING_AGG(PS.as , ''), '') AS performer_names
FROM scenes S
 LEFT JOIN scene_performers PS ON PS.scene_id = S.id
 LEFT JOIN performers P ON PS.performer_id = P.id
 WHERE S.id = OLD.scene_id
 GROUP BY S.id
) SUBQUERY
WHERE scene_search.scene_id = SUBQUERY.scene_id;
RETURN NULL;
END;
$$ LANGUAGE plpgsql; --The trigger used to update a table.

DROP TRIGGER IF EXISTS update_scene_performers_search ON scene_performers;
CREATE TRIGGER update_scene_performers_search AFTER INSERT OR UPDATE OR DELETE ON scene_performers FOR EACH ROW EXECUTE PROCEDURE update_scene_performers();
