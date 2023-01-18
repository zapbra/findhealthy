import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faPlus,
  faLocationDot,
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
  fetchCountryByName,
} from "../../utils/supabaseFunctions";
import CreateTag from "../inputs/CreateTag";
const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding: 16px;
  .fake-form {
    max-width: 600px;
    margin: 0 auto;
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
}) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  console.log(tagsFetch);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [farm, setFarm] = useState({});
  const [imageLinks, setImageLinks] = useState([]);
  const [address, setAddress] = useState({
    fullAddress: "",
    street: "",
    state: "",
    country: "",
    lat: "",
    lng: "",
  });

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

  const uploadImages = async () => {
    /*
    images.forEach((image, index) => {
      formData.append(`image`, image);
    });*/
    //formData.append("image", images[0]);

    const formData = new FormData();
    formData.append("image", images[0]);
    try {
      const response = await fetch("https://api.imgur.com/3/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_ID}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const clearForm = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("hoursFrom", "");
    setValue("hoursTo", "");
    setValue("pickup", "unspecified");
    setValue("website", "");
    setValue("email", "");
    setValue("number", "");
    setImages([]);
    setLocation("");
  };

  const finalizeLocation = () => {
    clearForm();
  };

  const submitForm = handleSubmit(async (formData) => {
    alert("k");

    const numberOrganize = formData.number.replaceAll(/[^0-9]/g, "").split("");
    numberOrganize.unshift("(");
    numberOrganize.splice(4, 0, ")");
    numberOrganize.splice(5, 0, "-");
    numberOrganize.splice(9, 0, "-");

    const locationId = await createLocation(
      formData.name,
      formData.description,
      images,
      formData.hoursFrom,
      formData.hoursTo,
      formData.pickup,
      formData.website,
      formData.email,
      numberOrganize.join("")
    );
    createAddress(
      locationId,
      address.fullAddress,
      address.street,
      address.lat,
      address.lng,
      address.country,
      address.state
    ).then((res) => finalizeLocation());
    //uploadImages();
  });

  return (
    <Cont colors={COLORS}>
      <button
        disabled={adding}
        onClick={startAdding}
        className="blue-btn-one box-shadow-2 mar-bottom-8 mar-right-8"
      >
        <h4>ADD NEW LOCATION</h4>
      </button>
      {adding && (
        <button
          onClick={stopAdding}
          className="red-btn-one box-shadow-2 flex-inline  align-center"
        >
          <h4 className="mar-right-8">CANCEL</h4>
          <FontAwesomeIcon icon={faClose} className="icon-sm red" />
        </button>
      )}
      <div className="mar-bottom-16"></div>
      <br />
      {adding && (
        <div className=" fake-form opacity-anim" onSubmit={submitForm}>
          <PlacesAutocomplete
            location={location}
            setLocation={setLocation}
            setAddress={setAddress}
          />
          <div className="input-line">
            <div className="input-line">
              <h4>PRODUCT TYPES *</h4>
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
            <h4>BUSINESS NAME *</h4>
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
            <h4>DESCRIPTION *</h4>
            <p className="italic">What do they sell?</p>
            <p className="italic">How are their prices?</p>
            <p className="italic">What was your experience?</p>
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
            <h4>HOURS</h4>
            <h5>From</h5>
            <input
              {...register("hoursFrom", {
                required: false,
              })}
              type="time"
              name="hoursFrom"
              className="mar-bottom-8"
            />
            <h5>To</h5>
            <input
              {...register("hoursTo", {
                required: false,
              })}
              type="time"
              name="hoursTo"
            />
          </div>

          <div className="input-line">
            <h4>PICKUP OR DELIVERY?</h4>

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
            <h4>WEBSITE LINK</h4>
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
            <h4>CONTACT INFO *</h4>
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
            <h4>UPLOAD IMAGE/S</h4>
            <div
              className="inline-block"
              onClick={() => imageRef.current.click()}
            >
              <ImageUpload />
            </div>
            <input
              ref={imageRef}
              type="file"
              hidden={true}
              onChange={uploadImage}
            />
            <RenderImages images={images} />
          </div>

          <button type="submit" className="blue-btn-one box-shadow-2">
            <div className="flex align-center">
              <h3 className="mar-right-8">Create</h3>
              <FontAwesomeIcon icon={faLocationDot} className="blue icon-med" />
            </div>
          </button>
        </div>
      )}
    </Cont>
  );
};

export default Bottombar;

const PlacesAutocomplete = ({
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

    clearSuggestions();
    //const results = await getGeocode({ address: description });
    //const { lat, lng } = await getLatLng(results[0]);

    //setSelected({ lat, lng });
  };

  return (
    <div className="mar-bottom-32">
      <h4>ENTER AN ADDRESS *</h4>
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
