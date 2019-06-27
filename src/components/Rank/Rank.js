import React from 'react';

const Rank = ({ name, entries }) => {
  if (name === 'Guest')
    return (
      <div>
        <div className='white f3'>{`Hello there!`}</div>
      </div>
    );
  else
    return (
      <div>
        <div className='white f3'>
          {`Hello, ${name}! Your current entry count is:`}
        </div>
        <div className='white f1'>{entries}</div>
      </div>
    );
};

export default Rank;
