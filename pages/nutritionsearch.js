import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import Searchbar from "../components/nutritionsearch/Searchbar";
import Results from "../components/nutritionsearch/Results";
import supabase from "../utils/supabaseClient";
import {
  fetchAllFoods,
  fetchFoodCategoryByName,
  fetchAllFish,
} from "../utils/supabaseFunctions";
const Cont = styled.div`
  margin-top: 40px;
`;

export async function getServerSideProps() {
  const allFoodCategories = await fetchAllFoods();
  const beefFetch = await fetchFoodCategoryByName("Beef");
  const dairyAndEggsFetch = await fetchFoodCategoryByName("Dairy and Eggs");
  const fishFetch = await fetchAllFish();
  const poultryFetch = await fetchFoodCategoryByName("Poultry");
  const lambVealAndGameFetch = await fetchFoodCategoryByName(
    "Lamb, Veal and Game"
  );
  const porkFetch = await fetchFoodCategoryByName("Pork");
  const fruitsFetch = await fetchFoodCategoryByName("Fruits and Fruit Juices");
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
      porkFetch,
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
  porkFetch,
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
    fishFetch.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
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

  const [grains, setGrains] = useState(
    grainsFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [beef, setBeef] = useState(
    beefFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [pork, setPork] = useState(
    porkFetch.foods.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );

  const [foodsObject, setFoodsObject] = useState({
    "All Food Categories": allFoods,
    "Dairy and Eggs": dairy,
    Fish: fish,
    Poultry: poultry,
    "Lamb, Veal and Game": lambVealAndGame,
    Pork: pork,
    "Fruits and Fruit Juices": fruit,
    "Grains and Starches": grains,
    Beef: beef,
  });

  console.log("fish");
  console.log(fish);
  console.log("beef");
  console.log(beef);
  const [selectedFoods, setSelectedFoods] = useState(
    foodsObject["All Food Categories"]
  );
  const [selectedFoodsCopy, setSelectedFoodsCopy] = useState(
    foodsObject["All Food Categories"]
  );
  const [value, setValue] = useState("All Food Categories");
  const updateValue = (val) => {
    setSelectedFoods(foodsObject[val]);
    setSelectedFoodsCopy(foodsObject[val]);
    console.log(foodsObject[val]);
    setValue(val);
  };

  const [searchText, setSearchText] = useState("");
  const updateSearchText = (e) => {
    const val = e.target.value;
    setSelectedFoods(
      selectedFoodsCopy.filter((food) => {
        return food.name.toLowerCase().includes(val.toLowerCase());
      })
    );
    setSearchText(val);
  };
  return (
    <Cont colors={COLORS}>
      <Searchbar
        searchText={searchText}
        updateSearchText={updateSearchText}
        value={value}
        setValue={setValue}
        updateValue={updateValue}
      />
      <div className="ssm-spacer-bot-res"></div>
      <Results foods={selectedFoods} />
    </Cont>
  );
};

export default Nutritionsearch;
