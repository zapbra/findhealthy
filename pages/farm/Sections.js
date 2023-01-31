import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  .section-holder {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .section {
    width: 100%;
    display: flex;
    padding: 32px;
    background-color: #fff;
    &:nth-of-type(2) {
      background-color: ${(props) => props.colors.lightBeige};
    }
  }
`;

const Sections = ({
  products,
  description,
  address,
  website,
  email,
  phone,
  delivery,
  hours,
  howToOrder,
  grassFed,
  organic,
  vaccineFree,
  soyFree,
  pastureRaised,
  dewormerFree,
  unfrozen,
  pricing,
  quality,
  friendly,
}) => {
  return (
    <Cont colors={COLORS}>
      <section className="section">
        <div className="center-inline">
          <h3>PRODUCTS</h3>
        </div>
      </section>
      <section className="section"></section>
      <section className="section"></section>
      <section className="section"></section>
    </Cont>
  );
};

export default Sections;
