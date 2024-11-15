import { FC } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

import { Scene, Studio } from "src/graphql";
import {
  getImage,
  sceneHref,
  studioHref,
  formatDuration,
  imageType,
} from "src/utils";
import { Icon } from "src/components/fragments";

type Performance = Pick<
  Scene,
  "id" | "title" | "images" | "duration" | "code" | "release_date"
> & {
  studio?: Pick<Studio, "id" | "name"> | null;
};

const CLASSNAME = "SceneCard";
const CLASSNAME_IMAGE = `${CLASSNAME}-image`;
const CLASSNAME_BODY = `${CLASSNAME}-body`;

const SceneCard: FC<{ scene: Performance }> = ({ scene }) => (
  <Card className={CLASSNAME}>
    <Card.Body className={CLASSNAME_BODY}>
      <Link className={CLASSNAME_IMAGE} to={sceneHref(scene)}>
        <img
          alt=""
          className={imageType(scene.images[0])}
          src={getImage(scene.images, "landscape")}
        />
      </Link>
    </Card.Body>
    <Card.Footer>
      <div className="d-flex">
        <Link className="text-truncate w-100" to={sceneHref(scene)}>
          <h6 className="text-truncate">{scene.title}</h6>
        </Link>
      </div>
      <div className="text-muted">
        <Link className="text-truncate w-100" to={sceneHref(scene)}>
          <strong>{scene.code}</strong>
        </Link>
        <span className="text-muted float-end">
          {scene.duration ? formatDuration(scene.duration) : ""}
        </span>
      </div>
      <div className="text-muted">
        {scene.studio && (
          <Link
            to={studioHref(scene.studio)}
            className="float-end text-truncate SceneCard-studio-name"
          >
            <Icon icon={faVideo} className="me-1" />
            {scene.studio.name}
          </Link>
        )}
        <strong>{scene.release_date}</strong>
      </div>
    </Card.Footer>
  </Card>
);

export default SceneCard;
