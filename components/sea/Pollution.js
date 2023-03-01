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
  transition: max-width 0.25s ease;
  margin: 0 auto 48px;
  background-color: ${(props) => props.colors.offWhite2};
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
      className="box-shadow"
      style={{ maxWidth: visible ? "1000px" : "400px" }}
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
        style={{ maxHeight: visible ? "100%" : "320px" }}
      >
        <ReactMarkdown className="markdown">
          {pollution.description}
        </ReactMarkdown>
      </div>
      <div className="green-icon box-shadow-2" onClick={toggleVisible}>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="white icon-ssm"
          style={{ transform: visible ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
    </Cont>
  );
};

export default Pollution;
