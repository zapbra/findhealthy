import { useState } from "react"
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
    display:flex;
`;
const NutrientTopSection = () => {
  return (
    <Cont colors = {COLORS}>
      <div className="flex">
        <h5 className="contrast light">FOOD</h5>
      </div>
    </Cont>
  )
}

export default NutrientTopSection