import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  padding: 4px 8px;
  cursor: pointer;
  background-color: ${(props) => props.colors.lightBeige};
  &:hover {
    background-color: ${(props) => props.colors.midBeige};
  }
  .subtitles {
    max-width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const ForumContent = ({ title, subTitles, postsX, lastPostDetails }) => {
  console.log(subTitles);
  return (
    <Cont colors={COLORS}>
      <p className="blue bold">{title}</p>
      <div className="subtitles">
        {subTitles.map((title) => {
          return <p className="inline-block mar-right-4">{title}, </p>;
        })}
      </div>
    </Cont>
  );
};

export default ForumContent;
