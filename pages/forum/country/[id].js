import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import { fetchForumCountryByName } from "../../../utils/supabaseFunctions";

const Cont = styled.div``;

export async function getServerSideProps({ params }) {
  const fetchCountry = fetchForumCountryByName(params.query.id);
  return {
    props: {
      fetchCountry,
    },
  };
}

const Country = ({ fetchCountry }) => {
  console.log(fetchCountry);
  return <Cont colors={COLORS}></Cont>;
};

export default Country;
