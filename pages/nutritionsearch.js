import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import Searchbar from "../components/nutritionsearch/Searchbar";
import Results from "../components/nutritionsearch/Results";
const Cont = styled.div`
  margin-top: 40px;
`;

const Nutritionsearch = () => {
  return (
    <Cont colors={COLORS}>
      <Searchbar />
      <div className="ssm-spacer-bot-res"></div>
      <Results />
    </Cont>
  );
};

export default Nutritionsearch;
