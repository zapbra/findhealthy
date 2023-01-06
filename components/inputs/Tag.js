import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div``;

const Tag = ({ text, pushTag }) => {
  return (
    <Cont className="tag" colors={COLORS} onClick={() => pushTag(text)}>
      <p>{text}</p>
      <FontAwesomeIcon icon={faPlus} className="icon-ssm" />
    </Cont>
  );
};

export default Tag;
