import React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 2px 0px 2px 4px;
  border-bottom: ${(props) => props.colors.grey};
`;
const NutrientLine = ({ name, units, dv }) => {
  return (
    <Cont colors={COLORS}>
      <p>{name}</p>
      <div>
        <p className="bold">{units}</p>
        <div className="flex">
          <p className="bold">{dv} </p>
          <p>%DV</p>
        </div>
      </div>
    </Cont>
  );
};

export default NutrientLine;
