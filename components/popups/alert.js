import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  position: absolute;
  top: 25%;
  right: 16px;
  z-index: 5;
  max-width: 200px;
`;
const Alert = () => {
  return (
    <Cont className="popup" colors={COLORS}>
      <p>Click on the map or enter the address below to add your location!</p>
    </Cont>
  );
};

export default Alert;
