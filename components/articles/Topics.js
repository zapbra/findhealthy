import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import TopicLine from "./TopicLine";
const Cont = styled.div`
  .topic-holder {
    display: flex;
    flex-wrap: wrap;
  }
`;

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
      <div className="grey-line mar-bottom-32"></div>
      <div className="topic-holder space-around">
        <TopicLine title="Nutrition" />
        <TopicLine title="Food Sourcing" />
        <TopicLine title="Lifestyle" />
        <TopicLine title="Environment" />
        <TopicLine title="EMFS" />
      </div>
    </Cont>
  );
};

export default Topics;
