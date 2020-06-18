import React from 'react';
import Progress from './Progress';
const Form = (props) => {
  return (
    <form className='row d-flex justify-content-center ' onSubmit={props.onSubmit}>
        <div className='col-11 col-md-6 p-0 file text-center '>
          <input type="text" placeholder='Paste link' className='border-right-0 w-50 pt-2 pb-2' onChange={props.onChangeLink} />
          <label class='or w-25 pt-2 pb-2'>OR</label>
          <label className='file-label w-25 pt-2 pb-2 '>Choose file<input type='file' className='d-none' onChange={props.onChange} /></label>
        </div>
        <input
          type='submit'
          value='Search 🔎'
          className='col-11 col-md-2 btn btn-block mt-2 mb-2 pt-2 pb-2 mt-md-0 mb-md-0  offset-md-1  '
        />
        <Progress  percentage={props.uploadPercentage} />
      </form>
  );
};


export default Form;
