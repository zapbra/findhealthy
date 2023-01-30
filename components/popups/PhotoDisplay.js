import styled from 'styled-components';
import COLORS from '../../data/colors';
import {useState} from 'react';
const Cont = styled.div`
   
`;


const PhotoDisplay = ({url}) => {

    return (
        <Cont className = 'background-shadow' colors = {COLORS}>
            <p>hello</p>
            <div className = 'background-shadow'>
              <h2>hello</h2>
            </div>
        </Cont>
    )
}


export default PhotoDisplay;