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
  @media only screen and (max-width: 300px) {
    p {
      font-size: 12.73px;
    }
  }
  .units {
    margin-right: 16px;
    @media only screen and (max-width: 240px) {
      margin-right: 8px;
    }
  }
  .line-content {
    min-width: 128px;
    justify-content: space-between;
    @media only screen and (max-width: 260px) {
      min-width: 5px;
    }
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
        <p className="units"> {units}</p>
        <div className="flex">
          <p className="bold">{dv} </p>
          <p className="mar-left-2 bold">%DV</p>
        </div>
      </div>
    </Cont>
  );
};

export default NutrientLine;
