import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import { fetchForumCountryByName } from "../../../utils/supabaseFunctions";
import CountryHolder from "../../../components/forum/country/CountryHolder";

const Cont = styled.div``;

export async function getServerSideProps(params) {
  const fetchCountry = await fetchForumCountryByName(params.query.id);
  return {
    props: {
      fetchCountry,
    },
  };
}

const Country = ({ fetchCountry }) => {
  console.log(fetchCountry);
  useEffect(() => {}, []);
  return (
    <Cont colors={COLORS}>
      <CountryHolder
        country={fetchCountry.name}
        provinces={fetchCountry.forumStates}
      />
    </Cont>
  );
};

export default Country;
