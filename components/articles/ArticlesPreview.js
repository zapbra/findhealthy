import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div``;

const ArticlesPreview = ({ field, articles }) => {
  const [articleElems, setArticleElems] = useState([]);
  return (
    <Cont colors={COLORS}>
      <h3 className="black">{field}</h3>
      <div className="grey-line mar-bottom-16"></div>
    </Cont>
  );
};

export default ArticlesPreview;
