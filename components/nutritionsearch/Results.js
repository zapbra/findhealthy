import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import Select from "../google/Select";
import { nutrientList } from "../../data/Quantities";
import FoodLine from "./FoodLine";
const Cont = styled.div`
  max-width: 400px;
  margin: 0 auto;

  .result-holder {
    border: 1px solid ${(props) => props.colors.grey};
    border-radius: 8px;
    width: 100%;
    max-height: 1000px;
    overflow: auto;
  }
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
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border: 1px solid ${(props) => props.colors.grey};
    border-radius: 8px;
    &:hover {
      border: 1px solid ${(props) => props.colors.black};
    }
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
  .plus {
    transition: color 0.25s ease;
    &:hover {
      color: ${(props) => props.colors.black};
    }
    &:active {
      transform: scale(1.1);
      color: ${(props) => props.colors.black};
    }
  }
`;

const Results = ({ foods }) => {
  const [filters, setFilters] = useState(["Highest in", "Lowest in"]);
  const [filtersCopy, setFiltersCopy] = useState(["Highest in", "Lowest in"]);
  const [filterValue, setFilterValue] = useState("Highest in");
  const updateFilterValue = (val) => {
    setFilterValue(val);
  };

  const [nutrients, setNutrients] = useState(nutrientList);
  const [nutrientsCopy, setNutrientsCopy] = useState(nutrientList);
  const [nutrientValue, setNutrientValue] = useState("Vitamin a");
  const updateNutrientValue = (val) => {
    setNutrientValue(val);
  };

  const foodLines = foods.map((food) => {
    return <FoodLine name={food.name} category={food.food_category_id.name} />;
  });
  return (
    <Cont colors={COLORS}>
      <div className="flex-inline align-center mar-bottom-16">
        <h4
          className="black mar-right-8 
        "
        >
          SORT
        </h4>
        <FontAwesomeIcon icon={faFilter} className="icon-ssm black" />
      </div>
      <div className="flex mar-bottom-32 align-center">
        <div className="mar-right-16">
          <Select
            regions={filters}
            name=""
            value={filterValue}
            updateValue={updateFilterValue}
            options={filtersCopy}
            setOptions={setFiltersCopy}
          />
        </div>
        <div className="mar-right-16">
          <Select
            regions={nutrients}
            name=""
            value={nutrientValue}
            updateValue={updateNutrientValue}
            options={nutrientsCopy}
            setOptions={setNutrientsCopy}
          />
        </div>
        <FontAwesomeIcon icon={faPlus} className="icon-ssm grey plus cursor" />
      </div>
      <div className="mar-bottom-8 flex-inline">
        <p className="bold mar-right-8">Results</p>
        <p className="light-blue-2 bold">({foods.length})</p>
      </div>
      <div className="result-holder box-shadow-2 small-scrollbar">
        {foodLines}
      </div>
    </Cont>
  );
};

export default Results;
