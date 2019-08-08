import React from 'react';

const Err = ({ message }) => {
  return (
    message !== '' && (
      <div className='mt3'>
        <p className='f6 pink'>{message}</p>
      </div>
    )
  );
};

export default Err;
