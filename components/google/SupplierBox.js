import Link from 'next/link';
import Image from 'next/image';
import styled from "styled-components";
import { useState } from "react";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
const Cont = styled.div`
  display:flex;
  text-align: center;
  li, p{
    display:inline-block;
  }
  li::before{
    content: ''
  }
  .lines{
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items:center;
  }
  .lines{
    & > div{
      margin-bottom: 8px;
    }
  }
  li{
    margin-bottom: 8px;
  }
`;

const SupplierBox = ({links, pros, cons, name, country, image}) => {

  const [proElems, setProElems] = useState(pros.map(pro=> {
    return (
      <li>
        <p className="bold">
          {pro}
        </p>
      </li>
    )
  }));

  const [conElems, setConElems] = useState(cons.map(con=> {
    return (
      <li>
        <p className="bold red">
          {con}
        </p>
      </li>
    )
  }));

  return (
   <Cont colors = {COLORS}>
    <div className="text-box">
      <div className="center-inline">
      <h3 className="black mar-bottom-16">{name}</h3>
      </div>
      <div className="lines">
      <div className = 'flex align-center'>
        <FontAwesomeIcon icon = {faLink} className = 'light-blue icon-sm mar-right-8' />
        <Link href = {links[0]}>
          <p className = 'bold'> {links[0]} </p> 
          </Link>
        </div>
        <div  className = 'flex align-center'>
        <FontAwesomeIcon icon = {faInstagram} className = 'mar-right-8 light-blue icon-sm' />
        <Link href = {links[1]}>
          <p className = 'bold'> {links[1]} </p> 
          </Link>
        </div>

        <ul className = 'flex align-center flex-column'>
          {proElems}
        </ul>
        <ul className="flex-align-center flex-column">
          {conElems}
        </ul>
        </div>
    </div> 
    <div className="image-holder">
    <Image 
      quality= '100'
      fill = {true}
      src = {image}
      />
    </div>
   </Cont>
  )
}

export default SupplierBox