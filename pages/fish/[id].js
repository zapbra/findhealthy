import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { fetchFish, fetchFishByName, fetchAllFishNames } from "../../utils/supabaseFunctions";
import NutrientFacts from "../../components/nutritionFacts/index";
import NutrientTopSection from "../../components/nutritionFacts/NutrientTopSection";
const Cont = styled.div`
  .title-spec {
    padding: 32px;
    border-bottom: 2px solid ${(props) => props.colors.darkBlue};
  }
`;

export async function getStaticPaths() {
  const fishFetch = await fetchFish();

  const paths = fishFetch.map((fish) => ({
    params: { id: fish.name },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const fishFetch = await fetchFishByName(params.id);
  const allFishFetch = await fetchAllFishNames();
  return {
    props: {
      fishFetch,
      allFishFetch
    },
  };
}

const Fish = ({ fishFetch, allFishFetch }) => {
  const [fish, setFish] = useState(fishFetch[0]);
  const [allFish, setAllFish] = useState(allFishFetch);
  return (
    <Cont colors={COLORS}>
      <div className="center-inline title-spec flex align-center justify-center mar-bottom-32">
        <h3 className="blue mar-right-16">{fish.name}</h3>
        <img src="/icons/fish2.png" />
      </div>
     
      <NutrientFacts fish = {fish} allFish = {allFish}  />
    </Cont>
  );
};

export default Fish;
