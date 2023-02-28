import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Select from "../google/Select";
import QUANTITIES from "../../data/Quantities";
import {FontAW}
const Cont = styled.div`
  .dropdown {
    border: none;
    &__menu {
      border: 1px solid ${(props) => props.colors.grey};
    }
    &__menu_search {
      border: 1px solid ${(props) => props.colors.darkBlue};
    }
  }
  .dropdown__selected {
    border: 1px solid ${(props) => props.colors.grey};
    border-radius: 8px;
  }
  .small-scrollbar {
    ::-webkit-scrollbar {
      background: ${(props) => props.colors.offWhite};
    }
    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.colors.darkBlue};
      &:hover {
        background: ${(props) => props.colors.lightBlue};
      }
    }
  }
`;
const NutrientTopSection = ({ name, allFish, fish }) => {
  const [quantity, setQuantity] = useState(fish.nutrients_id.quantity);
  const [quantities, setQuantities] = useState([
    `${quantity} grams`,
    ...QUANTITIES,
  ]);
  const [fishNames, setFishNames] = useState(
    allFish.map((fish) => {
      return fish.name;
    })
  );
  const [fishNamesCopy, setFishNamesCopy] = useState(
    allFish.map((fish) => {
      return fish.name;
    })
  );
  const [value, setValue] = useState(name);
  console.log(fish);
  return (
    <Cont colors={COLORS} className="mar-bottom-16">
      <div className="flex mar-bottom-16">
        <div className="icon-button"></div>
      </div>
      <div className="flex">
        <div className="flex flex-column mar-right-16">
          <h5 className="contrast light mar-bottom-4">FOOD</h5>

          <Select
            regions={fishNames}
            name="fish"
            value={value}
            updateValue={setValue}
            options={fishNamesCopy}
            setOptions={setFishNamesCopy}
          />
        </div>

        <div className="flex flex-column">
          <h5 className="contrast light mar-bottom-4">QTY</h5>

          <Select
            regions={QUANTITIES}
            name="quantity"
            value={`${quantity} grams`}
            updateValue={setQuantity}
            options={quantities}
            setOptions={setQuantities}
          />
        </div>
      </div>
    </Cont>
  );
};

export default NutrientTopSection;
