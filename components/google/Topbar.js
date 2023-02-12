import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Toggle from "../inputs/Toggle";
import Searchbar from "../search/Searchbar";
import { PlacesAutocomplete } from "./Bottombar";
import Select from "./Select";
const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding: 4px 8px;

  .filter-bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: ${(props) => props.colors.lightBeige};
    border-radius: 16px;
    padding: 8px;
  }
  .toggles-holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media only screen and (max-width: 300px) {
      justify-content: center;
    }
    border-top: 1px solid ${(props) => props.colors.grey};
    padding-top: 8px;
  }
  input {
    border: 1px solid ${(props) => props.colors.grey};

    &:focus {
      border: 1px solid ${(props) => props.colors.darkPink};
      outline: none;
    }
  }
  .dropdown__selected {
    border: none;
  }
`;
const Topbar = ({ tagsFetch, updateCoords, locations, setLocationsFilter }) => {
  const [checkboxes, setCheckBoxes] = useState({
    grassFed: { checked: false, name: "grassFed" },
    organic: { checked: false, name: "organic" },
    soyFree: { checked: false, name: "soyFree" },
    unfrozen: { checked: false, name: "unfrozen" },
    dewormerFree: { checked: false, name: "dewormerFree" },
    pastureRaised: { checked: false, name: "pastureRaised" },
    vaccineFree: { checked: false, name: "vaccineFree" },
  });
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [text, setText] = useState("");
  const [filterTags, setFilterTags] = useState([]);
  const updateText = (e) => {
    let val = e.currentTarget.value;
    setText((prevText) => {
      return val.toLowerCase();
    });
  };

  useEffect(() => {
    setTags((prev) => {
      return tagsFetch.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    });
    setFilterTags((prev) => {
      return tagsFetch.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    });
  }, []);

  console.log("xxx");
  console.log(filterTags);
  function findClosestTag() {
    if (tags.length == 0) return;
    setFilterTags((prevTags) => {
      return tags.filter((tag) => {
        return tag.name.includes(text);
      });
    });
  }

  function removeSearchTag(id) {
    const item = searchTags.find((tag) => {
      return tag.id === id;
    });
    setFilterTags((prevTags) => {
      return [...prevTags, item];
    });
    setTags((prevTags) => {
      return [...prevTags, item];
    });
    setSearchTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
    /*
    setContext((prev) => {
      return {
        ...prev,
        tags: searchTags,
      };
    });*/
  }
  function removeSearchTag(id) {
    const item = searchTags.find((tag) => {
      return tag.id === id;
    });
    setFilterTags((prevTags) => {
      return [...prevTags, item];
    });
    setTags((prevTags) => {
      return [...prevTags, item];
    });
    setSearchTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
  }
  function pushSearchTag(tag) {
    setSearchTags((prevTags) => {
      return [...prevTags, tag];
    });
    setText("");
  }

  useEffect(() => {
    const delayType = setTimeout(() => {
      findClosestTag();
    }, 500);
    return () => clearTimeout(delayType);
  }, [text]);

  function removeTag(id) {
    const item = tags.find((tag) => {
      return tag.id === id;
    });
    pushSearchTag(item);
    setTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
    setFilterTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
  }
  function submitSearch(e) {
    e.preventDefault();
    if (filterTags.length <= 0) {
      return;
    }

    let id = filterTags[0].id;
    removeTag(id);
    setText("");
  }
  const [radiusValues, setRadiusValues] = useState([
    "5km",
    "10km",
    "25km",
    "50km",
    "100km",
    "200km",
  ]);
  const [value, setValue] = useState("50km");
  const [dynamicRadius, setDynamicRadius] = useState(radiusValues);
  const updateValue = (val) => {
    setValue(val);
  };
  const [filters, setFilters] = useState({
    grassFed: { checked: false, name: "grassFed" },
    organic: { checked: false, name: "organic" },
    soyFree: { checked: false, name: "soyFree" },
    unfrozen: { checked: false, name: "unfrozen" },
    dewormerFree: { checked: false, name: "dewormerFree" },
    pastureRaised: { checked: false, name: "pastureRaised" },
    vaccineFree: { checked: false, name: "vaccineFree" },
  });
  const updateFilters = (field) => {
    setFilters((prev) => {
      return {
        ...prev,
        [field]: { ...prev[field], checked: !prev[field].checked },
      };
    });
  };
  const toggles = Object.entries(filters).map(([key, val], index) => {
    return <Toggle selected={val} setSelected={updateFilters} />;
  });

  return (
    <Cont colors={COLORS}>
      <div className="filter-bar">
        <div className="mar-bottom-16">
          <Searchbar
            text={text}
            updateText={updateText}
            removeSearchTag={removeSearchTag}
            pushTag={pushSearchTag}
            pushSearchTag={pushSearchTag}
            tags={searchTags}
            submitSearch={submitSearch}
            removeTag={removeTag}
            filterTags={filterTags}
            colors={COLORS}
          />
        </div>
        <div className="mar-bottom-16">
          <p>City, address or location</p>
          <PlacesAutocomplete
            setAddress={setAddress}
            location={location}
            setLocation={setLocation}
            updateCoords={updateCoords}
          />
        </div>
        <div className="mar-bottom-16 ">
          <Select
            title="Enter radius"
            regions={radiusValues}
            options={dynamicRadius}
            setOptions={setDynamicRadius}
            name="radius"
            value={value}
            updateValue={updateValue}
          />
        </div>
        <div className="toggles-holder small-scrollbar ">{toggles}</div>
      </div>
    </Cont>
  );
};

export default Topbar;
