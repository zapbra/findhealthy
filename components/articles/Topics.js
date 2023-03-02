import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div``;

const Topics = () => {
  const [topics, setTopics] = useState([
    "Environmental Pollution",
    "Food Sourcing",
    "Nutrition and Food",
    "EMFS",
    "Hormones",
    "Lifestyle",
    "Illness",
  ]);

  const topicLines = topics.map((topic) => {
    return (
      <Link href={`/article${topic}`}>
        <h5 className="bold blue underline-hover mar-bottom-8">{topic}</h5>{" "}
      </Link>
    );
  });
  return (
    <Cont colors={COLORS}>
      <h3 className="black">TOPICS</h3>
      <div className="grey-line mar-bottom-16"></div>
      <div className="flex">
        <div className="flex-one">
          {topicLines[0]}
          {topicLines[1]}
          {topicLines[2]}
        </div>
        <div className="flex-one">
          {topicLines[3]}
          {topicLines[4]}
          {topicLines[5]}
        </div>
        <div className="flex-one">{topicLines[6]}</div>
      </div>
    </Cont>
  );
};

export default Topics;
