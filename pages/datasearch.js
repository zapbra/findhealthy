import { useState } from "react"
import styled from "styled-components"
import COLORS from "../data/colors";
import Searchbar from "../components/datasearch/Searchbar";
const Cont = styled.div`
    margin-top: 80px;
`;

const Datasearch = () => {
    const [text, setText] = useState('');
  return (
    <Cont colors = {COLORS}>
        <Searchbar text = {text} setText = {setText} />
    </Cont>
  )
}

export default Datasearch