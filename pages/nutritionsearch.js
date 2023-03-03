import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import Searchbar from "../components/nutritionsearch/Searchbar";
const Cont = styled.div`
  margin-top: 40px;
`;

const Nutritionsearch = () => {
  return (
    <Cont colors={COLORS}>
      <Searchbar />
    </Cont>
  );
};

export default Nutritionsearch;
