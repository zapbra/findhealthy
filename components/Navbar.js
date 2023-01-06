import Link from "next/link";
import React from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding: 16px 32px 8px 32px;
  position: relative;
  overflow: hidden;
  .grid-cont {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .splitter {
    width: 24px;
    height: 230%;
    background: ${(props) => props.colors.darkPink};
    margin-right: 8px;
    position: relative;
    top: 40px;
    transform: rotate(30deg);
  }
  .splitter-blue {
    width: 24px;
    height: 230%;
    background: ${(props) => props.colors.darkBlue};
    margin-right: 16px;
    position: relative;
    top: 40px;
    transform: rotate(30deg);
  }
  .nav-section {
    display: flex;
    align-items: flex-end;
    height: 80px;
    h4 {
      align-self: center;
    }
  }
  .food-section {
    padding-right: 40px;
  }
`;
const Navbar = () => {
  return (
    <Cont colors={COLORS}>
      <Link href="/">
        <h5>FINDHEALTHY</h5>
      </Link>

      <div className="grid-cont">
        <div className="nav-section food-section">
          <h4 className=" mar-right-32">FOOD MAP</h4>
          <h5 className="mar-right-16">MAP</h5>
          <h5>FORUM</h5>
        </div>

        <div className="nav-section">
          <div className="splitter"></div>
          <div className="splitter-blue"></div>
          <h4 className="blue mar-right-32"> FISH FINDER</h4>
          <h5 className="blue mar-right-16">MAP</h5>
          <h5 className="blue mar-right-16">ARTICLES</h5>
          <h5 className="blue mar-right-16">DATA SEARCH</h5>
        </div>
      </div>
    </Cont>
  );
};

export default Navbar;
