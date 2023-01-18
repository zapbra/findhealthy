import { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const MarkerComponent = ({
  latLong,
  name,
  description,
  email,
  number,
  website,
  pickup,
  address,
  hoursFrom,
  hoursTo,
}) => {
  const [open, setOpen] = useState(false);
  const catche = (e) => {
    console.log(e);
  };
  console.log(latLong);
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
      label={name}
      onClick={() => setOpen(true)}
    >
      {open && (
        <InfoWindow onCloseClick={() => setOpen(false)}>
          <div className="info-box">
            <h5 className="underline">{name}</h5>
            <p className="info-box-description">{description}</p>
            <div className="flex">
              <div
                style={{ borderRight: "1px solid black" }}
                className="mar-right-8 pad-right-8"
              >
                <p className="bold underline">Email:</p>
                <a href={`mailto:${email}`}>
                  <p>{email}</p>{" "}
                </a>
              </div>
              <div>
                <p className="bold underline">Phone:</p>
                <a href={`tel:${number}`}>
                  <p>{number}</p>
                </a>
              </div>
            </div>
            <p className="bold underline">Website:</p>
            <Link href={website}>
              <p>{website}</p>
            </Link>
            <p className="bold underline">Pickup or delivery?</p>
            <p>{pickup}</p>
            <p className="bold underline">Address:</p>
            <p>{address}</p>
            <p className="bold underline">Hours:</p>
            <div className="flex">
              <div
                style={{ borderRight: "1px solid black" }}
                className="mar-right-8 pad-right-8"
              >
                <p className="bold">Opens</p>
                <p>
                  {new Date("1970-01-01T" + hoursFrom + "Z").toLocaleTimeString(
                    "en-US",
                    {
                      timeZone: "UTC",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </p>
              </div>
              <div>
                <p className="bold">Closes</p>
                <p>
                  {new Date("1970-01-01T" + hoursTo + "Z").toLocaleTimeString(
                    "en-US",
                    {
                      timeZone: "UTC",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
            <div className="mar-bottom-16"></div>
            <div className="blue-btn-one">
              <div className="flex align-center">
                <h5 className="mar-right-8">EXPAND</h5>
                <FontAwesomeIcon icon={faExpand} className="icon-sm blue" />
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default MarkerComponent;
