import styled from "styled-components";
import { useEffect } from "react";
import countryCodes from "../data/countryCodes";
const Cont = styled.div``;

const Testing = () => {
  const newCodes = [];
  useEffect(() => {
    Object.entries(countryCodes).map((value, key) => {
      //console.log(value[0]);
      newCodes.push(value[0]);
    });
    console.log(newCodes);
  }, []);
  return <Cont></Cont>;
};

export default Testing;
