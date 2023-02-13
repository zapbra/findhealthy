import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faLocationDot,
  faEgg,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import Searchbar from "../search/Searchbar";
import { PlacesAutocomplete } from "./Bottombar";

const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  flex-shrink: 0;
  width: 300px;
  padding: 8px;
  border-top: 2px solid ${(props) => props.colors.darkPink};
  border-bottom: 2px solid ${(props) => props.colors.darkPink};

  @media only screen and (max-width: 900px) {
    width: 200px;
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
    .input-line {
      max-width: 200px;
      margin-bottom: 16px;
    }
   
   
  }

 
`;

const Sidebar = ({
  locations,
}) => {
  console.log('locations');
  console.log(locations)
  return (
    <Cont colors={COLORS}>
     
    </Cont>
  );
};

export default Sidebar;
