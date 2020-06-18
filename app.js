const express = require('express');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const path = require('path');
const {imagesUploader,screenShotGen,videoUploader,videoDownloader,imageSearch} = require('./middlewares');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())
app.use('/uploadFile',fileUpload())

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

let file;
let urls;
app.post('/upload',async (req,res)=>{
  req.setTimeout(0);
  file = await videoDownloader(req.body.link)
  await screenShotGen(file)
  res.send('Success')
})
app.post('/uploadFile',async (req,res)=>{
  req.setTimeout(0);
    file = req.files.file.name;  
    await videoUploader(req)
  await screenShotGen(file)
  res.send('Success')
})
app.post('/images',async (req,res)=>{
   urls = await imagesUploader(file)
   res.send('uploaded')
})
app.post('/search',async (req,res)=>{ 
  imageSearch(urls,res)
})
app.listen(port,()=>console.log(`Server is listening to port ${port}`))