import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
  }

  .opacity-anima {
    animation-name: opacity;
    animation-duration: 1s;
  }
  .img-cont {
    margin-right: 8px;
    margin-bottom: 8px;
    height: 100px;
    position: relative;
    overflow: hidden;
  }
  .img-popup {
    background: #fff;
    position: absolute;
    transition: transform .25s ease;
    transform:translateY(0px);
    width: 100%;
    padding: 4px;
    cursor: pointer;
    border: 1px solid ${(props) => props.colors.black};
    &:hover{
      background-color: ${(props) => props.colors.lightBeige};
    }
    }
  }
`;
const RenderImages = ({ images }) => {
  const imageElems = images.map((image, index) => {
    return <ImageComponent image={image} />;
  });
  return <Cont colors={COLORS}>{imageElems}</Cont>;
};

export default RenderImages;

const ImageComponent = ({ image }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      onMouseOut={() => setVisible(false)}
      onMouseOver={() => setVisible(true)}
      className="img-cont box-shadow-2"
    >
      <Image
        src={URL.createObjectURL(image)}
        width="100"
        height="100"
        style={{ objectFit: "cover" }}
        className="opacity-anim image cursor"
        alt={image.name}
      />
      <div
        style={{
          transform: visible ? "translateY(-100%)" : "translateY(0px)",
        }}
        className=" img-popup flex space-between align-center"
      >
        <p className="bold blue mar-right-8">Expand</p>
        <FontAwesomeIcon icon={faExpand} className="icon-ssm blue" />
      </div>
    </div>
  );
};
