import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import {
  fetchAllFoodIds,
  fetchFoodById,
  fetchAllFoods,
  fetchFoodByName,
} from "../../utils/supabaseFunctions";
import NutrientFacts from "../../components/food/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleWhole,
  faFish,
  faDrumstickBite,
  faBacon,
  faWheatAwn,
  faGlassWater,
  faCow,
  faDragon,
} from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  .title-spec {
    padding: 32px;
    border-bottom: 2px solid ${(props) => props.colors.darkBlue};
    background: ${(props) => props.colors.offWhite};
  }
`;

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
    },
  };
}

const Food = ({ foodFetch, allFoodsFetch }) => {
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState(foodFetch);
  const [allFoods, setAllFoods] = useState(allFoodsFetch);

  const reFetchFood = async (name) => {
    setLoading(true);
    const fetchFood = await fetchFoodByName(name);
    setFood(fetchFood);
    setLoading(false);
  };

  const [iconObj, setIconObj] = useState({
    Beef: faCow,
    "Dairy and Eggs": faGlassWater,
    Fish: faFish,
    Poultry: faDrumstickBite,
    "Lamb, Veal and Game": faDragon,
    Pork: faBacon,
    "Fruits and Fruit Juices": faAppleWhole,
    "Grains and Starches": faWheatAwn,
  });

  return (
    <Cont colors={COLORS}>
      <div className="center-inline title-spec flex align-center justify-center mar-bottom-32 box-shadow-2">
        {loading ? (
          <div class="lds-ring-green">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            {" "}
            <h3 className="blue mar-right-16">{food.name}</h3>
            <FontAwesomeIcon
              icon={iconObj[food.food_category_id.name]}
              className="icon-med blue"
            />
          </>
        )}
      </div>
      <NutrientFacts fish={food} allFish={allFoods} reFetchFood={reFetchFood} />
    </Cont>
  );
};

export default Food;
