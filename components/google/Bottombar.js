import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import PhotoDisplay from "../popups/PhotoDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";
import {
  faClose,
  faPlus,
  faLocationDot,
  faDollarSign,
  faCoins,
  faEgg,
  faUpload,
  faFaceSmileBeam,
  faSmileBeam,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import ProductTags from "../inputs/productTags";
import ImageUpload from "../inputs/ImageUpload";
import RenderImages from "../inputs/RenderImages";
import toast from "react-hot-toast";
import createLocation, {
  createAddress,
  createProduct,
  fetchCountryByName,
  createImage,
  createUserLocation,
} from "../../utils/supabaseFunctions";
import CreateTag from "../inputs/CreateTag";
import StarReview from "../inputs/StarReview";
import countryCodes, {
  countryCodesOnly,
  measurements,
} from "../../data/countryCodes";
import Dropdown from "./Dropdown";
const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding: 16px;
  form {
    position: relative;
  }
  .tag-three {
    background-color: ${(props) => props.colors.darkBlue};
    margin-right: 8px;
    p {
      color: ${(props) => props.colors.offWhite};
    }
  }
  .fake-form {
    max-width: 600px;
    margin: 0 auto;
  }
  @media only screen and (max-width: 400px) {
    padding: 8px;
  }
  .optional-fields {
    background: #fff;
    border: 1px solid ${(props) => props.colors.grey};
    padding: 16px;
  }

  .dollar-input {
    width: auto;
  }
  .selects {
    border-bottom: 1px solid ${(props) => props.colors.darkPink};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .radio-line {
    border-right: 2px solid ${(props) => props.colors.darkPink};
    display: inline-block;
    padding-right: 16px;
    margin-right: 16px;
    margin-bottom: 32px;
  }
  .stars {
    
    
  }
`;

const Bottombar = ({
  adding,
  startAdding,
  stopAdding,
  location,
  setLocation,
  tagsFetch,
  addTag,
  fetchNewLocation,
  user,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState({ state: false, msg: "" });
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [farm, setFarm] = useState({});
  const [imageLinks, setImageLinks] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    value: "",
    dollarType: "USD",
    measurement: "lb",
  });
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState({
    fullAddress: "",
    street: "",
    state: "",
    country: "",
    lat: "",
    lng: "",
  });

  const updateProduct = (e, field) => {
    setProduct((prev) => {
      return {
        ...prev,
        [field]: e.target.value.toLowerCase(),
      };
    });
  };

  const updateProductValue = (e) => {
    const value = e.target.value;
    const regex = /^[0-9.$ ]*$/;
    if (!regex.test(value)) {
      toast.error("Must be valid number (Ex. 14.99)");
      productValueRef.current.classList.add("red-anim");
      setTimeout(() => {
        productValueRef.current.classList.remove("red-anim");
      }, 1000);
      return;
    }
    setProduct((prev) => {
      return {
        ...prev,
        value: value.toLowerCase(),
      };
    });
  };
  useEffect(() => {
    setTags(tagsFetch.map((tag) => tag.name));
  }, [tagsFetch]);
  const pushTag = (tag) => {
    setSelectedTags((prev) => {
      return [...prev, tag];
    });
    setTags((prev) => {
      const removeTag = [...prev].filter((innerTag) => innerTag !== tag);
      return removeTag;
    });
  };

  const deleteTag = (tag) => {
    setTags((prev) => {
      return [...prev, tag];
    });
    setSelectedTags((prev) => {
      const removeTag = [...prev].filter((innerTag) => innerTag !== tag);
      return removeTag;
    });
  };
  const imageRef = useRef(null);
  const uploadImage = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      alert("You must select an image to upload.");
      return;
    }
    if (images.length >= 6) {
      toast.error("6 ");
      return;
    }
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    setImages((prev) => {
      return [...prev, event.target.files[0]];
    });
  };

  const uploadImages = async (location_id) => {
    setLoading({ state: true, msg: "uploading images..." });
    const imageUploads = [];

    for (let i = 0; i < images.length; i++) {
      let formData = new FormData();
      formData.append("image", images[i]);
      try {
        const response = await fetch("https://api.imgur.com/3/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_ID}`,
          },
        });
        const res = await response.json();
        if (res.status == 200) {
          console.log("res");

          const uploadState = await createImage(
            res.data.link,
            res.data.deletehash,
            location_id
          );
          if (uploadState != true) {
            toast.error(`Error uploading image ${i + 1}`);
          }
        } else {
          toast("Error uploading image", {
            duration: 4000,
            position: "top-center",

            // Styling
            style: { border: "1px solid #E52323" },
            className: "",

            // Custom Icon
            icon: "⚠️",

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
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    return imageUploads;
  };

  const checkAddressValid = async () => {
    try {
      const results = await getGeocode({ address: location });
      return true;
    } catch (error) {
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
      const searchBarElem = document.querySelector(".google-dropdown");
      searchBarElem.focus();
      searchBarElem.classList.add("scale-pop-anim");

      searchBarElem.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        searchBarElem.classList.remove("scale-pop-anim");
      }, 1000);
      const lines = document.querySelectorAll(".google-dropdown p");
      lines.forEach((line) => {
        line.classList.add("red-anim");
        setTimeout(() => {
          line.classList.remove("red-anim");
        }, 1000);
      });

      return false;
    }
  };
  const serviceRatingRef = useRef(null);
  const createButtonRef = useRef(null);
  const clearForm = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("howToOrder", "");
    setValue("hoursFrom", "");
    setValue("hoursTo", "");
    setValue("pickup", "unspecified");
    setValue("website", "");
    setValue("email", "");
    setValue("number", "");
    setValue("grassFed", "unspecified");
    setValue("organic", "unspecified");
    setValue("vaccineFree", "unspecified");
    setValue("pastureRaised", "unspecified");
    setValue("soyFree", "unspecified");
    setValue("dewormerFree", "unspecified");
    setValue("unfrozen", "unspecified");
    setImages([]);
    setLocation("");
    setProducts([]);
    setTags(tagsFetch.map((tag) => tag.name));
    setSelectedTags([]);
    setReviewFields((prev) => {
      return {
        pricing: { name: "pricing", stars: 0 },
        quality: { name: "quality", stars: 0 },
        friendly: { name: "friendly", stars: 0 },
      };
    });
  };

  const finalizeLocation = (id) => {
    setLoading({ state: true, msg: "location created..." });
    clearForm();
    fetchNewLocation(id);
    stopAdding();
    const navbar = document.getElementById("navbar");
    navbar.scrollIntoView({ behavior: "smooth", block: "center" });
    setLoading({ state: false, msg: "" });
  };
  console.log("user");
  console.log(user);
  console.log("user");

  const createLocationFunc = async (formData) => {
    setLoading({ state: true, msg: "creating location..." });

    const numberOrganize = formData.number.replaceAll(/[^0-9]/g, "").split("");
    if (numberOrganize != "") {
      numberOrganize.unshift("(");
      numberOrganize.splice(4, 0, ")");
      numberOrganize.splice(5, 0, "-");
      numberOrganize.splice(9, 0, "-");
    }

    if (user !== null) {
      let locationId = await createUserLocation(
        formData.name,
        formData.description,
        formData.hoursFrom,
        formData.hoursTo,
        formData.pickup,
        formData.website,
        formData.email,
        numberOrganize.join(""),
        selectedTags,
        optionalFields.grassFed.value,
        optionalFields.organic.value,
        optionalFields.vaccineFree.value,
        optionalFields.pastureRaised.value,
        optionalFields.soyFree.value,
        optionalFields.dewormerFree.value,
        optionalFields.unfrozens.value,
        reviewFields.pricing.stars === 0 ? null : reviewFields.pricing.stars,
        reviewFields.quality.stars === 0 ? null : reviewFields.quality.stars,
        reviewFields.friendly.stars === 0 ? null : reviewFields.friendly.stars,
        formData.howToOrder,
        user.id
      );
      return locationId;
    } else {
      let locationId = await createLocation(
        formData.name,
        formData.description,
        formData.hoursFrom,
        formData.hoursTo,
        formData.pickup,
        formData.website,
        formData.email,
        numberOrganize.join(""),
        selectedTags,
        optionalFields.grassFed.value,
        optionalFields.organic.value,
        optionalFields.vaccineFree.value,
        optionalFields.pastureRaised.value,
        optionalFields.soyFree.value,
        optionalFields.dewormerFree.value,
        optionalFields.unfrozens.value,
        reviewFields.pricing.stars === 0 ? null : reviewFields.pricing.stars,
        reviewFields.quality.stars === 0 ? null : reviewFields.quality.stars,
        reviewFields.friendly.stars === 0 ? null : reviewFields.friendly.stars,
        formData.howToOrder
      );
      return locationId;
    }
  };

  const submitForm = handleSubmit(async (formData) => {
    const validAddress = await checkAddressValid();
    setLoading({ state: true, msg: "checking address valid..." });
    if (validAddress) {
      const locationId = await createLocationFunc(formData);
      setLoading({ state: true, msg: "creating products..." });
      products.forEach((product) => {
        createProduct(
          locationId,
          product.name,
          product.value,
          product.dollarType,
          product.measurement
        );
      });
      uploadImages(locationId);
      setLoading({ state: true, msg: "creating address..." });
      createAddress(
        locationId,
        address.fullAddress,
        address.street,
        address.lat,
        address.lng,
        address.country,
        address.state
      ).then((res) => finalizeLocation(locationId));
    } else {
      // if address isn't valid, remove loading screen
      setLoading({ state: false, msg: "" });
    }
  });

  const addProduct = (e) => {
    e.preventDefault();
    if (product.name === "") {
      toast.error("product field is empty!");
      productInput.current.classList.add("red-anim");
      setTimeout(() => {
        productInput.current.classList.remove("red-anim");
      }, 1000);
      return;
    } else if (
      products.some((innerProduct) => innerProduct.name === product.name)
    ) {
      toast.error("product has already been added");
      productInput.current.classList.add("red-anim");
      setTimeout(() => {
        productInput.current.classList.remove("red-anim");
      }, 1000);
      return;
    }

    setProducts((prev) => {
      return [...prev, product];
    });

    setProduct({
      name: "",
      value: "",
      dollarType: selectedValue,
      measurement: selectedMeasure,
    });
  };

  const productValueRef = useRef(null);
  const productInput = useRef(null);
  const productElems = products.map((product, index) => {
    return (
      <div key={index} className="tag-three">
        {" "}
        <p className="mar-right-4 bold">{product.name}</p>{" "}
        <div className="values mar-right-8">
          <p className="black">
            ${product.value}(<em className="contrast">{product.dollarType}</em>
            )/{product.measurement}
          </p>
        </div>
        <div className="delete-sm ">
          <FontAwesomeIcon
            onClick={() => removeProductTag(product.name)}
            icon={faClose}
            className="icon-ssm contrast"
          />
        </div>
      </div>
    );
  });

  const removeProductTag = (productName) => {
    setProducts((prev) => {
      return [...prev.filter((product) => product.name !== productName)];
    });
  };

  const [reviewFields, setReviewFields] = useState({
    pricing: { name: "pricing", stars: 0 },
    quality: { name: "quality", stars: 0 },
    friendly: { name: "friendly", stars: 0 },
  });

  const updateReviewFields = (field, value) => {
    setReviewFields((prev) => {
      return {
        ...prev,
        [field]: { ...prev[field], stars: value },
      };
    });
  };

  const dropdownEl = useRef(null);
  const [dollarValue, setDollarValue] = useState("USD");
  const [selectedValue, setSelectedValue] = useState(dollarValue);
  const [selectedIndex, setSelectedIndex] = useState(
    selectedValue !== "" ? countryCodesOnly.indexOf(selectedValue) : null
  );
  const [dollarSearch, setDollarSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [actualDollar, setActualDollar] = useState("");
  const [options, setOptions] = useState(countryCodesOnly);
  // Dropdown function
  const handleClickOutside = useCallback(
    (e) => {
      if (
        showDropdown &&
        e.target.closest(".dropdown") !== dropdownEl.current
      ) {
        setShowDropdown(false);
        setDollarSearch("");
      }
    },
    [showDropdown, setShowDropdown, dropdownEl]
  );

  const changeSelectedHandler = (item, name, index) => {
    setSelectedValue(item);
    setProduct((prev) => {
      return {
        ...prev,
        dollarType: item,
      };
    });

    setSelectedIndex(index);
    setShowDropdown(false);
    setActualDollar(name);
  };
  const searchChangeHandler = (e) => {
    setDollarSearch(e.target.value);
    const filteredOptions = countryCodesOnly.filter((code) => {
      return code.includes(e.target.value.trim().toUpperCase());
    });
    setOptions(filteredOptions);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const dropdownEl2 = useRef(null);
  const [measureValue, setMeasureValue] = useState("pound");
  const [selectedMeasure, setSelectedMeasure] = useState(measureValue);
  const [selectedMeasureIndex, setSelectedMeasureIndex] = useState(
    selectedMeasure !== "" ? measurements.indexOf(selectedMeasure) : null
  );
  const [measurementSearch, setMeasurementSearch] = useState("");
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [actualMeasure, setActualMeasure] = useState("");
  const [measureOptions, setMeasureOptions] = useState(measurements);

  const handleClickOutside2 = useCallback(
    (e) => {
      if (
        showDropdown2 &&
        e.target.closest(".dropdown") !== dropdownEl2.current
      ) {
        setShowDropdown2(false);
        setMeasurementSearch("");
      }
    },
    [showDropdown2, setShowDropdown2, dropdownEl2]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside2);

    return () => {
      document.removeEventListener("click", handleClickOutside2);
    };
  }, [handleClickOutside2]);

  useEffect(() => {
    console.log(actualDollar);
  }, [actualDollar]);
  const changeSelectedMeasureHandler = (item, name, index) => {
    setSelectedMeasure(item);

    setProduct((prev) => {
      return {
        ...prev,
        measurement: item,
      };
    });

    setSelectedMeasureIndex(index);
    setShowDropdown2(false);
    setActualMeasure(name);
  };

  const measureSearchChangeHandler = (e) => {
    setMeasurementSearch(e.target.value);
    const filteredOptions = measurements.filter((code) => {
      return code.includes(e.target.value.trim().toLowerCase());
    });
    setMeasureOptions(filteredOptions);
  };

  const [selectedImage, setSelectedImage] = useState("");
  const [showPhotoDisplay, setShowPhotoDisplay] = useState(false);
  const updateSelectedImage = (url) => {
    setSelectedImage(url);
  };
  const setPhotoDisplayVisible = () => {
    setShowPhotoDisplay(true);
  };

  const hidePhoto = () => {
    setShowPhotoDisplay(false);
  };

  const [optionalFields, setOptionalFields] = useState({
    grassFed:{name:'Grass Fed', value:'unspecified'},
    organic:{name:'Organic', value:'unspecified'},
    vaccineFree:{name:'Vaccine Free', value:'unspecified'},
    pastureRaised:{name:'Pasture Raised', value:'unspecified'},
    soyFree:{name:'Soy Free', value:'unspecified'},
    dewormerFree:{name:'Dewormer Free', value:'unspecified'},
    unfrozen:{name:'Unfrozen', value:'unspecified'},
  });

  const updateFields = (name, value) => {
    
    setOptionalFields(prev=> {
      return {
        ...prev,
        [name]:{...prev[name], value:value}
      }
    })
  }

  useEffect(()=> {
    console.log(optionalFields);
  },[optionalFields])
  
  
  const [optionalfieldElems, setOptionalFieldElems] = useState(Object.entries(optionalFields).map(([key, val]) => {
    console.log('1235');
    console.log(val.name);
    return (
      <div key= {nanoid} className="select-box-holder">
           <h5 className="black">{val.name}?</h5>
           <div className="select-box">
            {['yes','no','unspecified'].map((fieldValue, index) => {
              return (<div key = {index} className={ fieldValue == val.value ? "select-item selected-box": "select-item"}>
               <p>{fieldValue}</p>
            </div>)
            })}
            
            
           </div></div>
    )
  }));

  useEffect(()=> {
    
    setOptionalFieldElems(prev=> {
    
      return Object.entries(optionalFields).map(([key, val]) => {
        return (
          <div key= {nanoid} className="select-box-holder">
               <p className="black bold mar-bottom-4">{val.name}?</p>
               <div className="select-box">
                {['yes','no','unspecified'].map((fieldValue, index) => {
                  return (<div onClick = {()=> updateFields(key, fieldValue)} key = {nanoid} className={ fieldValue == val.value ? "select-item selected-box": "select-item"}>
                   <p>{fieldValue}</p>
                </div>)
                })}
                
                
               </div></div>
        )
      })
    })
  },[optionalFields]);
  console.log(optionalFields)
  return (
    <Cont colors={COLORS}>
      {loading.state && (
        <div className="loading-screen">
          <div className="loading-items">
            <div class="lds-ring-green">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="bold green">{loading.msg}</p>
          </div>
        </div>
      )}
      {showPhotoDisplay && (
        <PhotoDisplay selectedImage={selectedImage} hidePhoto={hidePhoto} />
      )}

      <button
        disabled={adding}
        onClick={startAdding}
        className="blue-btn-one  mar-bottom-8 mar-right-8"
      >
        <h4>ADD NEW LOCATION</h4>
      </button>
      {adding && (
        <button
          onClick={stopAdding}
          className="red-btn-one  flex-inline  align-center"
        >
          <h4 className="mar-right-8">CANCEL</h4>
          <FontAwesomeIcon icon={faClose} className="icon-sm white" />
        </button>
      )}
      <div className="mar-bottom-16"></div>
      <br />
      {adding && (
        <form className=" fake-form opacity-anim" onSubmit={submitForm}>
          <h4 className="mar-bottom-8 text-shadow-red">ENTER AN ADDRESS *</h4>
          <div className="red-line mar-bottom-8"></div>
          <PlacesAutocomplete
            location={location}
            setLocation={setLocation}
            setAddress={setAddress}
          />

          <div className="input-line">
            <div className="input-line">
              <h4 className = 'text-shadow-red'>PRODUCT TYPES *</h4>
              <div className="red-line mar-bottom-8"></div>
              <ProductTags
                tags={tags}
                selectedTags={selectedTags}
                pushTag={pushTag}
                deleteTag={deleteTag}
              />
            </div>
          </div>
          <CreateTag addTag={addTag} tags={tags} />
          <div className="input-line">
            <h4 className = 'text-shadow-red'>BUSINESS NAME *</h4>
            <div className="red-line mar-bottom-8"></div>
            <input
              {...register("name", {
                required: true,
              })}
              type="text"
              placeholder="Business Name"
              name="name"
            />
            {errors.name?.type === "required" && (
              <p className="error">*Name is required</p>
            )}
          </div>
          <div className="input-line">
            <h4 className = 'text-shadow-red'>DESCRIPTION *</h4>
            <div className="red-line mar-bottom-8"></div>
            <p className="italic">How are their prices?</p>
            <p className="italic mar-bottom-4">What was your experience?</p>
            <textarea
              {...register("description", {
                required: true,
              })}
              type="text"
              placeholder="Describe the farm/store"
              name="description"
            />
            {errors.description?.type === "required" && (
              <p className="error">*Description is required</p>
            )}
          </div>

          <div className="input-line">
            <h4 className = 'text-shadow-red'>HOW TO ORDER</h4>
              <div className="red-line"></div>
            <p className="italic">Do you need to order from their website?</p>
            <p className="italic mar-bottom-4">
              Is it pickup only on certain days?
            </p>
            <textarea
              {...register("howToOrder", {
                required: false,
              })}
              type="text"
              placeholder="Pickup location, delivery, etc"
              name="howToOrder"
            />
          </div>

          <div className="input-line">
            <h4 className = 'text-shadow-red'>SPECIFIC PRODUCTS</h4>
            <div className="red-line mar-bottom-8"></div>
            <p className="italic mar-bottom-4">
              Add more specic products to show exactly what they have
            </p>
            <div className="relative">
              <div className="tags-input-box mar-bottom-8 align-center flex">
                <FontAwesomeIcon
                  icon={faEgg}
                  className="icon-ssm blue mar-right-8"
                />
                <input
                  value={product.name}
                  onChange={(e) => updateProduct(e, "name")}
                  type="text"
                  placeholder="sirloin steak... unsalted raw cheese..."
                  ref={productInput}
                  className="flex-one"
                />
              </div>
              <div className="tags-input-box flex-inline align-center dollar-input inline-block mar-bottom-8">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="icon-ssm blue mar-right-8"
                />
                <input
                  type="text"
                  placeholder="14.99..."
                  style={{ width: "160px" }}
                  value={product.value}
                  ref={productValueRef}
                  onChange={(e) => updateProductValue(e, "value")}
                />
              </div>
              <br />
              <div className="relative">
                <div className="dropdown" ref={dropdownEl2}>
                  <input type="hidden" />

                  <div
                    className="dropdown__selected"
                    onClick={() => setShowDropdown2(!showDropdown2)}
                  >
                    {selectedMeasure ? (
                      <>
                        <FontAwesomeIcon
                          icon={faWeightScale}
                          className="icon-ssm blue mar-right-8"
                        />
                        {selectedMeasure}
                      </>
                    ) : (
                      "Please select one option"
                    )}
                  </div>
                </div>
                {showDropdown2 && (
                  <Dropdown
                    searchPlaceholder="pound"
                    search={measurementSearch}
                    searchChangeHandler={measureSearchChangeHandler}
                    selectedValue={selectedMeasure}
                    selectedIndex={selectedMeasureIndex}
                    changeSelectedHandler={changeSelectedMeasureHandler}
                    name="weight"
                    regions={measureOptions}
                  />
                )}
              </div>
              <div className="mar-bottom-8"></div>
              <div className="relative">
                <div className="dropdown" ref={dropdownEl}>
                  <input type="hidden" />

                  <div
                    className="dropdown__selected"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {selectedValue ? (
                      <>
                        <FontAwesomeIcon
                          icon={faCoins}
                          className="icon-ssm blue mar-right-8"
                        />
                        {selectedValue}
                      </>
                    ) : (
                      "Please select one option"
                    )}
                  </div>
                </div>
                {showDropdown && (
                  <Dropdown
                    searchPlaceholder="USD"
                    search={dollarSearch}
                    searchChangeHandler={searchChangeHandler}
                    selectedValue={selectedValue}
                    selectedIndex={selectedIndex}
                    changeSelectedHandler={changeSelectedHandler}
                    name="dollar"
                    regions={options}
                  />
                )}
              </div>
            </div>
            <div className="mar-bottom-8"></div>
            {productElems}
            <div className="mar-bottom-16"></div>
            <div className="blue-btn-one" onClick={addProduct}>
              <div className="flex align-center">
                <h5 className="mar-right-8">Add</h5>
                <FontAwesomeIcon icon={faPlus} className="icon-ssm white" />
              </div>
            </div>
          </div>

          <div className="input-line">
            <h4 className = 'text-shadow-red'>HOURS</h4>
            <div className="red-line mar-bottom-8"></div>
            <h5 className = 'black'>From</h5>
            <input
              {...register("hoursFrom", {
                required: false,
              })}
              type="time"
              name="hoursFrom"
              className="mar-bottom-8"
            />
            <h5 className = 'black'>To</h5>
            <input
              {...register("hoursTo", {
                required: false,
              })}
              type="time"
              name="hoursTo"
            />
          </div>

          <div className="input-line">
            <h4 className = 'text-shadow-red'>PICKUP OR DELIVERY?</h4>
            <div className="red-line mar-bottom-8"></div>
            <label htmlFor="pickupAndDelivery">
              <div className="flex align-center">
                <input
                  {...register("pickup", {
                    required: true,
                  })}
                  type="radio"
                  value="pickup & delivery"
                  id="pickupAndDelivery"
                />
                <p className="mar-left-4">Pickup & Delivery</p>
              </div>
            </label>

            <label htmlFor="pickupOnly">
              <div className="flex align-center">
                <input
                  {...register("pickup", {
                    required: true,
                  })}
                  type="radio"
                  id="pickupOnly"
                  value="pickup"
                />
                <p className="mar-left-4">
                  {" "}
                  <strong>Pickup</strong> Only
                </p>
              </div>
            </label>

            <label htmlFor="deliveryOnly">
              <div className="flex align-center">
                <input
                  {...register("pickup", {
                    required: true,
                  })}
                  type="radio"
                  id="deliveryOnly"
                  value="delivery"
                />
                <p className="mar-left-4">
                  {" "}
                  <strong>Delivery</strong> Only
                </p>
              </div>
            </label>

            <label htmlFor="unspecified">
              <div className="flex align-center">
                <input
                  {...register("pickup", {
                    required: true,
                  })}
                  type="radio"
                  id="unspecified"
                  value="unspecified"
                  defaultChecked
                />
                <p className="mar-left-4">Unspecified</p>
              </div>
            </label>
          </div>

          <div className="input-line">
            <h4 className ='text-shadow-red'>WEBSITE LINK</h4>
            <div className="red-line mar-bottom-8"></div>
            <input
              {...register("website", {
                required: false,
                pattern: {
                  value:
                    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                  message: "Must be a valid link starting with http/https",
                },
              })}
              type="text"
              placeholder="www.example.com"
              name="website"
            />
            {errors.website?.type === "pattern" && (
              <p className="error">*{errors.website.message}</p>
            )}
          </div>

          <div className="input-line">
            <h4 className ='text-shadow-red'>CONTACT INFO *</h4>
            <div className="red-line mar-bottom-8"></div>
            <p className="bold">Email</p>
            <input
              {...register("email", {
                required: false,
              })}
              type="email"
              placeholder="Email"
              name="email"
            />
            <div className="mar-bottom-16"></div>
            <p className="bold">Phone Number</p>
            <input
              {...register("number", {
                required: false,
              })}
              type="text"
              placeholder="(613) - 256 - 1919..."
              name="number"
            />
          </div>

          <div className="input-line">
            <h4 className = 'text-shadow-red'>UPLOAD IMAGE/S</h4>
              <div className="red-line mar-bottom-8"></div>
            
            <div onClick={() => imageRef.current.click()} className="image-upload-btn">
                  <h5 className="blue">UPLOAD</h5>
                  <FontAwesomeIcon icon={faUpload} className="icon-med blue" />
                </div>
            <input
              ref={imageRef}
              type="file"
              hidden={true}
              onChange={uploadImage}
            />
            <RenderImages
              setPhotoDisplayVisible={setPhotoDisplayVisible}
              images={images}
              updateSelectedImage={updateSelectedImage}
            />
          </div>

          <div className="optional-fields mar-bottom-16">

           <p>Optional</p> 
           <div className="flex mar-bottom-8 space-between flex-wrap">
           <h5 className="black">Product Specifications</h5>
           <p onClick = {()=>serviceRatingRef.current.scrollIntoView({ behavior: "smooth", block: "center" })} className="underline bold-hover ">Skip Section</p>
           
           </div>
           <div className="grey-line mar-bottom-16"></div>
           {optionalfieldElems}
           </div>

           <div className="optional-fields" ref = {serviceRatingRef}>

           <p>Optional</p> 
           <div className="flex mar-bottom-8 space-between flex-wrap">
           <h5 className="black" >Service Rating</h5>
           <p className="underline bold-hover" onClick = {()=>createButtonRef.current.scrollIntoView({ behavior: "smooth", block: "center" })}>Skip Section</p>
           </div>
           <div className="grey-line mar-bottom-16"></div>
           <div className="stars ">
              <StarReview
                field={reviewFields.pricing.name}
                stars={reviewFields.pricing.stars}
                updateStarsFunc={updateReviewFields}
              />
              <StarReview
                field={reviewFields.quality.name}
                stars={reviewFields.quality.stars}
                updateStarsFunc={updateReviewFields}
              />
              <StarReview
                field={reviewFields.friendly.name}
                stars={reviewFields.friendly.stars}
                updateStarsFunc={updateReviewFields}
              />
            </div>
           </div>
           {/*
            <div className="selects">
              <div className="radio-line">
                <h4 className="mar-bottom-8">GRASS FED?</h4>
                <div className="flex mar-bottom-8">
                  <label htmlFor="grassfed-true">
                    <div className="flex align-center mar-right-8">
                      <input
                        {...register("grassFed", {
                          required: false,
                        })}
                        type="radio"
                        value="true"
                        id="grassfed-true"
                      />
                      <p className="mar-left-4">Yes</p>
                    </div>
                  </label>

                  <label htmlFor="grassfed-false">
                    <div className="flex align-center">
                      <input
                        {...register("grassFed", {
                          required: false,
                        })}
                        type="radio"
                        id="grassfed-false"
                        value="false"
                      />
                      <p className="mar-left-4">No</p>
                    </div>
                  </label>
                </div>
                <label htmlFor="grassfed-unspecified">
                  <div className="flex align-center">
                    <input
                      {...register("grassFed", {
                        required: false,
                      })}
                      type="radio"
                      id="grassfed-unspecified"
                      value="unspecified"
                      defaultChecked
                    />
                    <p className="mar-left-4">Unspecified</p>
                  </div>
                </label>
              </div>

              <div className="radio-line">
                <h4 className="mar-bottom-8">ORGANIC?</h4>
                <div className="flex mar-bottom-8">
                  <label htmlFor="organic-true">
                    <div className="flex align-center mar-right-8">
                      <input
                        {...register("organic", {
                          required: false,
                        })}
                        type="radio"
                        value="true"
                        id="organic-true"
                      />
                      <p className="mar-left-4">Yes</p>
                    </div>
                  </label>

                  <label htmlFor="pickupOnly">
                    <div className="flex align-center">
                      <input
                        {...register("organic", {
                          required: false,
                        })}
                        type="radio"
                        id="organic-false"
                        value="false"
                      />
                      <p className="mar-left-4">No</p>
                    </div>
                  </label>
                </div>
                <label htmlFor="organic-unspecified">
                  <div className="flex align-center">
                    <input
                      {...register("organic", {
                        required: false,
                      })}
                      type="radio"
                      id="organic-unspecified"
                      value="unspecified"
                      defaultChecked
                    />
                    <p className="mar-left-4">
                      {" "}
                      <p>Unspecified</p>
                    </p>
                  </div>
                </label>
              </div>

              <div className="radio-line">
                <h4 className="mar-bottom-8">VACCINE FREE?</h4>
                <div className="flex mar-bottom-8">
                  <label htmlFor="vaccines-true">
                    <div className="flex align-center mar-right-8">
                      <input
                        {...register("vaccineFree", {
                          required: false,
                        })}
                        type="radio"
                        value="true"
                        id="vaccines-true"
                      />
                      <p className="mar-left-4">Yes</p>
                    </div>
                  </label>

                  <label htmlFor="pickupOnly">
                    <div className="flex align-center">
                      <input
                        {...register("vaccineFree", {
                          required: false,
                        })}
                        type="radio"
                        id="vaccines-false"
                        value="false"
                      />
                      <p className="mar-left-4">
                        {" "}
                        <p>No</p>
                      </p>
                    </div>
                  </label>
                </div>
                <label htmlFor="vaccines-unspecified">
                  <div className="flex align-center">
                    <input
                      {...register("vaccineFree", {
                        required: false,
                      })}
                      type="radio"
                      id="vaccines-unspecified"
                      value="unspecified"
                      defaultChecked
                    />
                    <p className="mar-left-4">Unspecified</p>
                  </div>
                </label>
              </div>

              <div className="radio-line">
                <h4 className="mar-bottom-8">PASTURE RAISED?</h4>
                <div className="flex mar-bottom-8">
                  <label htmlFor="pasture-raised-true">
                    <div className="flex align-center mar-right-8">
                      <input
                        {...register("pastureRaised", {
                          required: false,
                        })}
                        type="radio"
                        value="true"
                        id="pasture-raised-true"
                      />
                      <p className="mar-left-4">Yes</p>
                    </div>
                  </label>

                  <label htmlFor="pickupOnly">
                    <div className="flex align-center">
                      <input
                        {...register("pastureRaised", {
                          required: false,
                        })}
                        type="radio"
                        id="pasture-raised-false"
                        value="false"
                      />
                      <p className="mar-left-4">No</p>
                    </div>
                  </label>
                </div>
                <label htmlFor="pasture-raised-unspecified">
                  <div className="flex align-center">
                    <input
                      {...register("pastureRaised", {
                        required: false,
                      })}
                      type="radio"
                      id="pasture-raised-unspecified"
                      value="unspecified"
                      defaultChecked
                    />
                    <p className="mar-left-4">Unspecified</p>
                  </div>
                </label>
              </div>

              <div className="radio-line">
                <h4 className="mar-bottom-8">SOY FREE?</h4>
                <div className="flex mar-bottom-8">
                  <label htmlFor="soy-free-true">
                    <div className="flex align-center mar-right-8">
                      <input
                        {...register("soyFree", {
                          required: false,
                        })}
                        type="radio"
                        value="true"
                        id="soy-free-true"
                      />
                      <p className="mar-left-4">Yes</p>
                    </div>
                  </label>

                  <label htmlFor="soy-free-false">
                    <div className="flex align-center">
                      <input
                        {...register("soyFree", {
                          required: false,
                        })}
                        type="radio"
                        id="soy-free-false"
                        value="false"
                      />
                      <p className="mar-left-4">No</p>
                    </div>
                  </label>
                </div>
                <label htmlFor="soy-free-unspecified">
                  <div className="flex align-center">
                    <input
                      {...register("soyFree", {
                        required: false,
                      })}
                      type="radio"
                      id="soy-free-unspecified"
                      value="unspecified"
                      defaultChecked
                    />
                    <p className="mar-left-4">Unspecified</p>
                  </div>
                </label>
              </div>

              <div className="radio-line">
                <h4 className="mar-bottom-8">DEWORMER FREE?</h4>
                <div className="flex mar-bottom-8">
                  <label htmlFor="dewormers-true">
                    <div className="flex align-center mar-right-8">
                      <input
                        {...register("dewormerFree", {
                          required: false,
                        })}
                        type="radio"
                        value="true"
                        id="dewormers-true"
                      />
                      <p className="mar-left-4">Yes</p>
                    </div>
                  </label>

                  <label htmlFor="dewormers-false">
                    <div className="flex align-center">
                      <input
                        {...register("dewormerFree", {
                          required: false,
                        })}
                        type="radio"
                        id="dewormers-false"
                        value="false"
                      />
                      <p className="mar-left-4">No</p>
                    </div>
                  </label>
                </div>
                <label htmlFor="dewormers-unspecified">
                  <div className="flex align-center">
                    <input
                      {...register("dewormerFree", {
                        required: false,
                      })}
                      type="radio"
                      id="dewormers-unspecified"
                      value="unspecified"
                      defaultChecked
                    />
                    <p className="mar-left-4">Unspecified</p>
                  </div>
                </label>
              </div>

              <div className="radio-line">
                <h4 className="mar-bottom-8">UNFROZEN?</h4>
                <div className="flex mar-bottom-8">
                  <label htmlFor="unfrozen-true">
                    <div className="flex align-center mar-right-8">
                      <input
                        {...register("unfrozen", {
                          required: false,
                        })}
                        type="radio"
                        value="true"
                        id="unfrozen-true"
                      />
                      <p className="mar-left-4">Yes</p>
                    </div>
                  </label>

                  <label htmlFor="pickupOnly">
                    <div className="flex align-center">
                      <input
                        {...register("unfrozen", {
                          required: false,
                        })}
                        type="radio"
                        id="unfrozen-false"
                        value="false"
                      />
                      <p className="mar-left-4">No</p>
                    </div>
                  </label>
                </div>
                <label htmlFor="unfrozen-unspecified">
                  <div className="flex align-center">
                    <input
                      {...register("unfrozen", {
                        required: false,
                      })}
                      type="radio"
                      id="unfrozen-unspecified"
                      value="unspecified"
                      defaultChecked
                    />
                    <p className="mar-left-4">Unspecified</p>
                  </div>
                </label>
              </div>
            </div>
                    */}
           
          
          <div className="mar-bottom-32"></div>
          <button
            style={{ display: "flex", width: "100%" }}
            type="submit"
            className="align-center justify-center blue-btn-one box-shadow-2 mar-bottom-32"
          >
            <h3 className="mar-right-8" ref = {createButtonRef}>Create</h3>
            <FontAwesomeIcon icon={faLocationDot} className="white icon-med" />
          </button>
        </form>
      )}
    </Cont>
  );
};

