import React from 'react';
import { ReactTinyLink } from 'react-tiny-link' ;
const searchResult = ({ link , key }) => {
  return (
    <div className='row align-items-center mt-2'>
    <div className='col col-md-11 col-lg-9 col-xl-7 m-auto'>
      <ReactTinyLink
      class='mb-5'
      cardSize="small"
      showGraphic={true}
      maxLine={2}
      minLine={1}
      url={link} key={key}
    />
    </div>
  </div>
  );
};

export default searchResult;
