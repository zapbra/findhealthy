import styled from "styled-components";
import { useState, useEffect } from "react";
import COLORS from "../data/colors";
import supabase from "../utils/supabaseClient";
import { createFish, createNutrients } from "../utils/supabaseFunctions";
const Cont = styled.div``;

import React from "react";

const countries = [
  "South Africa",
  "Namibia",
  "Angola",
  "Equatorial Guinea",
  "Brazil",
  "Uruguay",
  "Argentina",
  "South Africa",
];
const Moretesting = () => {
  useEffect(() => {
    const insertFunction = async () => {
      const res = await Promise.all(
        countries.map((country) => {
          return supabase.from("oceanCountry").insert({ name: country });
        })
      );
      console.log(res);
    };
    //insertFunction();
  }, []);
  return <Cont colors={COLORS}></Cont>;
};

export default Moretesting;
