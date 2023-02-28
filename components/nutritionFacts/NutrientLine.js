import React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  background: #fff;
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 4px 0px 4px 4px;
  border-bottom: 1px solid ${(props) => props.colors.grey};
  p {
    z-index: 1;
  }
  .line-content {
    min-width: 128px;
    justify-content: space-between;
  }
  .green-bg {
    position: absolute;
    height: 100%;
    background-color: ${(props) => props.colors.lightGreen};
    top: 0;
    opacity: 0.5;
  }
`;
const NutrientLine = ({ name, units, dv }) => {
  return (
    <Cont colors={COLORS}>
      <div
        className="green-bg"
        style={{
          width: dv <= 100 ? `${dv}%` : "100%",
          backgroundColor: dv <= 100 ? COLORS.lightGreen : COLORS.lightRed,
        }}
      ></div>
      <p>{name}</p>
      <div className="flex line-content">
        <p className="bold mar-right-16"> {units}</p>
        <div className="flex">
          <p className="bold">{dv} </p>
          <p className="mar-left-4">%DV</p>
        </div>
      </div>
    </Cont>
  );
};

export default NutrientLine;
