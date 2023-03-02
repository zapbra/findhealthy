import {useState} from 'react'
import styled from 'styled-components';
import COLORS from '../data/colors';
import Topics from '../components/articles/Topics';
const Cont = styled.div`
    max-width:1200px;
    margin: 40px auto;
`;

const Articles = () => {
  return (
    <Cont colors = {COLORS}>
        <Topics />
    </Cont>
  )
}

export default Articles;