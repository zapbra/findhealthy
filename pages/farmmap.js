import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import COLORS from "../data/colors";
import Location from "../components/farmmap/Location";
import Products from "../components/farmmap/Products";
import { fetchLocations, fetchTags } from "../utils/supabaseFunctions";
import Results from "../components/farmmap/Results";
import Farm from "../components/farmmap/Farm";
const Cont = styled.div`
  margin-top: 48px;
  .content-container {
    max-width: 1300px;
    margin: 0 auto;
  }
`;

export async function getServerSideProps() {
  const tagsFetch = await fetchTags();
  const locationsFetch = await fetchLocations();
  return {
    props: {
      tagsFetch,
      locationsFetch,
    },
  };
}
const Farmmap = ({ tagsFetch, locationsFetch }) => {
  const [searchTags, setSearchTags] = useState([]);
  const [farmLocations, setFarmLocations] = useState(locationsFetch);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [options, setOptions] = useState([]);
  const [regions, setRegions] = useState([]);
  const [foodLocations, setFoodLocaitons] = useState([]);
  console.log(farmLocations);
  const locElem = (
    <Farm
      name={farmLocations[2].name}
      address={farmLocations[2].address[0].full_address}
      created_at={farmLocations[2].created_at}
      icon={farmLocations[2].icon}
      tags={farmLocations[2].tags}
      pickup={farmLocations[2].pickup}
      pricing={farmLocations[2].pricing}
      quality={farmLocations[2].quality}
      image={farmLocations[2].images[0].url}
    />
  );

  const changeHandler = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        value,
        error: value !== "" ? "" : prev[name].error,
      },
    }));
    if (name === "country") {
      updateCountry(value);
    } else if (name === "state") {
      updateState(value);
    } else if (name === "city") {
      updateCity(value);
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => {
        setData((prevData) => {
          return res.data;
        });
        setRegions((prevData) => {
          return [...new Set(res.data.map((item) => item.country))].sort();
        });
        setOptions((prevData) => {
          return [...new Set(res.data.map((item) => item.country))].sort();
        });
      })
      .catch((err) => console.log(err));

    setLocations((prevLocations) => {
      let newLocations = foodLocations.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    });
  }, []);

  useEffect(() => {
    setLocations((prevLocations) => {
      return foodLocations.filter((location) => {
        return location.country.title === country;
      });
    });
  }, [country]);

  useEffect(() => {
    setLocations((prevLocations) => {
      return foodLocations.filter((location) => {
        return location.state.title === state;
      });
    });
  }, [state]);

  useEffect(() => {
    setLocations((prevLocations) => {
      return foodLocations.filter((location) => {
        return location.city.title === city;
      });
    });
  }, [city]);

  function updateCountry(value) {
    console.log(value);
    setCountry((prevCountry) => {
      return value;
    });
    let states = data.filter((item) => {
      return item.country === value;
    });
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setStates((prevStates) => {
      return states;
    });
    setState("?");
    setCity("");
  }

  function updateState(value) {
    setState((prevState) => {
      return value;
    });
    let cities = data.filter((city) => city.subcountry === value);
    cities = cities.map((city) => city.name);
    cities.sort();
    setCities(cities);
  }

  function updateCity(value) {
    setCity((prevCity) => {
      return value;
    });
  }

  function updateRegion(location, name) {
    if (name === "country") {
      updateCountry(location);
    } else if (name === "state") {
      updateState(location);
    } else if (name == "city") {
      updateCity(location);
    }
  }

  return (
    <Cont colors={COLORS}>
      <div className="center-inline mar-bottom-48">
        <div className="header-3">
          <h4>FIND FARMS NEAR YOU</h4>
        </div>
      </div>
      <div className="content-container">
        <div className="flex-inline flex-wrap space-around content-container">
          <Location
            countries={regions}
            country={country}
            updateRegion={updateRegion}
            options={options}
            setOptions={setOptions}
            states={states}
            state={state}
            setStates={setStates}
            cities={cities}
            city={city}
            setCities={setCities}
          />

          <Products
            tagsFetch={tagsFetch}
            searchTags={searchTags}
            setSearchTags={setSearchTags}
          />
        </div>
        <div className="mar-bottom-32"></div>

        <Results locElem={locElem} />
      </div>
    </Cont>
  );
};

export default Farmmap;
