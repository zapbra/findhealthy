import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
position: fixed;
height: 100vh;

  .image-holder-2 {
    

    img{
      height:100vh !important; 
    }
  }
  .close-btn-spec {
    top: 16px;
    cursor: pointer;
    width: 40px;
    background: #fff;
    height: 40px;
    border: 2px solid ${(props) => props.colors.black};
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    right: calc(-100% + 70px);
    z-index: 1;
    &:hover {
      background: black;
      .black {
        color: #fff;
      }
    }
  }
  
`;

const PhotoDisplay = ({ selectedImage, hidePhoto }) => {
  return (
    <Cont className="background-shadow opacity-anim" colors={COLORS}>
      <div onClick={hidePhoto} className="close-btn-spec box-shadow-2">
        <FontAwesomeIcon icon={faClose} className="icon-lg black" />
      </div>
      <div className=" image-holder-2 flex justify-center align-center">
        <Image
          src={selectedImage}
          fill={true}
          alt="Farm Preview"
          style={{ objectFit: "contain" }}
          quality="100"
          priority={true}
        />
      </div>
    </Cont>
  );
};

export default PhotoDisplay;
