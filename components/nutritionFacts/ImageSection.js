import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
`;
const ImageSection = ({ name }) => {
  return (
    <Cont colors={COLORS}>
      <Image
        src="/images/salmon.jpg"
        fill
        alt={name}
        style={{ objectFit: "cover" }}
      />
    </Cont>
  );
};

export default ImageSection;
