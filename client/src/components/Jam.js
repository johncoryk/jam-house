import React from 'react';

const Jam = ({ jam }) => {
  return (
    <article className='jam-card'>
      <div className='jam-card-info'>
        <h1 className='jam-card-title'>{jam.title}</h1>
        <p>{jam.description}</p>
      </div>
      <div className='jam-card-join'>
        <button>Join</button>
        <p>Time Remaining</p>
      </div>
    </article>
  );
};

export default Jam;
