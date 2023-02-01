import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ImageSection from "../../components/farmview/ImageSection";
import Sections from "../../components/farmview/Sections";
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
        pricing={3}
        quality={4}
        friendly={3}
        howToOrder="Meet them at the Parkdale Farmers Market between 11:00 AM - 1:30 PM every Saturday.
        Sign up for their newsletter to be notified of product changes or when they will be doing a fresh organs delivery. Also, they only have fresh chicken in the summer, so watch the newsletter to see their delivery or pickup dates."
      />
    </Cont>
  );
};

export default Preview;
