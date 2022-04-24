import React from 'react';
import {RotatingLines} from "react-loader-spinner";

const Spinner = ({message}) => {
  return (
    <div
        className='flex flex-col justify-center items-center w-full h-full'
    >
        <RotatingLines width="50" strokeColor="#FF5733" />
        <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner;