import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faEye } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";

const Cont = styled.div`
  .tags-holder {
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.colors.grey};
    padding: 4px;
    border-radius: 8px 8px 0 0;
    margin-bottom: 8px;
  }
  .field-line {
    margin-bottom: 8px;
  }
`;
const MarkerComponent = ({
  latLong,
  name,
  description,
  email,
  number,
  website = null,
  pickup,
  address,
  hoursFrom,
  hoursTo,
  tags,
  products,
}) => {
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
      label={name}
      onClick={() => setOpen(true)}
    >
      {open && (
        <InfoWindow onCloseClick={() => setOpen(false)}>
          <Cont colors={COLORS} className="info-box">
            <div className="tags-holder">
              <p style={{ backgroundColor: "#CCE729" }} className="tag-four">
                {tags[0]}
              </p>

              <p style={{ backgroundColor: "#DF5F28" }} className="tag-four">
                {tags[1]}
              </p>

              <p style={{ backgroundColor: "#3BAC46" }} className="tag-four">
                {tags[2]}
              </p>

              <p style={{ backgroundColor: "#DF5F28" }} className="tag-four">
                {tags[3]}
              </p>
            </div>
            <Link href={{
              pathname: `/farm/${name}`,
              query: {
                title: name
              }
            }}>
            <div className="blue-btn-one flex justify-center align-center mar-bottom-16">
              <h5 className="mar-right-8">VIEW</h5>
              <FontAwesomeIcon icon={faEye} className="icon-sm blue" />
            </div>
            </Link>
            <div className="field-line">
              <h5>Name</h5>
              <div className="red-line mar-bottom-4"></div>
              <p className="bold">{name}</p>
            </div>

            <div className="field-line">
              <h5>Address</h5>
              <div className="red-line mar-bottom-4"></div>
              <p className="bold">{address}</p>
            </div>
          { website != null && (
            <div className="field-line">
              <h5>Website</h5>
              <div className="red-line mar-bottom-4"></div>
              <a href={website}>
                <p className="bold ">{website}</p>
              </a>
            </div>
        )
          }

            <div className="field-line">
              <h5>Description</h5>
              <p className="info-box-description">{description}</p>
            </div>

            <div className="field-line">
              <h5>Products</h5>
              <div className="red-line mar-bottom-4"></div>
              <ul>
                {products.map((product) => {
                  return (
                    <li className="product">
                      <h5 className="black">{product.name}</h5>
                      <div className="price">
                        <p>
                          ${product.price}/{product.measurement}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex field-line">
              {email != null && (
              <div
                style={{ borderRight: "1px solid black" }}
                className="mar-right-8 pad-right-8 flex-one"
              >
                <h5 className="bold">Email:</h5>
                <div className="red-line mar-bottom-4"></div>
                <a href={`mailto:${email}`}>
                  <p className="bold">{email}</p>{" "}
                </a>
              </div>
              )}
              {number != null && (
              <div className = 'flex-one'>
                <h5>Phone:</h5>
                <div className="red-line mar-bottom-4"></div>
                <a href={`tel:${number}`}>
                  <p className="bold">{number}</p>
                </a>
              </div>
              )}
            </div>
            <div className="field-line">
              <h5>Pickup or delivery?</h5>
              <div className="red-line mar-bottom-04"></div>
              <p className="bold">{pickup}</p>
            </div>

            <h5>Hours</h5>
            <div className="red-line mar-bottom-4"></div>
            <div className="flex">
              <div
                style={{ borderRight: "1px solid black" }}
                className="mar-right-8 pad-right-8 flex-one"
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
              <div className = 'flex-one'>
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
            <Link href={{
              pathname: `/farm/${name}`,
              query: {
                title: name
              }
            }}>
              <div className="blue-btn-one flex justify-center align-center mar-bottom-16">
                <h5 className="mar-right-8">VIEW</h5>
                <FontAwesomeIcon icon={faEye} className="icon-sm blue" />
              </div>
            </Link>
          </Cont>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default MarkerComponent;
