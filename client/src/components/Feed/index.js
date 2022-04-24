import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import {useParams} from 'react-router-dom';
import MasonaryLayout from '../MasonaryLayout';
import Spinner from '../Spinner';
import { Context } from '@src/Context';

const Feed = () => {

  
  const {categoryId} = useParams();
  const {pins:{pins, getPins, loadingPins}} = useContext(Context);

  useEffect(()=> {
    getPins(categoryId);
  },[categoryId])

  if(loadingPins) return <Spinner message="We are adding new idea to your feed"/>
  return (
    <div>
      {pins && <MasonaryLayout pins = {pins}/>}
    </div>
  )
}

export default Feed