import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";

const Cont = styled.div`
  display: flex;
  background-color: ${(props) => props.colors.tan};
  position: relative;
  overflow: hidden;
  flex-direction: row;
  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
  section {
    padding: 16px 32px;
  }
  .right {
    text-align: right;
    background-color: ${(props) => props.colors.offWhite};
  }
  .rect {
    height: 120%;
    width: 80px;
    transform: rotate(20deg);
    position: absolute;
    left: calc(50% - 40px);
    background-color: ${(props) => props.colors.offWhite};
  }
`;

const Footer = () => {
  return (
    <Cont colors={COLORS}>
      <div className="rect hide-400"></div>
      <section className="left flex-one">
        <Link href="/">
          <h4 className="underline-hover">FOOD MAP</h4>
        </Link>
        <Link href="/">
          <h5 className="light underline-hover">MAP</h5>
        </Link>
        <Link href="/forum">
          <h5 className="light underline-hover">FORUM</h5>
        </Link>
      </section>

      <section className="right flex-one flex space-between">
        <div></div>
        <div>
          <Link href="/">
            <h4 className="underline-hover blue">FISH</h4>
          </Link>
          <Link href="/">
            <h5 className="light underline-hover blue">MAP</h5>
          </Link>
          <Link href="/forum">
            <h5 className="light underline-hover blue">ARTICLES</h5>
          </Link>
          <Link href="/forum">
            <h5 className="light underline-hover blue">DATA SEARCH</h5>
          </Link>
        </div>
      </section>
    </Cont>
  );
};

export default Footer;
