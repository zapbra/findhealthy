import { useEffect, useState } from "react";
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
  const iteration = 10;
  const [renderCount, setRenderCount] = useState(10);
  const [locationElems, setLocationElems] = useState(
    locations.map((location, index) => {
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
    })
  );
  useEffect(() => {
    setLocationElems((prev) => {
      return locations.map((location, index) => {
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
    });
  }, [locations]);

  const [renderElems, setRenderElems] = useState([]);
  useEffect(() => {
    const elems = [];
    for (let i = 0; i < iteration; i++) {
      elems.push(locationElems[i]);
    }
    setRenderElems(elems);
  }, [locationElems]);
  console.log(locations);
  return (
    <Cont colors={COLORS}>
      <h4 className="blue mar-bottom-16">{title}</h4>
      {renderElems}
    </Cont>
  );
};

export default PostPreview;
