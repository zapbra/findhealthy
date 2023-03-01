import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.black};
  border-radius: 8px;
  padding: 8px;
  text-align: center;

  margin: 0 auto;
  .text-content {
    overflow: hidden;
    padding: 16px;
  }
`;

const Pollution = ({ pollution }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  return (
    <Cont
      colors={COLORS}
      className="mar-bottom-32"
      style={{ maxWidth: visible ? "1200px" : "400px" }}
    >
      <h4 className="black mar-bottom-16">{pollution.name}</h4>
      <div className="star-holder mar-bottom-16">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index, realIndex) => {
          return (
            <FontAwesomeIcon
              key={realIndex}
              icon={faStar}
              className={
                index <= pollution.severity
                  ? "icon-ssm light-red"
                  : "icon-ssm black"
              }
            />
          );
        })}
      </div>
      <div
        className="text-content"
        style={{ maxHeight: visible ? "none" : "320px" }}
      >
        <ReactMarkdown classname="markdown">
          {pollution.description}
        </ReactMarkdown>
      </div>
      <div className="green-icon box-shadow-2" onClick={toggleVisible}>
        <FontAwesomeIcon icon={faChevronDown} className="white icon-ssm" />
      </div>
    </Cont>
  );
};

export default Pollution;
