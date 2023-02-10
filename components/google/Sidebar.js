import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faLocationDot,
  faEgg,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import Searchbar from "../search/Searchbar";
import { PlacesAutocomplete } from "./Bottombar";

const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  flex-shrink: 0;
  width: 300px;
  padding: 8px;
  border-top: 2px solid ${(props) => props.colors.darkPink};
  border-bottom: 2px solid ${(props) => props.colors.darkPink};

  @media only screen and (max-width: 900px) {
    width: 200px;
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
    .input-line {
      max-width: 200px;
      margin-bottom: 16px;
    }
    .mar-bottom-32 {
      margin-bottom: 16px;
    }
    .content-holder {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-items: center;
      flex-wrap: wrap;
      justify-content: center;
    }
    .submit-btn {
      display: flex !important;
      justify-content: center;
    }
  }

  .radius-content {
    & > div {
      background-color: ${(props) => props.colors.tan};
      border: 1px solid ${(props) => props.colors.darkPink};
      padding: 4px 8px;
    }
  }
  .radius-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
// one lng/lat is 111km
const lngUnit = 111;
const Sidebar = ({
  tagsFetch,
  updateCoords,
  locations,
  setLocationsFilter,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [radius, setRadius] = useState("5km");
  const [radiusText, setRadiusText] = useState("");

  const updateRadiusText = (e) => {
    const val = e.target.value;

    if (/^[0-9]*$/.test(val)) {
      setRadiusText(val);
    }
  };

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

  function findClosestTag() {
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

  const latitudeCalc = (locationsFilter) => {
    const [lat1, lon1] = [address.lat, address.lng];
    const returnLocations = locationsFilter.filter((location) => {
      const [lat2, lon2] = [location.address[0].lat, location.address[0].lng];
      const φ1 = (lat1 * Math.PI) / 180,
        φ2 = (lat2 * Math.PI) / 180,
        Δλ = ((lon2 - lon1) * Math.PI) / 180,
        R = 6371e3;
      const d =
        Math.acos(
          Math.sin(φ1) * Math.sin(φ2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)
        ) * R;
      const curRadius =
        radiusText != "" ? Number(radiusText) : Number(radius.match(/[0-9]*/));
      if (d / 1000 <= curRadius) return true;
    });
    return returnLocations;
  };

  const filterLocationsByTags = () => {
    return locations.filter((location) =>
      searchTags.every((searchTag) =>
        location.tags.some((tag) => tag == searchTag.name)
      )
    );
  };

  const filterLocationsByCheckboxes = (locations) => {
    const checkedBoxes = Object.entries(checkboxes)
      .filter(([key, val]) => {
        return val.checked;
      })
      .map((box) => box[0]);

    return locations.filter((location) => {
      return checkedBoxes.every((box) => {
        return location[box] == "true";
      });
    });
  };
  const applyFilter = () => {
    if (address == "") {
      toast("Please select an address from the dropdown.", {
        duration: 4000,
        position: "top-center",

        // Styling
        style: { border: "1px solid #E52323", backgroundColor: "#eee2dc;" },
        className: "",

        // Custom Icon
        icon: "👇",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      const searchBarElem = document.querySelector("#address-input");
      searchBarElem.focus();
      searchBarElem.classList.add("scale-pop-anim");

      searchBarElem.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        searchBarElem.classList.remove("scale-pop-anim");
      }, 1000);

      return;
    }
    let locationsFilter = filterLocationsByTags();
    locationsFilter = filterLocationsByCheckboxes(locationsFilter);
    locationsFilter = latitudeCalc(locationsFilter);
    setLocationsFilter(locationsFilter);
  };
  function submitSearch(e) {
    e.preventDefault();
    if (filterTags.length <= 0) {
      return;
    }

    let id = filterTags[0].id;
    removeTag(id);
    setText("");
  }

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

  const updateText = (e) => {
    let val = e.currentTarget.value;
    setText((prevText) => {
      return val.toLowerCase();
    });
  };

  const toggleCheckbox = (field) => {
    setCheckBoxes((prev) => {
      return {
        ...prev,
        [field]: { ...prev[field], checked: !prev[field].checked },
      };
    });
  };

  const submitForm = handleSubmit(async (formData) => {});
  return (
    <Cont colors={COLORS}>
      <div className="center-inline mar-bottom-16">
        <h4>FILTERS</h4>
      </div>

      <form className="form " onSubmit={submitForm}>
        <div className="content-holder">
          <div className="input-line">
            <div className="flex align-center">
              <h4 className="text-shadow-red mar-right-8">Products</h4>
              <FontAwesomeIcon icon={faEgg} className="icon-ssm red" />
            </div>
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
          <div className="input-line">
            <div className="flex align-center mar-bottom-8 ">
              <h4 className="text-shadow-red mar-right-8">Your Location</h4>
              <FontAwesomeIcon icon={faLocationDot} className="red icon-ssm" />
            </div>
            <PlacesAutocomplete
              setAddress={setAddress}
              location={location}
              setLocation={setLocation}
              updateCoords={updateCoords}
            />
            {errors.name?.type === "required" && (
              <p className="error">*Name is required</p>
            )}
          </div>
          <div className="input-line">
            <div className="radius-content">
              <div className="radius-header flex">
                <div className="flex-inline align-center">
                  <h4 className="text-shadow-red mar-right-8">Radius</h4>
                </div>
                <FontAwesomeIcon icon={faCircle} className="red icon-ssm" />
              </div>
              <div className="input-line flex flex-wrap space-between">
                <label htmlFor="5km">
                  <div className="flex align-center mar-right-8">
                    <input
                      name="radius"
                      onChange={() => setRadius("5km")}
                      type="radio"
                      value="5"
                      id="5km"
                      checked={radius == "5km"}
                    />
                    <p className="mar-left-4">5km</p>
                  </div>
                </label>

                <label htmlFor="10km">
                  <div className="flex align-center mar-right-8">
                    <input
                      name="radius"
                      onChange={() => setRadius("10km")}
                      type="radio"
                      id="10km"
                      checked={radius == "10km"}
                      value="10"
                    />
                    <p className="mar-left-4">10km</p>
                  </div>
                </label>

                <label htmlFor="25km">
                  <div className="flex align-center mar-right-8">
                    <input
                      name="radius"
                      onChange={() => setRadius("25km")}
                      type="radio"
                      id="25km"
                      checked={radius == "25km"}
                      value="25"
                    />
                    <p className="mar-left-4">25km</p>
                  </div>
                </label>

                <label htmlFor="50km">
                  <div className="flex align-center mar-right-8">
                    <input
                      name="radius"
                      onChange={() => setRadius("50km")}
                      type="radio"
                      id="50km"
                      checked={radius == "50km"}
                      value="50"
                    />
                    <p className="mar-left-4">50km</p>
                  </div>
                </label>

                <label htmlFor="100km">
                  <div className="flex align-center mar-right-8">
                    <input
                      name="radius"
                      onChange={() => setRadius("100km")}
                      type="radio"
                      id="100km"
                      checked={radius == "100km"}
                      value="100"
                    />
                    <p className="mar-left-4">100km</p>
                  </div>
                </label>

                <label htmlFor="200km">
                  <div className="flex align-center mar-right-8">
                    <input
                      name="radius"
                      onChange={() => setRadius("200km")}
                      type="radio"
                      id="200km"
                      checked={radius == "200km"}
                      value="200"
                    />
                    <p className="mar-left-4">200km</p>
                  </div>
                </label>
                <label htmlFor="radiusText">
                  <p className="red bold inline-block">Other</p>
                  <div className="flex align-center">
                    <input
                      value={radiusText}
                      onChange={updateRadiusText}
                      type="text"
                      placeholder="40..."
                      name="radiusText"
                      id="radiusText"
                      className="mar-right-4 flex-one"
                    />
                    <p className="flex-one bold red inline-block">km</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div>
            <div className="flex space-between flex-wrap">
              <label className="checkbox-label ">
                <p className="mar-right-8 bold ">Grass Fed</p>
                <input
                  type="checkbox"
                  checked={checkboxes["grassFed"].checked}
                  onClick={() => toggleCheckbox("grassFed")}
                />
              </label>

              <label className="checkbox-label">
                <p className="mar-right-8 bold ">Organic</p>
                <input
                  type="checkbox"
                  checked={checkboxes["organic"].checked}
                  onClick={() => toggleCheckbox("organic")}
                />
              </label>
            </div>
            <div className="flex space-between flex-wrap">
              <label className="checkbox-label">
                <p className="mar-right-8 bold ">Vaccine Free</p>
                <input
                  type="checkbox"
                  checked={checkboxes["vaccineFree"].checked}
                  onClick={() => toggleCheckbox("vaccineFree")}
                />
              </label>

              <label className="checkbox-label">
                <p className="mar-right-8 bold ">Soy Free</p>
                <input
                  type="checkbox"
                  checked={checkboxes["soyFree"].checked}
                  onClick={() => toggleCheckbox("soyFree")}
                />
              </label>
            </div>
            <div className="flex space-between flex-wrap">
              <label className="checkbox-label">
                <p className="mar-right-8 bold ">Unfrozen</p>
                <input
                  type="checkbox"
                  checked={checkboxes["unfrozen"].checked}
                  onClick={() => toggleCheckbox("unfrozen")}
                />
              </label>

              <label className="checkbox-label">
                <p className="mar-right-8 bold ">Dewormer Free</p>
                <input
                  type="checkbox"
                  checked={checkboxes["dewormerFree"].checked}
                  onClick={() => toggleCheckbox("dewormerFree")}
                />
              </label>
            </div>
            <label className="checkbox-label">
              <p className="mar-right-8 bold ">Pasture Raised</p>
              <input
                type="checkbox"
                checked={checkboxes["pastureRaised"].checked}
                onClick={() => toggleCheckbox("pastureRaised")}
              />
            </label>
          </div>
        </div>
        <div className="mar-bottom-16"></div>
        <div
          onClick={applyFilter}
          className="blue-btn-one flex-inline align-center submit-btn mar-bottom-16"
        >
          <h5 className="mar-right-8">Search</h5>
          <FontAwesomeIcon icon={faSearch} className="icon-ssm white" />
        </div>
      </form>
    </Cont>
  );
};

export default Sidebar;
