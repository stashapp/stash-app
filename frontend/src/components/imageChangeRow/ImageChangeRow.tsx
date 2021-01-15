import React from "react";
import { Row } from "react-bootstrap";

import { ImageFragment as Image } from "src/definitions/ImageFragment";

const CLASSNAME = "ImageChangeRow";
const CLASSNAME_IMAGE = `${CLASSNAME}-image`;

export interface ImageChangeRowProps {
  newImages?: (Image | null)[] | null;
  oldImages?: (Image | null)[] | null;
}

const Images: React.FC<{ images: (Image | null)[] | null | undefined }> = ({
  images,
}) => (
  <>
    {(images ?? []).map((image) =>
      image === null ? (
        <img className={CLASSNAME_IMAGE} alt="Deleted" />
      ) : (
        <img src={image.url} className={CLASSNAME_IMAGE} alt="" />
      )
    )}
  </>
);

const ImageChangeRow: React.FC<ImageChangeRowProps> = ({
  newImages,
  oldImages,
}) =>
  (newImages ?? []).length > 0 || (oldImages ?? []).length > 0 ? (
    <Row className={CLASSNAME}>
      <b className="col-2 text-right">Images</b>
      <div className="col-5">
        {(oldImages ?? []).length > 0 && (
          <>
            <h6>Removed</h6>
            <div className={CLASSNAME}>
              <Images images={oldImages} />
            </div>
          </>
        )}
      </div>
      <span className="col-5">
        {(newImages ?? []).length > 0 && (
          <>
            <h6>Added</h6>
            <div className={CLASSNAME}>
              <Images images={newImages} />
            </div>
          </>
        )}
      </span>
    </Row>
  ) : (
    <></>
  );

export default ImageChangeRow;
