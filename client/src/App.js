import React , {useState} from 'react';
import Message from './components/Message';
import Form from './components/Form';
import axios from 'axios';
import SearchResult from './components/SearchResult' 
import './App.css';
const App = () => {
  const [file, setFile] = useState('');
  const [link, setLink] = useState('Paste link');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [spinner,setSpinner] = useState('');
  const onChangeLink = e =>{
    setLink(e.target.value)
  }
  const onChange = e => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async e => {
    e.preventDefault();
   try {
      setResult([]);
      setSpinner(true);
      let res;
      if(file === '' ){
        res = await axios.post ('/upload',{'link':link});
      }else{
        const formData = new FormData();
        formData.append('file', file);
        res = await axios.post('/uploadFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
  
            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);
          }
        });
      }
       if(res.data==='Success'){
        const images = await axios.post('/images')
        if(images.data==='uploaded'){
            const resultRes = await axios.post('/search')
            setSpinner(false)
            setResult(resultRes.data)
          }
       }
      setMessage('Done!');
    } catch (err) {
      console.log(err)
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };
  return(
  <div className='container mt-4'>
    <h1 className=' text-center mb-4 font-weight-bold head'>Search By Video <span role='img'>🎬</span> </h1>
    <>
      {message ? <Message msg={message} /> : null}
      <Form onChange={onChange} onChangeLink={onChangeLink} onSubmit={onSubmit} uploadPercentage={uploadPercentage} />
      {spinner ? <div class="d-flex justify-content-center mt-5">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>   : false }
      {result ? 
            result.map((link,key)=>{return(
              <SearchResult link={link} key={key} />
            ) }) : null}
    </>
  </div>
)};

export default App;
