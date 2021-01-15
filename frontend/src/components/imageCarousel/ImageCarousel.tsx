import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { Icon } from "src/components/fragments";
import { Image, sortImageURLs } from "src/utils";

interface ImageCarouselProps {
  images: Image[];
  orientation?: "portrait" | "landscape";
  onDeleteImage?: (toDelete: Image) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  orientation,
  onDeleteImage,
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const sortedImages = orientation
    ? sortImageURLs(images, orientation)
    : images;

  if (sortedImages.length === 0) return <div />;

  const setNext = () =>
    setActiveImage(
      activeImage === sortedImages.length - 1 ? 0 : activeImage + 1
    );
  const setPrev = () =>
    setActiveImage(
      activeImage === 0 ? sortedImages.length - 1 : activeImage - 1
    );

  const handleDelete = () => {
    const deletedImage = sortedImages[activeImage];
    if (onDeleteImage && deletedImage) {
      onDeleteImage(deletedImage);
      setActiveImage(activeImage === 0 ? 0 : activeImage - 1);
    }
  };

  return (
    <div className="image-carousel">
      <div className="image-container">
        <img
          src={sortedImages[activeImage].url}
          alt=""
          className="image-carousel-img"
        />
        {onDeleteImage ? (
          <div className="delete-image-overlay">
            <Button variant="danger" size="sm" onClick={handleDelete}>
              <Icon icon="times" />
            </Button>
          </div>
        ) : undefined}
      </div>

      <div className="d-flex align-items-center">
        <Button
          className="mr-auto"
          onClick={setPrev}
          disabled={sortedImages.length === 1}
        >
          <Icon icon="arrow-left" />
        </Button>
        <h5>
          Image {activeImage + 1} of {sortedImages.length}
        </h5>
        <Button
          className="ml-auto"
          onClick={setNext}
          disabled={sortedImages.length === 1}
        >
          <Icon icon="arrow-right" />
        </Button>
      </div>
    </div>
  );
};

export default ImageCarousel;
