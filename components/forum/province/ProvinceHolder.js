import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import PostHolder from "../PostHolder";
const Cont = styled.div`
  border-radius: 8px;
  @media only screen and (max-width: 600px) {
    border-radius: 0px;
  }
`;
const CountryHolder = ({ province, posts }) => {
  return (
    <Cont colors={COLORS}>
      <PostHolder posts={posts} title={province} />
    </Cont>
  );
};

export default CountryHolder;
