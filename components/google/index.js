import styled from "styled-components";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Bottombar from "./Bottombar";
import MarkerComponent from "./MarkerComponent";
import Alert from "../popups/alert";
import { useState, useCallback } from "react";

const Cont = styled.div`
  min-height: 100vh;
`;

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const center = {
  lat: 43.65107,
  lng: -79.347015,
};

const options = {
  imagePath:
    "'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
};

function createKey(location) {
  return location.lat + location.lng;
}
const index = () => {
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([
    {
      coords: { lat: 43.65107, lng: -79.347015 },
      title: "fish",
      textContent: (
        <>
          <h3>Titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</h3>
          <p>text content</p>{" "}
        </>
      ),
    },
    {
      coords: { lat: 43.67107, lng: -79.347015 },
      title: "beef",
      textContent: "This is epic text content bruh",
    },
    {
      coords: { lat: 43.67107, lng: -79.3 },
      title: "chicken",
      textContent: "This is epic text content bruh",
    },
    {
      coords: { lat: 46.4, lng: -79.5 },
      title: "socks",
      textContent: "This is epic text content bruh",
    },
    {
      coords: { lat: 45.3, lng: -78.3 },
      title: "finger",
      textContent: "This is epic text content bruh",
    },
    {
      coords: { lat: 41.12, lng: -79.2 },
      title: "toenails",
      textContent: "This is epic text content bruh",
    },
  ]);

  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const updateLocation = (value) => {
    setLocation(value);
  }

  const markers = locations.map((location, index) => {
    return (
      <MarkerComponent
        key={index}
        latLong={location.coords}
        title={location.title}
        textContent={location.textContent}
      />
    );
  });
  const addMarker = async (e) => {
    //stopAdding();
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&key=${
        process.env.NEXT_PUBLIC_GOOGLE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.results[0].formatted_address);
      });
    /*
    setLocations((prev) => {
      return [
        ...prev,
        {
          coords: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          title: "beef",
          textContent: "words",
        },
      ];
    });
    */
  };

  const [adding, setAdding] = useState(false);

  const startAdding = () => {
    setAdding(true);
  };

  const stopAdding = () => {
    setAdding(false);
  };

  return isLoaded ? (
    <Cont>
      {adding && <Alert />}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => adding && addMarker(e)}
      >
        {markers}
      </GoogleMap>
      <button onClick={addMarker}>add marker</button>
      <Bottombar
        adding={adding}
        startAdding={startAdding}
        stopAdding={stopAdding}
        location={location}
        setLocation = {updateLocation}
      />
    </Cont>
  ) : (
    <> </>
  );
};

export default index;
