import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ArticleLine from "./ArticleLine";
const Cont = styled.div`
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media only screen and (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }
`;

const ArticlesPreview = ({ title, articles }) => {
  const [articleElems, setArticleElems] = useState([]);
  return (
    <Cont colors={COLORS}>
      <h3 className="black">{title}</h3>
      <div className="grey-line mar-bottom-32"></div>
      <div className="container">
        <ArticleLine
          title="What Makes Steak healthy"
          description="Learn the science on steak nutrition"
        />
        <ArticleLine
          title="What Makes Steak healthy"
          description="Learn the science on steak nutrition"
        />
        <ArticleLine
          title="What Makes Steak healthy"
          description="Learn the science on steak nutrition"
        />
        <ArticleLine
          title="What Makes Steak healthy"
          description="Learn the science on steak nutrition"
        />
      </div>
    </Cont>
  );
};

export default ArticlesPreview;
