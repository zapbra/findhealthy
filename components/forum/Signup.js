import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import supabase from "../../utils/supabaseClient";

const Cont = styled.div``;
const Header = () => {
  return <Cont colors={COLORS}>h3</Cont>;
};

export default Header;
