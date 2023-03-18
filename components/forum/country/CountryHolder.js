import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import CountrySection from "./CountrySection";
import PostsSection from "../PostsSection";
const Cont = styled.div`
  border-radius: 8px;
  @media only screen and (max-width: 600px) {
    border-radius: 0px;
  }
`;
const CountryHolder = ({ country, provinces }) => {
  const posts = [
    {
      title: "Where to find meat in germany",
      forum: "Germany",
      poster: "rawfatgod",
      date: new Date(),
    },
    {
      title: "Where to find meat in canada",
      forum: "Canada",
      poster: "rawfatgod",
      date: new Date(),
    },
    {
      title: "Where to find meat in canada",
      forum: "Canada",
      poster: "rawfatgod",
      date: new Date(),
    },
    {
      title: "Where to find meat in germany",
      forum: "Germany",
      poster: "rawfatgod",
      date: new Date(),
    },
    {
      title: "Where to find meat in germany",
      forum: "Germany",
      poster: "rawfatgod",
      date: new Date(),
    },
    {
      title: "Where to find meat in germany",
      forum: "Germany",
      poster: "rawfatgod",
      date: new Date(),
    },
  ];

  return (
    <Cont colors={COLORS}>
      <CountrySection country={country} provinces={provinces} />

      <PostsSection title="Recent Posts" posts={posts} />
    </Cont>
  );
};

export default CountryHolder;
