import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  padding: 4px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid ${(props) => props.colors.grey};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.colors.offWhite2};
  }
  p {
    display: inline-block;
  }
`;

const OceanLine = ({ name, fish }) => {
  const fishLines = [];
  const length = fish.length > 7 ? 7 : fish.length;

  for (let i = 0; i < length; i++) {
    fishLines.push(
      <div className="flex-inline align-center mar-right-8">
        <FontAwesomeIcon icon={faFish} className="grey icon-ssm mar-right-4" />
        <p className="grey"> {fish[i]}, </p>
      </div>
    );
  }

  return (
    <Cont colors={COLORS}>
      <p className="bold blue mar-right-32">{name}</p>

      {fishLines}
      {fish.length > 7 && <p className="grey">...{fish.length - 7} more</p>}
    </Cont>
  );
};

export default OceanLine;
