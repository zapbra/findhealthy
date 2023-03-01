import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div``;

const PollutionHolder = ({ PollutionEvents }) => {
  return (
    <Cont colors={COLORS}>
      <div className="flex justify-center">
        <div className="header-2 box-shadow-2">
          <h3 className="white">How Polluted Is It?</h3>
        </div>
      </div>
    </Cont>
  );
};

export default PollutionHolder;
