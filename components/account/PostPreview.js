import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Location from "./Location";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  background-color: ${(props) => props.colors.lightWhite};
  border-radius: 8px;
  padding: 8px 12px;
`;
const PostPreview = ({ title, locations }) => {
  const locationElems = locations.map((location, index) => {
    return (
      <Location
        key={index}
        name={location.name}
        address={location.address[0].full_address}
        tags={location.tags}
        url={location.images.length > 0 ? location.images[0].url : null}
        description={location.description}
      />
    );
  });
  return (
    <Cont colors={COLORS}>
      <h4 className="blue mar-bottom-16">{title}</h4>
      {locationElems}
    </Cont>
  );
};

export default PostPreview;
