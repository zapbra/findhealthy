import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div``;
const Results = ({ locationElems }) => {
  console.log(locationElems);
  return (
    <Cont colors={COLORS} className="tan-container">
      {locationElems}
    </Cont>
  );
};

export default Results;
