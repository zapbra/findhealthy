import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  display: inline-block;
`;
const Products = () => {
  return (
    <Cont colors={COLORS}>
      <h5 className="mar-bottom-16">PRODUCTS</h5>
      <div className="tan-container flex flex-wrap justify-center"></div>
    </Cont>
  );
};

export default Products;
