import {useEffect, useState} from 'react';
import { fetchFish } from '../utils/supabaseFunctions';

const Evenmoretesting = () => {
    useEffect(()=> {
        const getFish = async () => {
            const fish = await fetchFish();
            console.log(fish);
        }
        getFish();
    },[]);
  return (
    <div>evenmoretesting</div>
  )
}

export default Evenmoretesting