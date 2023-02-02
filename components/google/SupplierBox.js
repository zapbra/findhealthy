import Link from 'next/link';
import styled from "styled-components";
import { useState } from "react";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
const Cont = styled.div`
  display:flex;
`;

const SupplierBox = ({links, pros, cons, name, country, image}) => {

  const [linkElems, setLinkElems] = useState(links.map(link=> {
    return (
      <div>
        <FontAwesomeIcon icon = {faLink} className = 'light-blue icon-sm' />
        <Link href = {link}>
          <p> {link} </p>
          </Link>
        </div>
    )
  
  }))
  return (
   <Cont colors = {COLORS}>
    <div className="text-box">
      <h3 className="black">{name}</h3>
      
    </div> 
    <div className="image-holder">
      
    </div>
   </Cont>
  )
}

export default SupplierBox