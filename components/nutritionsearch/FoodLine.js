import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faAppleWhole,
  faFish,
  faDrumstickBite,
  faBacon,
  faWheatAwn,
  faGlassWater,
  faCow,
  faDragon,
} from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  padding: 4px 8px;
  border-bottom: 1px solid ${(props) => props.colors.grey};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.colors.offWhite2};
    .grey {
      color: ${(props) => props.colors.black};
    }
  }
  &:nth-of-type(1) {
    border-radius: 8px 8px 0 0;
  }
`;

const FoodLine = ({ name, category, id }) => {
  const [iconObj, setIconObj] = useState({
    Beef: faCow,
    "Dairy and Eggs": faGlassWater,
    Fish: faFish,
    Poultry: faDrumstickBite,
    "Lamb, Veal and Game": faDragon,
    Pork: faBacon,
    "Fruits and Fruit Juices": faAppleWhole,
    "Grains and Starches": faWheatAwn,
  });

  return (
    <Link
      href={{
        pathname: `/food/${name}`,
      }}
    >
      <Cont colors={COLORS} className="flex space-between align-center">
        <div className="flex-inline align-center">
          <p className="mar-right-32">{name}</p>

          <FontAwesomeIcon icon={iconObj[category]} className="grey icon-ssm" />
        </div>

        <FontAwesomeIcon icon={faArrowRight} className="grey icon-ssm" />
      </Cont>
    </Link>
  );
};

export default FoodLine;
