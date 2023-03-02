import { useState } from "react"
import styled from "styled-components"
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`

`;

const Searchbar = ({text, updateText}) => {
    
  return (
    <Cont colors = {COLORS}>
        <div className="search-bar mar-bottom-8 box-shadow-2 flex align-center">
            <FontAwesomeIcon icon = {faSearch} className = 'icon-ssm blue mar-right-16' />
        <form  className="inline-block mar-right-8 flex flex-one">
          <input
            type="text"
            value={text}
            onChange={updateText}
            placeholder="milk... eggs..."
            name="products"
          />
        </form>
      
      </div>
    </Cont>
  )
}

export default Searchbar