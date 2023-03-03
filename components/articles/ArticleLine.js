import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  display: flex;
  margin-bottom: 32px;
  cursor: pointer;
  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
  &:hover {
    img {
      opacity: 0.8;
    }
    h5 {
      text-decoration: underline;
    }
  }
  .img-cont-spec {
    width: 128px;
    position: relative;
    height: 96px;
    border-radius: 8px;
    overflow: hidden;
  }
`;

const ArticleLine = ({ title, description, url }) => {
  return (
    <Cont colors={COLORS}>
      <div className="img-cont-spec mar-bottom-16 mar-right-16">
        <Image
          quality="100"
          fill
          src="/images/steak.jpg"
          style={{ objectFit: "cover" }}
          alt={title}
          sizes={"100%"}
        />
      </div>
      <div>
        <h5 className="blue">{title}</h5>
        <p>{description}</p>
      </div>
    </Cont>
  );
};

export default ArticleLine;
