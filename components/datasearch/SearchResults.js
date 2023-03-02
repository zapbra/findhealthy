import Link from 'next/link';
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ResultLine from "./ResultLine";
import OceanLine from "./OceanLine";
const Cont = styled.div`
  margin: 0 auto;
  .result-group {
    ::-webkit-scrollbar {
      width: 0.5rem;
      background: ${(props) => props.colors.offWhite};
    }
    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.colors.darkBlue};
      &:hover {
        background: ${(props) => props.colors.lightBlue};
      }
    }
  }
`;

const SearchResults = ({ fish, oceans, seas }) => {
  const fishLines = fish.map((innerFish, index) => {
    return <Link href = {`/fish/${innerFish}`}><ResultLine key={index} text={innerFish} /></Link>;
  });

  const oceanLines = oceans.map((ocean, index) => {
    return <Link href = {`/ocean/${ocean.name}`}><OceanLine key={index} name={ocean.name} fish={ocean.fish} /></Link>;
  });
  const seaLines = seas.map((sea, index) => {
    return <Link href = {`/sea/${sea.name}`}><OceanLine key={index} name={sea.name} fish={sea.fish} /></Link>;
  });
  return (
    <Cont colors={COLORS} className="results-box">
      <div className="result-title">
        <h4 className="blue">Fish</h4>
      </div>
      <div className="result-group scroll-blue">{fishLines}</div>
      <div className="result-title">
        <h4 className="blue">Seas</h4>
      </div>
      <div className="result-group scroll-blue">{seaLines}</div>
      <div className="result-group scroll-blue"></div>
      <div className="result-title">
        <h4 className="blue">Oceans</h4>
      </div>
      <div className="result-group scroll-blue">{oceanLines}</div>
    </Cont>
  );
};

export default SearchResults;
