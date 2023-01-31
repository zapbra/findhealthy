import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import PhotoDisplay from "../../components/popups/PhotoDisplay";
const Cont = styled.div`
  .hero-image-section {
    display: grid;
    border-bottom: 1px solid ${(props) => props.colors.darkPink};
    grid-template-columns: 3fr 1fr;
    img {
      width: 100%;
      display: block;
    }
  }
  .image-holder {
    position: relative;
    max-height: 600px;
    border-right: 1px solid ${(props) => props.colors.darkPink};
    cursor: pointer;
    &:hover {
      border: 2px solid ${(props) => props.colors.darkPink};
    }
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  .image-selectors {
    display: grid;
    max-height: 600px;
  }
  .image-select {
    position: relative;
    overflow: hidden;
    opacity: 0.6;
    cursor: pointer;
    transition: opacity 0.25s ease;
    &:hover {
      opacity: 1;
    }
    img {
      object-fit: cover;
      height: 100%;
    }
  }
  .selected-image {
    opacity: 1;
    cursor: default;
    border: 2px solid ${(props) => props.colors.darkPink};
  }
`;

const ImageSection = ({ images }) => {
  const [previewUrl, setPreviewUrl] = useState(images[0]);

  const selectImage = (url) => {
    if (previewUrl === url) return;
    setPreviewUrl(url);
  };
  const imageElements = images.map((image) => {
    return (
      <div
        onClick={() => selectImage(image)}
        className={
          image === previewUrl ? "selected-image image-select" : "image-select"
        }
      >
        <img src={image} />
      </div>
    );
  });

  const [showPhotoDisplay, setShowPhotoDisplay] = useState(false);

  const setPhotoDisplayVisible = () => {
    setShowPhotoDisplay(true);
  };

  const hidePhoto = () => {
    setShowPhotoDisplay(false);
  };

  return (
    <Cont colors={COLORS}>
      {showPhotoDisplay && (
        <PhotoDisplay selectedImage={previewUrl} hidePhoto={hidePhoto} />
      )}
      <div className="hero-image-section">
        <div onClick={setPhotoDisplayVisible} className="image-holder">
          <img src={previewUrl} />
        </div>

        <div className="image-selectors">{imageElements}</div>
      </div>
    </Cont>
  );
};

export default ImageSection;
