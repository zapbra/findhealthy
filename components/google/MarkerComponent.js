import { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

const MarkerComponent = ({ latLong, title, textContent }) => {
  const [open, setOpen] = useState(false);
  const catche = (e) => {
    console.log(e);
  };
  return (
    <Marker
      icon={{
        path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
        fillColor: "yellow",
        fillOpacity: 0.9,
        scale: 2,
        strokeColor: "gold",
        strokeWeight: 2,
      }}
      position={latLong}
      label={title}
      onClick={() => setOpen(true)}
    >
      {open && (
        <InfoWindow onCloseClick={() => setOpen(false)}>
          <span>{textContent}</span>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default MarkerComponent;
