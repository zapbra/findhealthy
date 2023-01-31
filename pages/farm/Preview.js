import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ImageSection from "./ImageSection";
const Cont = styled.div``;

const Preview = () => {
  const [images, setImages] = useState([
    "/images/steak.jpg",
    "/images/eggs.jpg",
    "/images/milk.jpg",
    "/images/farm.jpg",
  ]);
  return (
    <Cont colors={COLORS}>
      <ImageSection images = {images} />
    </Cont>
  );
};

export default Preview;
