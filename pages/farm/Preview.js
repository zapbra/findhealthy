import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  .hero-image-section {
    display: grid;
    border-bottom: 1px solid ${(props) => props.colors.darkPink};
    grid-template-columns: 3fr 1fr;
    img {
      width: 100%;
      display: block;
    }
  }
  .image-holder {
    position: relative;
    max-height: 600px;
    border-right: 1px solid ${(props) => props.colors.darkPink};
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  .image-selectors {
    display: grid;
    max-height: 600px;
  }
  .image-select {
    position: relative;
    overflow: hidden;
    opacity: 0.6;
    cursor: pointer;
    img {
      object-fit: cover;
      height: 100%;
    }
  }
  .selected-image {
    opacity: 1;
    cursor: default;
    border: 2px solid ${(props) => props.colors.darkPink};
  }
`;

const Preview = () => {
  return (
    <Cont colors={COLORS}>
      <div className="hero-image-section">
        <div className="image-holder">
          <img src="/images/steak.jpg" />
        </div>

        <div className="image-selectors">
          <div className="image-select selected-image">
            <img src="/images/steak.jpg" />
          </div>

          <div className="image-select">
            <img src="/images/eggs.jpg" />
          </div>

          <div className="image-select">
            <img src="/images/farm.jpg" />
          </div>

          <div className="image-select">
            <img src="/images/milk.jpg" />
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default Preview;
