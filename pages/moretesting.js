import styled from "styled-components";
import { useState, useEffect } from "react";
import COLORS from "../data/colors";
import supabase from "../utils/supabaseClient";
import { createFish, createNutrients } from "../utils/supabaseFunctions";
const Cont = styled.div``;

import React from "react";

const Moretesting = () => {
  let countries = "Norway".split(",");

  countries = countries.map((country) => country.trim());
  console.log(countries);
  const insertFunction = async () => {
    const res = await Promise.all(
      countries.map((country) => {
        console.log(country);
        return supabase.from("oceanCountry").insert({ name: country }).select();
      })
    );
    console.log(res);
  };
  const upsertFunction = async () => {
    const res = await Promise.all(
      countries.map((country) => {
        console.log(country);
        return supabase
          .from("oceanCountry")
          .update({ ocean_id: 3, sea_id: 15 })
          .eq("name", country)
          .select();
      })
    );
    console.log(res);
  };

  return (
    <Cont colors={COLORS}>
      <div onClick={insertFunction} style={{ border: "1px solid black" }}>
        <h4>Click me to insert</h4>
      </div>
      <div onClick={upsertFunction} style={{ border: "1px solid black" }}>
        <h4>Click me to update</h4>
      </div>
    </Cont>
  );
};

export default Moretesting;
