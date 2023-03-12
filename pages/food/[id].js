import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import {
  fetchAllFoodIds,
  fetchFoodById,
  fetchAllFoods,
} from "../../utils/supabaseFunctions";
import NutrientFacts from "../../components/food/Index";

const Cont = styled.div``;

export async function getStaticPaths() {
  const foodFetch = await fetchAllFoodIds();

  const paths = foodFetch.map((food) => ({
    params: { id: food.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const foodFetch = await fetchFoodById(params.id);
  const allFoodsFetch = await fetchAllFoods();
  return {
    props: {
      foodFetch,
      allFoodsFetch,
      xd: params.id,
    },
  };
}

const Food = ({ foodFetch, allFoodsFetch, xd }) => {
  const [food, setFood] = useState(foodFetch);
  const [allFoods, setAllFoods] = useState(allFoodsFetch);

  const reFetchFoods = async (name) => {};

  console.log(food);
  return (
    <Cont colors={COLORS}>
      <NutrientFacts
        fish={food}
        allFish={allFoods}
        reFetchFish={reFetchFoods}
      />
    </Cont>
  );
};

export default Food;
