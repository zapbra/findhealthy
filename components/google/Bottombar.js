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
const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding: 16px;
  form {
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
}) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([]);
  const [tags, setTags] = useState(["milk", "butter", "eggs", "cheese"]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [farm, setFarm] = useState({});
  const [imageLinks, setImageLinks] = useState([]);
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
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    setImages((prev) => {
      return [...prev, event.target.files[0]];
    });
  };

  const uploadImages = async () => {
    const formData = new FormData();

    /*
    images.forEach((image, index) => {
      formData.append(`image`, image);
    });*/
    //formData.append("image", images[0]);
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
  const submitForm = handleSubmit(async (formData) => {
    alert("k");
    setFarm({
      address: location,
      products: tags,
      name: formData.name,
      description: formData.description,
      hours: { from: formData.hoursFrom, to: formData.hoursTo },
      images: images,
    });
    uploadImages();
  });

  useEffect(() => {}, [farm]);
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
          className="red-btn-one box-shadow-2 flex-inline align-center"
        >
          <h4 className="mar-right-8">CANCEL</h4>
          <FontAwesomeIcon icon={faClose} className="icon-sm red" />
        </button>
      )}
      <div className="mar-bottom-16"></div>
      <br />
      {adding && (
        <form className="opacity-anim" onSubmit={submitForm}>
          <PlacesAutocomplete location={location} setLocation={setLocation} />
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
        </form>
      )}
    </Cont>
  );
};

export default Bottombar;

const PlacesAutocomplete = ({ setSelected, location, setLocation }) => {
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
