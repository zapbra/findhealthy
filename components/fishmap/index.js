import styled from "styled-components";
import { GoogleMap, useJsApiLoader, Circle } from "@react-google-maps/api";
import { useState, useCallback, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import latCountryCodes from "../../data/latCountryCodes.json";
import { fetchOceans } from "../../utils/supabaseFunctions";
const Cont = styled.div`
  min-height: 100vh;
  .google-holder {
    display: flex;
    @media only screen and (max-width: 800px) {
      flex-direction: column-reverse;
    }
  }
`;

const containerStyle = {
  width: "100%",
  height: "75vh",
};

const options = {
  imagePath:
    "'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
};

function createKey(location) {
  return location.lat + location.lng;
}
const Index = ({}) => {
  const [oceans, setOceans] = useState([]);
  const circleRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({
    lat: 34.621,
    lng: -41.166,
  });

  const [oceanElems, setOceanElems] = useState(
    oceans.map((ocean) => {
      return (
        <Circle
          center={{
            lat: ocean.lat,
            lng: ocean.lng,
          }}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.2,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: ocean.radius,
            zIndex: 1,
          }}
        />
      );
    })
  );

  const [coords, setCoords] = useState(null);
  /*
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);


  */
  const [adding, setAdding] = useState(false);

  const startAdding = () => {
    setAdding(true);
  };

  const stopAdding = () => {
    setAdding(false);
  };

  const updateCoords = (position) => {
    window.localStorage.setItem(
      "position",
      JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
    setCenter((prev) => {
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  };
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    const fetchOceanFunc = async () => {
      const oceansFetch = await fetchOceans();
      console.log(oceansFetch);
      setOceans(oceansFetch);
    };
    fetchOceanFunc();
  }, []);

  //const isLoaded = true;
  const isLoaded = true;
  return isLoaded ? (
    <Cont>
      <Toaster />

      <div className="google-holder">
        {/*
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={(e) => adding && addMarker(e)}
          options={{ gestureHandling: "greedy" }}
        >
          <Circle visible = {false} center={center} options={options} ref={circleRef} /> 

          {markers}
        </GoogleMap> */}
      </div>

      <div className="lg-spacer"></div>
    </Cont>
  ) : (
    <> </>
  );
};

export default Index;
