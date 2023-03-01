import { useState } from "react";
import styled from "styled-components";
import { fetchSeaNames, fetchSeaByName } from "../../utils/supabaseFunctions";
import COLORS from "../../data/colors";
import CaughtHere from "../../components/sea/CaughtHere";
import ImageSection from "../../components/sea/ImageSection";
import PollutionHolder from "../../components/sea/PollutionHolder";
import Description from "../../components/sea/Description";
const Cont = styled.div`
  .title-spec {
    padding: 32px;
    border-bottom: 2px solid ${(props) => props.colors.darkBlue};
    background: ${(props) => props.colors.offWhite};
  }
`;

export async function getStaticPaths() {
  const seaFetch = await fetchSeaNames();

  const paths = seaFetch.map((sea) => ({
    params: { id: sea.name },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const seaFetch = await fetchSeaByName(params.id);

  return {
    props: {
      seaFetch,
    },
  };
}

const Sea = ({ seaFetch }) => {
  const [sea, setSea] = useState(seaFetch[0]);
  console.log(sea);
  return (
    <Cont colors={COLORS}>
      <div className="center-inline title-spec flex align-center justify-center mar-bottom-32 box-shadow-2">
        <h3 className="blue mar-right-16">{sea.name}</h3>
        <img src="/icons/sea.png" />
      </div>
      <CaughtHere seaName={sea.name} fish={sea.oceanFish} />
      <div className="sm-spacer-bot-res"></div>

      <ImageSection />
      <div className="sm-spacer-bot-res"></div>
      <PollutionHolder pollutionEvents={sea.pollution} />
      <div className="sm-spacer-bot-res"></div>
      <Description name={sea.name} description={sea.description} />
    </Cont>
  );
};

export default Sea;
