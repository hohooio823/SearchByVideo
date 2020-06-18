const fs = require('fs')
const path = require('path');

const checkFile = (fileName)=>{
    const file = __dirname+'/../client/public/uploads/'+fileName;
    const stat = fs.statSync(file);
    const extArr = fileName.split('.');
    const size = stat.size;
    const ext = extArr[extArr.length-1];
    console.log(ext)
    if(['m4v','avi','mkv','mpg','mp4','webm','flv','mov','wmv','mpeg','mpeg4','mgeps','3gpp','3gp'].includes(ext) ){
        if(size<2.5e+8){
            return('checked');
        }else{
            console.log('size error');
            fs.unlinkSync(file)
        }
    }else{
        console.log('file type error')
        fs.unlinkSync(file)
    }
}
module.exports = {
    checkFile
}