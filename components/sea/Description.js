import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ReactMarkdown from "react-markdown";
const Cont = styled.div`
  .text-content {
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 8px;
    background-color: ${(prosp) => prosp.colors.offWhite2};
    padding: 16px;
  }
`;

const Description = ({ name, description }) => {
  return (
    <Cont colors={COLORS}>
      <div className="flex justify-center">
        <div className="header-2 box-shadow-2 mar-bottom-48 center-inline">
          <h3 className="white">Description of The {name} </h3>
        </div>
      </div>
      <ReactMarkdown className="markdown text-content  box-shadow">
        {description}
      </ReactMarkdown>
    </Cont>
  );
};

export default Description;
