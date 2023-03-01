import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ReactMarkdown from "react-markdown";
const Cont = styled.div`
  .markdown {
    padding: 32px;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    background-color: ${(props) => props.colors.offWhite2};
    border-left: 1px solid ${(props) => props.colors.grey};
    border-right: 1px solid ${(props) => props.colors.grey};
  }
`;

const AboutSection = ({ description, appearance, name }) => {
  return (
    <Cont colors={COLORS}>
      <div className="about-section">
        <div className="header box-shadow-2">
          <h3 className="blue">Where Are They Caught?</h3>
        </div>

        <ReactMarkdown className="markdown">{description}</ReactMarkdown>
      </div>
      <div className="about-section">
        <div className="header box-shadow-2">
          <h3 className="blue">All About {name} </h3>
        </div>
        <ReactMarkdown className="markdown">{appearance}</ReactMarkdown>
      </div>
    </Cont>
  );
};

export default AboutSection;
