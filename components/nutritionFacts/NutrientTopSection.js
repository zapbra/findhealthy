import { useState } from "react"
import styled from "styled-components";
import COLORS from "../../data/colors";
import Select from "../google/Select";
const Cont = styled.div`
    display:flex;
`;
const NutrientTopSection = ({name, allFish}) => {
  const [fishNames, setFishNames] = useState(allFish.map(fish => {
    return fish.name;
  }))
  const [value, setValue] = useState(name);
  return (
    <Cont colors = {COLORS}>
      <div className="flex">
        <h5 className="contrast light">FOOD</h5>
        {/*
        <Select
        title = {name}
        regions = {fishNames}
        name = 'fish'
        value = {value}
        updateValue = {setValue}
        />
  */}
        
      </div>
    </Cont>
  )
}

export default NutrientTopSection