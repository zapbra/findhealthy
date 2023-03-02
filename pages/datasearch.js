import { useState } from "react"
import styled from "styled-components"
import COLORS from "../data/colors";
import Searchbar from "../components/datasearch/Searchbar";
import SearchResults from "../components/datasearch/SearchResults";
import { fetchAllFishNames, fetchOceansData } from "../utils/supabaseFunctions";
const Cont = styled.div`
    margin-top: 80px;
`;

export async function getStaticProps () {
    const fishFetch = await fetchAllFishNames();
    const oceansFetch = await fetchOceansData();
    return {
        props: {
            fishFetch,
            oceansFetch
        }
    }
};

const Datasearch = ({fishFetch, oceansFetch}) => {
    const [fish, setFish] = useState(fishFetch.map(fish=>fish.name));
    const [oceans, setOceans] = useState(oceansFetch);
    
    const [text, setText] = useState('');
  return (
    <Cont colors = {COLORS}>
        <Searchbar text = {text} setText = {setText} />
        <div className="ssm-spacer-bot-res"></div>
        <SearchResults fish = {fish}/>
    </Cont>
  )
}

export default Datasearch