import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Select from "../google/Select";
const Cont = styled.div``;

const Location = ({
  countries,
  country,
  updateRegion,
  options,
  setOptions,
  states,
  state,
  setStates,
  city,
  cities,
  setCities,
}) => {
  return (
    <Cont colors={COLORS}>
      <h5 className="mar-bottom-32-res">LOCATION</h5>
      <div className="tan-container flex">
        <div className="mar-right-32">
          <h5 className="light contrast mar-bottom-16">COUNTRY</h5>
          <Select
            regions={countries}
            value={country}
            updateValue={updateRegion}
            searchPlaceholder="Search"
            options={options}
            setOptions={setOptions}
            name="country"
          />
        </div>
        <div className="mar-right-32">
          <h5 className="light contrast mar-bottom-16">STATE</h5>
          <Select
            regions={states}
            value={state}
            updateValue={updateRegion}
            options={states}
            setOptions={setStates}
            name="state"
          />
        </div>
        <div className="mar-right-32">
          <h5 className="light contrast mar-bottom-16">CITY</h5>
          <Select
            regions={cities}
            value={city}
            updateValue={updateRegion}
            searchPlaceholder="Search"
            options={cities}
            setOptions={setCities}
            name="city"
          />
        </div>
      </div>
    </Cont>
  );
};

export default Location;
