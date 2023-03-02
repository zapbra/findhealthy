import { useState } from "react"
import styled from "styled-components"
import COLORS from "../../data/colors";
import ResultLine from "./ResultLine";
const Cont = styled.div`
    margin: 0 auto;
`;

const SearchResults = ({fish, oceans, seas}) => {
    const [fishLines, setFishLines] = useState(fish.map(innerFish => {
        return <ResultLine text = {innerFish} />
    }));

  return (
    <Cont colors = {COLORS} className = 'results-box'>
        <div className="result-title">
            <h4 className="blue">Fish</h4>
        </div>
        <div className="result-group">
            {fishLines}
        </div>
    </Cont>
  )
}

export default SearchResults