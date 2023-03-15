import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Farm from "./Farm";
const Cont = styled.div`
  @media only screen and (max-width: 550px) {
    justify-content: center;
  }
`;
const Results = ({ locations }) => {
  console.log(locations);
  const [locationElems, setLocationElems] = useState(
    locations.map((location, index) => {
      return (
        <Farm
          key={index}
          name={location.name}
          address={location.address[0].full_address}
          created_at={location.created_at}
          icon={location.icon}
          tags={location.tags}
          pickup={location.pickup}
          pricing={location.pricing}
          quality={location.quality}
          image={location.images[0]?.url}
        />
      );
    })
  );
  return (
    <Cont
      colors={COLORS}
      className="tan-container flex flex-wrap space-between"
    >
      {locationElems}
    </Cont>
  );
};

export default Results;
