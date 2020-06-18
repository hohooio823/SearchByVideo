import React from 'react';

const Progress = ({ percentage }) => {
  return (
    <div className='progress col-11 col-md-9  mb-md-1 h-75 h-xl-75 pt-2 pb-2 p-md-0 mt-md-2'>
      <div
        className='progress-bar progress-bar-striped bg-success '
        role='progressbar'
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};


export default Progress;
