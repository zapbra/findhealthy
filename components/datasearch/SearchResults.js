import { useState } from "react"
import styled from "styled-components"
import COLORS from "../../data/colors";
import ResultLine from "./ResultLine";
import OceanLine from "./OceanLine";
const Cont = styled.div`
    margin: 0 auto;
    .result-group{
        ::-webkit-scrollbar {
            width: 0.5rem;
    background: ${props=>props.colors.offWhite};
  }
  ::-webkit-scrollbar-thumb {
    background: ${props=>props.colors.darkBlue};
    &:hover {
      background: ${props=>props.colors.lightBlue};
    }
  }
    }
`;

const SearchResults = ({fish, oceans, seas}) => {
    const fishLines= fish.map(innerFish => {
        return <ResultLine text = {innerFish} />
    });

    const oceanLines = oceans.map(ocean => {
        return <OceanLine text = {ocean.name} fish = {ocean.fish} />
    })
  return (
    <Cont colors = {COLORS} className = 'results-box'>
        <div className="result-title">
            <h4 className="blue">Fish</h4>
        </div>
        <div className="result-group scroll-blue">
            {fishLines}
        </div>
        <div className="result-title">
            <h4 className="blue">Seas</h4>
        </div>
        <div className="result-group scroll-blue">
            {fishLines}
        </div>
        <div className="result-title">
            <h4 className="blue">Oceans</h4>
        </div>
        <div className="result-group scroll-blue">
            {fishLines}
        </div>
    </Cont>
  )
}

export default SearchResults