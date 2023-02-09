import Head from "next/head";
import Google from "../components/google/index";
import styled from "styled-components";
import COLORS from "../data/colors";
import { Toaster } from "react-hot-toast";
import {
  fetchLocations,
  fetchLocation,
  fetchTags,
  createTag,
} from "../utils/supabaseFunctions";
import supabase from "../utils/supabaseClient";
import { useEffect, useState } from "react";
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

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session != null) {
        setUser(session.session.user);
      }
    };
    fetchUser();
  }, []);

  const pushLocation = (location) => {
    setLocations((prev) => {
      return [...prev, location];
    });
  };
  useEffect(() => {
    console.log(locations);
  }, [locations]);
  const fetchNewLocation = async (id) => {
    const location = fetchLocation(id);
    location.then((res) => pushLocation(res));
  };

  const addTag = async (name) => {
    const updateTags = async () => {
      setTags(await fetchTags());
    };
    createTag(name).then((res) => res && updateTags());
  };

  return (
    <Cont colors={COLORS}>
      <Google
        locations={locations}
        tagsFetch={tags}
        addTag={addTag}
        fetchNewLocation={fetchNewLocation}
        user={user}
      />
    </Cont>
  );
}
