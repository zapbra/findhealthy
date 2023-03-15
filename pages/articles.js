import { useState, useEffect } from "react";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import COLORS from "../data/colors";
import Topics from "../components/articles/Topics";
import ArticlesPreview from "../components/articles/ArticlesPreview";
const Cont = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 40px;
`;

const Articles = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Cont colors={COLORS}>
      <Topics />
      <div className="ssm-spacer-bot-res"></div>
      <ArticlesPreview title="RECENTS" />
      <div className="ssm-spacer-bot-res"></div>
      <ArticlesPreview title="POPULAR" />
    </Cont>
  );
};

export default Articles;
