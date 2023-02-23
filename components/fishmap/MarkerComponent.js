import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { Marker, InfoWindow, } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";
import colors from "../../data/colors";
import ReactMarkdown from "react-markdown";
const Cont = styled.div`
  max-width: 320px;
  .tags-holder {
    border-bottom: 1px solid ${(props) => props.colors.grey};

    display: flex;
    justify-content: center;
    //background-color: ${(props) => props.colors.grey};

    padding: 4px;
    border-radius: 8px 8px 0 0;
    margin-bottom: 8px;
  }
  .field-line {
    margin-bottom: 8px;
    word-break: break-word;
  }
`;
const MarkerComponent = ({
  latLong,
  name,
  icon,
  severity = 0,
  description,
  date
}) => {
  const [open, setOpen] = useState(false);


  return (
    <Marker label={name} icon={icon} position={latLong} onClick={() => setOpen(true)}>
      {open && (
        <InfoWindow onCloseClick={() => setOpen(false)}>
          <Cont colors={COLORS} className="info-box">
            <p className='bold underline'>{name}</p>
            <p className='contrast'> {new Date(date).toDateString()}</p>
            <div className="mar-bottom-16"></div>
            <div className="star-holder mar-bottom-16">
              <h5 className="black mar-bottom-4">Severity</h5>
              <div className="star-holder">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index, realIndex) => {
                  return (
                    <FontAwesomeIcon
                      key={realIndex}
                      icon={faStar}
                      className={
                        index <= severity ? "icon-ssm light-red" : "icon-ssm black"
                      }
                    />
                  );
                })}
              </div>
            </div>
            <ReactMarkdown className='markdown'>
              {description}
            </ReactMarkdown>

          </Cont>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default MarkerComponent;
