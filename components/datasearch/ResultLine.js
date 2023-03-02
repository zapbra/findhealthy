import {useState} from 'react'
import styled from 'styled-components';
import  COLORS from '../../data/colors';

const Cont =styled.div`
  padding: 4px;
  border-bottom: 1px solid ${props=>props.colors.grey};
  cursor:pointer;
  &:hover{
    background-color: ${props=>props.colors.offWhite2};;
  }
`;
const ResultLine = ({text}) => {
  return (
    <Cont colors = {COLORS}>
        <p className="blue">{text}</p>
    </Cont>
  )
}

export default ResultLine