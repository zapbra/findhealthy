import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  cursor: pointer;
  position: relative;
  margin: 0px 16px;
  display: flex;
  margin-bottom: 32px;

  &:hover {
    h5 {
      text-decoration: underline;
    }
    img {
      opacity: 0.8;
    }
  }
  .img-cont-spec {
    width: 128px;
    position: relative;
    height: 128px;
    border-radius: 50%;
    overflow: hidden;
  }
`;

const TopicLine = ({ title, url }) => {
  return (
    <Cont
      colors={COLORS}
      className="flex flex-column align-center justify-center"
    >
      <div className="img-cont-spec mar-bottom-16">
        <Image
          quality="100"
          fill
          src="/images/steak.jpg"
          style={{ objectFit: "cover" }}
          alt={title}
          sizes={"100%"}
        />
      </div>
      <h5 className=" blue">{title}</h5>
    </Cont>
  );
};

export default TopicLine;
