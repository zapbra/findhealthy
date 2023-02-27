import React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 4px 0px 4px 4px;
  border-bottom: 1px solid ${(props) => props.colors.grey};
`;
const NutrientLine = ({ name, units, grams}) => {
  return (
    <Cont colors={COLORS} >
      <p>{name}</p>
        <div className="flex">
        <p className="bold"> {units} </p>
        
        {grams == true && (
            <p className = 'mar-left-4'> grams</p>
        )}
        </div>
     
    </Cont>
  );
};

export default NutrientLine;
