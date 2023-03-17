import { useEffect, useState } from "react";
import Provinces from "../data/locations/Provinces.json";

const Evenmoretesting = () => {
  const runFunction = async () => {
    Object.entries(Provinces).map(([key, val]) => {
      console.log(val);
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
