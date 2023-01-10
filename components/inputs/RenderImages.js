import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import COLORS from "../../data/colors";

const Cont = styled.div`
  img {
    width: 100px;
    height: 100px;
  }
  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .image {
    border: 1px solid ${(props) => props.colors.darkPink};
    margin-right: 8px;
  }

  .opacity-anima {
    animation-name: opacity;
    animation-duration: 1s;
  }
`;
const RenderImages = ({ images }) => {
  const imageElems = images.map((image, index) => {
    return (
      <Image
        key={index}
        src={URL.createObjectURL(image)}
        width="100"
        height="100"
        style={{ objectFit: "cover" }}
        className="opacity-anim image"
        alt={image.name}
      />
    );
  });
  return <Cont colors={COLORS}>{imageElems}</Cont>;
};

export default RenderImages;
