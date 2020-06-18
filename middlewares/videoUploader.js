const {checkFile} = require('./checkFile');

const videoUploader = (req)=>{
  const file = req.files.file;
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    file.mv(`${__dirname}/../client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
    
    let promise = new Promise(function(resolve, reject) {
      setTimeout(() =>{
        const isChecked = checkFile(file.name)
        if(isChecked==='checked'){
          resolve("done")
        }
      }, 1000);
  })
    return(promise)
    
  }
  module.exports = {
    videoUploader,
  }