import { useState } from "react"
import styled from "styled-components"
import COLORS from "../data/colors";
import Searchbar from "../components/datasearch/Searchbar";
import SearchResults from "../components/datasearch/SearchResults";
const Cont = styled.div`
    margin-top: 80px;
`;

export async function getStaticProps () {

};

const Datasearch = () => {
    const [text, setText] = useState('');
  return (
    <Cont colors = {COLORS}>
        <Searchbar text = {text} setText = {setText} />
        <div className="ssm-spacer-bot-res"></div>
        <SearchResults fish = {['Salmon, Coho', 'Swordfish','Grouper','Anchovies']}/>
    </Cont>
  )
}

export default Datasearch