import {useState} from 'react'
import styled from 'styled-components';
import COLORS from '../../data/colors';
const Cont = styled.div`
  padding: 4px;
  border-bottom: 1px solid ${props=>props.colors.grey};
  cursor:pointer;
  &:hover{
    background-color: ${props=>props.colors.offWhite2};;
  }
`;

const OceanLine = () => {
  return (
    <Cont colors = {COLORS}>

    </Cont>
  )
}

export default OceanLine