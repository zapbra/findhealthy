import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";

const Cont = styled.div`
  margin-top: 48px;
`;

const Farmmap = () => {
  return (
    <Cont colors={COLORS}>
      <div className="center-inline">
        <div className="header-3">
          <h4>FIND FARMS NEAR YOU</h4>
        </div>
      </div>
    </Cont>
  );
};

export default Farmmap;
