/* eslint-disable linebreak-style */
const Promise = require("bluebird");
const axios = require('axios')
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
let links = [];
const imagesUploader =async (file,res)=>{
  if(links != []){
    links = []
  }
  fs.unlink(`${__dirname}/../client/public/uploads/${file}`,(err)=>{
console.log(err);    
  });
  const i = [1,2,3,4,5,6,7,8];
  const uploader = async (_file)=>{
    const formData  = new FormData();
    formData.append('type','url');
    formData.append('image',fs.createReadStream(_file));
    const req = await axios.post('https://api.imgur.com/3/upload'
      ,formData._valuesToMeasure[0],{'headers': {
        'Authorization': 'Client-ID cbb19b9e4e24bff'
    }})
		if(req.data != undefined){
      return links=[...links,req.data.data.link];
    }
  }
   await Promise.map(i,async index => {
	await uploader(path.join(__dirname, `../thumbnails/${index}.png`));
   })
   i.map((image)=>{
    fs.unlink(`${__dirname}/../thumbnails/${image}.png`,(err)=>{
      
    });
   })
    return(links);
  
}

module.exports = {
  imagesUploader,
}
