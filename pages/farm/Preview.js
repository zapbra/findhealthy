import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ImageSection from "./ImageSection";
import Sections from "./Sections";
const Cont = styled.div``;

const Preview = () => {
  const [images, setImages] = useState([
    "/images/steak.jpg",
    "/images/eggs.jpg",
    "/images/milk.jpg",
    "/images/farm.jpg",
  ]);

  const products = [
    {
      name: "chicken",
      price: "6.75",
      dollarType: "CAD",
      measurement: "lb",
    },
    {
      name: "ribeye",
      price: "20",
      dollarType: "CAD",
      measurement: "lb",
    },
    {
      name: "eggs",
      price: "7.50",
      dollarType: "CAD",
      measurement: "doz",
    },
    {
      name: "liver",
      price: "7",
      dollarType: "CAD",
      measurement: "lb",
    },
    {
      name: "pancreas",
      price: "10",
      dollarType: "CAD",
      measurement: "lb",
    },
    {
      name: "dry aged sausages",
      price: "15",
      dollarType: "CAD",
      measurement: "package",
    },
    {
      name: "kombucha",
      price: "8",
      dollarType: "CAD",
      measurement: "litre",
    },
  ];
  return (
    <Cont colors={COLORS}>
      <ImageSection images={images} />
      <Sections products={products} />
    </Cont>
  );
};

export default Preview;
