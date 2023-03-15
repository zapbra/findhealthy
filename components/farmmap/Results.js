import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div``;
const Results = ({ locElem }) => {
  console.log(locElem);
  return (
    <Cont colors={COLORS} className="tan-container">
      {locElem}
    </Cont>
  );
};

export default Results;
