import { useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Select from "../google/Select";
import QUANTITIES from "../../data/Quantities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPrint,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
const DownloadNutrients = dynamic(
  () => import("../buttons/DownloadNutrients"),
  { ssr: false }
);
const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  .dropdown {
    border: none;
    &__menu {
      border: 1px solid ${(props) => props.colors.grey};
    }
    &__menu_search {
      border: 1px solid ${(props) => props.colors.darkBlue};
    }
  }
  .dropdown__selected {
    border: 1px solid ${(props) => props.colors.grey};
    border-radius: 8px;
    &:hover {
      border: 1px solid ${(props) => props.colors.black};
    }
  }
  .small-scrollbar {
    ::-webkit-scrollbar {
      background: ${(props) => props.colors.offWhite};
    }
    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.colors.darkBlue};
      &:hover {
        background: ${(props) => props.colors.lightBlue};
      }
    }
  }
`;
const NutrientTopSection = ({
  name,
  allFish,
  fish,
  quantity,
  setQuantity,
  nutrientObject,
  reFetchFish
}) => {
  const [quantities, setQuantities] = useState([`${quantity} `, ...QUANTITIES]);
  const [fishNames, setFishNames] = useState(
    allFish.map((fish) => {
      return fish.name;
    })
  );
  const [fishNamesCopy, setFishNamesCopy] = useState(
    allFish.map((fish) => {
      return fish.name;
    })
  );

  const [value, setValue] = useState(name);

  const updateValue = (val) => {
    setValue(val);
    reFetchFish(val);
  }
  return (
    <Cont colors={COLORS} className="mar-bottom-32">
      <div className="flex flex-wrap">
        <div className="flex  mar-bottom-16 mar-right-16">
          <div className="icon-button">
            <p className="bold">Save</p>
            <FontAwesomeIcon icon={faHeart} className="icon-ssm" />
          </div>
        </div>

        <div
          onClick={() => window.print()}
          className="flex mar-bottom-16 mar-right-16"
        >
          <div className="icon-button">
            <p className="bold">Print</p>
            <FontAwesomeIcon icon={faPrint} className="icon-ssm" />
          </div>
        </div>
        <div className="flex mar-bottom-16">
          <DownloadNutrients
            fish={fish}
            nutrientObject={nutrientObject}
            quantity={quantity}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-column mar-right-16">
          <h5 className="contrast light mar-bottom-4">FOOD</h5>

          <Select
            regions={fishNames}
            name="fish"
            value={value}
            updateValue={updateValue}
            options={fishNamesCopy}
            setOptions={setFishNamesCopy}
          />
        </div>

        <div className="flex flex-column">
          <h5 className="contrast light mar-bottom-4">QTY</h5>

          <Select
            regions={QUANTITIES}
            name="quantity"
            value={quantity}
            updateValue={setQuantity}
            options={quantities}
            setOptions={setQuantities}
          />
        </div>
      </div>
    </Cont>
  );
};

export default NutrientTopSection;
