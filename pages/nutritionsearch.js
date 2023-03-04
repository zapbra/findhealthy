import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import Searchbar from "../components/nutritionsearch/Searchbar";
import Results from "../components/nutritionsearch/Results";
import supabase from "../utils/supabaseClient";
import { fetchAllFoods } from "../utils/supabaseFunctions";
const Cont = styled.div`
  margin-top: 40px;
`;

export async function getServerSideProps() {
  const foodsFetch = await fetchAllFoods();

  return {
    props: {
      foodsFetch,
    },
  };
}

const Nutritionsearch = ({ foodsFetch }) => {
  const [foods, setFoods] = useState(
    foodsFetch.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
  );
  console.log(foods);
  const [value, setValue] = useState("All Food Categories");
  const updateValue = (val) => {
    setValue(val);
  };
  return (
    <Cont colors={COLORS}>
      <Searchbar value={value} setValue={setValue} updateValue={updateValue} />
      <div className="ssm-spacer-bot-res"></div>
      <Results foods={foods} />
    </Cont>
  );
};

export default Nutritionsearch;
