import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";

const Cont = styled.div``;

const Farmmap = () => {
  return (
    <Cont colors={COLORS}>
      <div className="header-3">
        <h4>FIND FARMS NEAR YOU</h4>
      </div>
    </Cont>
  );
};

export default Farmmap;
