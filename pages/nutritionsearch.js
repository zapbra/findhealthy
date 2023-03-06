import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import Searchbar from "../components/nutritionsearch/Searchbar";
import Results from "../components/nutritionsearch/Results";
import supabase from "../utils/supabaseClient";
import {
  fetchAllFoods,
  fetchFoodCategoryByName,
} from "../utils/supabaseFunctions";
const Cont = styled.div`
  margin-top: 40px;
`;

export async function getServerSideProps() {
  const allFoodCategories = await fetchAllFoods();
  const beefFetch = await fetchFoodCategoryByName("Beef");
  const dairyAndEggsFetch = await fetchFoodCategoryByName("Dairy and Eggs");
  const fishFetch = await fetchFoodCategoryByName("fish");
  const poultryFetch = await fetchFoodCategoryByName("Poultry");
  const lambVealAndGameFetch = await fetchFoodCategoryByName(
    "Lamb, Veal and Game"
  );
  const fruitsFetch = await fetchFoodCategoryByName("Fruit and Fruit Juices");
  const grainsFetch = await fetchFoodCategoryByName("Grains and Starches");
  return {
    props: {
      allFoodCategories,
      beefFetch,
      dairyAndEggsFetch,
      fishFetch,
      poultryFetch,
      lambVealAndGameFetch,
      fruitsFetch,
      grainsFetch,
    },
  };
}

const Nutritionsearch = ({
  allFoodCategories,
  beefFetch,
  dairyAndEggsFetch,
  fishFetch,
  poultryFetch,
  lambVealAndGameFetch,
  fruitsFetch,
  grainsFetch,
}) => {
  const [allFoods, setAllFoods] = useState(
    allFoodCategories.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );
  const [dairy, setDairy] = useState(
    dairyAndEggsFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [fish, setFish] = useState(
    fishFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [poultry, setPoultry] = useState(
    poultryFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [lambVealAndGame, setLambVealAndGame] = useState(
    lambVealAndGameFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [fruit, setFruit] = useState(
    fruitsFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [beef, setBeef] = useState(
    beefFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [beef, setBeef] = useState(
    beefFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  //console.log(foods);
  const [value, setValue] = useState("All Food Categories");
  const updateValue = (val) => {
    setValue(val);
  };
  return (
    <Cont colors={COLORS}>
      <Searchbar value={value} setValue={setValue} updateValue={updateValue} />
      <div className="ssm-spacer-bot-res"></div>
      <Results foods={allFoods} />
    </Cont>
  );
};

export default Nutritionsearch;
