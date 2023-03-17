import { useEffect, useState } from "react";
import euroCountries from "../data/locations/EuroCountries.json";
import supabase from "../utils/supabaseClient";

const Evenmoretesting = () => {
  const insert = async (val) => {
    try {
      const { data, error } = await supabase
        .from("forumCountry")
        .insert({ name: val, continent_id: 2 })
        .select();
      if (error) throw error;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const runFunction = async () => {
    euroCountries.forEach((state) => {
      insert(state.name);
    });
  };
  return (
    <div>
      <div onClick={runFunction} style={{ border: "1px solid black" }}>
        <p>run me</p>
      </div>
    </div>
  );
};

export default Evenmoretesting;
