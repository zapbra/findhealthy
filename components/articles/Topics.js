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
    return <Link href={`/article${topic}`}> </Link>;
  });
  return (
    <Cont colors={COLORS}>
      <h3 className="black">TOPICS</h3>

      <div className="grey-line"></div>
    </Cont>
  );
};

export default Topics;
