import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ImageSection from "./ImageSection";
const Cont = styled.div``;

const Preview = () => {
  const [previewUrl, setPreviewUrl] = useState("/images/steak.jpg");
  return (
    <Cont colors={COLORS}>
      <ImageSection />
    </Cont>
  );
};

export default Preview;
