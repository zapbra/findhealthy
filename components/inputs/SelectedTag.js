import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div``;

const SelectedTag = ({ text, deleteTag }) => {
  return (
    <Cont className="selected-tag" onClick={() => deleteTag(text)}>
      <p>{text}</p>
      <FontAwesomeIcon icon={faClose} className="icon-ssm" />
    </Cont>
  );
};

export default SelectedTag;
