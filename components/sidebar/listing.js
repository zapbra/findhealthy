import styled from "styled-components";
import COLORS from "../../data/colors";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  background: #fff;
  border: 1px solid ${(props) => props.colors.grey};
  padding: 8px;
  margin-bottom: 16px;
  .image-holder {
    width: 100%;
    height: 200px;
    position: relative;
  }
`;
const Listing = ({
  name,
  address,
  created_at,
  icon,
  tags,
  pickup,
  pricing,
  quality,
  friendly,
  image = null,
}) => {
  const [starFields, setStarFields] = useState(
    [
      { name: "Pricing", value: pricing },
      { name: "Quality", value: quality },
      { name: "Friendly", value: friendly },
    ].map((field, index) => {
      return (
        <div key={index} className="star-holder mar-bottom-8">
          <p className="black mar-bottom-4">{field.name}</p>
          <div className="star-holder">
            {[1, 2, 3, 4, 5].map((index, realIndex) => {
              return (
                <FontAwesomeIcon
                  key={realIndex}
                  icon={faStar}
                  className={
                    index <= field.value ? "icon-ssm yellow" : "icon-ssm black"
                  }
                />
              );
            })}
          </div>
        </div>
      );
    })
  );
  return (
    <Cont colors={COLORS}>
      {image !== null && (
        <div className="image-holder">
          <Image
            src={image}
            style={{ objectFit: "cover" }}
            quality="100"
            fill
          />
        </div>
      )}
      <p className="contrast">{new Date(created_at).toDateString()} </p>
      <h5 className="black">{name}</h5>
      <p className="light black">{address}</p>
      <p className="black">{pickup}</p>
      {starFields}
    </Cont>
  );
};

export default Listing;
