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

  const description =
    "They sell grass fed beef, pasture raised chicken (fresh) and they also sell fresh organs every few months or so. They do deliveries to the Parkdale market every Saturday between 11:00 AM and 1:30 PM";
  return (
    <Cont colors={COLORS}>
      <ImageSection images={images} />
      <Sections
        products={products}
        description={description}
        address="300 Fake St, Ottawa, Ontario"
        website="http://www.ferme-reveuse.ca/"
        email="fermereveuse@gmail.com"
        phone="613-690-1234"
        delivery="Pickup & Delivery"
        hoursFrom="6:00 AM"
        hoursTo="5:OO PM"
        grassFed="unspecified"
        organic="true"
        vaccineFree="unspecified"
        soyFree="false"
        pastureRaised="true"
        dewormerFree="true"
        unfrozen="true"
      />
    </Cont>
  );
};

export default Preview;
