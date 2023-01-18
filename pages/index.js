import Head from "next/head";
import Google from "../components/google/index";
import styled from "styled-components";
import {
  fetchLocations,
  fetchTags,
  createTag,
} from "../utils/supabaseFunctions";
import { useState } from "react";
const Cont = styled.div`
  min-height: 100vh;
`;

export const getStaticProps = async () => {
  const locationsFetch = await fetchLocations();
  const tagsFetch = await fetchTags();
  return {
    props: {
      locationsFetch,
      tagsFetch,
    },
  };
};
export default function Home({ locationsFetch, tagsFetch }) {
  const [locations, setLocations] = useState(locationsFetch);
  const [tags, setTags] = useState(tagsFetch);
  console.log("locations");
  console.log(locationsFetch);
  console.log("locations");

  const addTag = async (name) => {
    const updateTags = async () => {
      setTags(await fetchTags());
    };
    createTag(name).then((res) => res && updateTags());
  };
  return (
    <Cont>
      <Google locations={locations} tagsFetch={tags} addTag={addTag} />
    </Cont>
  );
}
