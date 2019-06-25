import React from 'react';
import './FaceRecognition.css';
import Box from './Box';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='480px' heigh='auto'/>
        {
        box.map((face, i) => {
          return (
            <Box
              key={i}
              box={box[i]}
              />
          );})
        } 
      </div>
    </div>
  );
}

export default FaceRecognition;