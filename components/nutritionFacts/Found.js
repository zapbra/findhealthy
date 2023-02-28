import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  padding: 8px;
`;

const Found = ({ oceans, seas }) => {
  const oceanElems = oceans.map((ocean) => {
    return (
      <Link href={`/oceans/${ocean}`}>
        <div className="redirect-box box-shadow-2">
          <p>{ocean} </p>
          <FontAwesomeIcon icon={faArrowRight} className="black icon-ssm" />
        </div>
      </Link>
    );
  });
  const seaElems = seas.map((sea) => {
    return (
      <Link href={`/seas/${sea}`}>
        <div className="redirect-box box-shadow-2">
          <p>{sea} </p>
          <FontAwesomeIcon icon={faArrowRight} className="black icon-ssm" />
        </div>
      </Link>
    );
  });
  return (
    <Cont colors={COLORS} className="box-shadow-2">
      <div className="center-inline mar-bottom-16">
        <h4 className="blue underline">This Fish Can Be Found</h4>
      </div>
      <p className="bold blue mar-bottom-16">Oceans</p>
      <div className="flex flex-wrap mar-bottom-16">{oceanElems}</div>
      <div className="grey-line mar-bottom-8"></div>
      <p className="bold blue mar-bottom-16">Seas</p>
      <div className="flex flex-wrap">{seaElems} </div>
     

      
    </Cont>
  );
};

export default Found;
