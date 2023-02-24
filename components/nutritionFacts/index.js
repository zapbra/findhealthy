import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import NutrientLine from "./NutrientLine";
const Cont = styled.div`
  max-width: 600px;
  margin: 0 auto;
  .nutrient-holder {
    border: 1px solid ${(props) => props.colors.grey};
    border-radius: 8px;
    padding: 8px;
  }
  .nutrient-title {
    background-color: ${(props) => props.colors.offWhite};
    padding: 2px 4px;
    border-bottom: 1px solid ${(props) => props.colors.black};
  }
`;
const index = ({ nutrients }) => {
  return (
    <Cont colors={COLORS}>
      <h5 className="blue mar-bottom-16">Nutrition Facts</h5>
      <div className="nutrient-holder">
        <div className="nutrient-title">
          <p className="bold">Vitamins</p>
          <NutrientLine
            name="Vitamin A"
            units={nutrients.vitamin_a_units}
            dv={nutrients.vitamin_a_daily_value}
          />
        </div>
      </div>
    </Cont>
  );
};

export default index;
