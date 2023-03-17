import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Signup from "./Signup";

const Cont = styled.div``;
const Header = () => {
  return (
    <Cont colors={COLORS}>
      <h3 className="underline text-shadow-red mar-bottom-16">
        FOOD SOURCING FORUM
      </h3>
      <p>Do you need an account?</p>
      <p>Please login or register</p>
    </Cont>
  );
};

export default Header;
