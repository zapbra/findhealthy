import styled from "styled-components";
import { useState, useEffect } from "react";
import COLORS from "../data/colors";
const Cont = styled.div``;

const fields = {
  "VITAMIN A": "vitamin_a",
  "VITAMIN C": "vitamin_c",
  "VITAMIN D": "vitamin_d",
  "VITAMIN E (Alpha Tocopherol)": "vitamin_e",
  "VITAMIN K": "vitamin_k",
  Thiamin: "thiamin",
  Riboflavin: "riboflavin",
  Niacin: "niacin",
  "Vitamin B6": "vitamin_b6",
  Folate: "folate",
  "Vitamin B12": "vitamin_b12",
  "Pantothenic Acid": "pantothenic_acid",
  Choline: "choline",
  Calcium: "calcium",
  Iron: "iron",
  Magnesium: "magnesium",
  Phosphorus: "phosphorus",
  Potassium: "potassium",
  Sodium: "sodium",
  Zinc: "zinc",
  Copper: "copper",
  Manganese: "manganese",
  Selenium: "selenium",
  Cholesterol: "cholesterol",
  "Total Omega-3 fatty acids": "omega3",
  "Total Omega-6 fatty acids": "omega6",
};
const testing = () => {
  const obj =
    "Vitamin A143IU3% Vitamin C0.0mg0% Vitamin D~ ~ Vitamin E (Alpha Tocopherol)~ ~ Vitamin K~ ~ Thiamin0.2mg11% Riboflavin0.0mg3% Niacin3.3mg17% Vitamin B60.5mg24% Folate14.3mcg4% Vitamin B126.1mcg101% Pantothenic Acid1.2mg12%";
  console.log(obj);
  const str = "Vitamin A143IU3%";

  const x = str.replace("Vitamin A", "");
  //console.log(x)
  const DV = x.replace(/\d+(IU|mg)/, "");
  let IU = x.match(/\d+(IU|mg)/);
  IU = IU[0].match(/\d+/)[0];
  console.log(IU);
  console.log(DV);
  return <Cont colors={COLORS}></Cont>;
};

export default testing;
