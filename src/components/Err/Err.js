import React from 'react';

const Err = ({ message }) => {
  if (message !== '')
    return (
      <div className='alert lh-copy mt3'>
        <p className='f6 red'>{`${message}`}</p>
      </div>
    );
  else return null;
};

export default Err;
