
const ffmpeg = require('fluent-ffmpeg');
const screenShotGen = async (filename,count = '8') => {
  ffmpeg.ffprobe(`${__dirname}/../client/public/uploads/${filename}`,async (err) => {
    console.log('Will generate screenshots');
       const proc = new ffmpeg(`${__dirname}/../client/public/uploads/${filename}`)
         .takeScreenshots({
           filename:'%i',
           count:count, // number of seconds
           size:'960x540'
         }, './thumbnails');
     
   })
  let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve("done"), 25000);
  });
  return(promise)
}
module.exports = {
  screenShotGen,
}