export default Bottombar;

export const PlacesAutocomplete = ({
  setSelected,
  location,
  setLocation,
  setAddress,
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  useEffect(() => {
    setValue(location);
  }, [location]);

  const handleSelect = async (address) => {
    setValue(address.description);
    setLocation(address.description);
    const results = await getGeocode({ address: address.description });
    const { lat, lng } = await getLatLng(results[0]);

    const addressSplit = address.description.split(",");
    const street = addressSplit[0];
    const country = addressSplit[addressSplit.length - 1];
    const state = addressSplit[addressSplit.length - 2];
    setAddress((prev) => {
      return {
        ...prev,
        fullAddress: address.description,
        lat,
        lng,
        street,
        state,
        country,
      };
    });
    setTimeout(() => {
      clearSuggestions();
    }, 200);

    //const results = await getGeocode({ address: description });
    //const { lat, lng } = await getLatLng(results[0]);

    //setSelected({ lat, lng });
  };

  return (
    <div className="mar-bottom-32">
      <p className="italic mar-bottom-4">Select from the dropdown</p>
      <input
        value={value}
        type="text"
        placeholder="Search an address"
        onChange={(e) => setValue(e.target.value)}
        id="address-input"
      />
      <ul className="google-dropdown">
        {data.map((address, index) => {
          return (
            <li key={index} onClick={() => handleSelect(address)}>
              <p>{address.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
