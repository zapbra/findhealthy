import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  .parallax-one {
    background-image: url("/images/salmon.jpg");
  }
`;
const ImageSection = ({ name }) => {
  return (
    <Cont colors={COLORS}>
      <div className="parallax-one"></div>
    </Cont>
  );
};

export default ImageSection;
