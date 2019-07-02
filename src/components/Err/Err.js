import React from 'react';

const Err = ({ message }) => {
  if (message !== '')
    return (
      <div className='mt3'>
        <p className='f6 pink'>{`${message}`}</p>
      </div>
    );
  else return null;
};

export default Err;
