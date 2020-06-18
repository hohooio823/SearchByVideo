
const { DownloaderHelper  } = require('node-downloader-helper');
const {checkFile} = require('./checkFile');
const videoDownloader = (url)=>{
	const dl = new DownloaderHelper(url, __dirname+'/../client/public/uploads');
	const stats = dl.getStats();
	dl.start();
	let promise = new Promise(function(resolve, reject) {	
		dl.on('end', (downloadInfo) => {
			const isChecked = checkFile(downloadInfo.fileName) 
			if(isChecked==='checked'){
				resolve(downloadInfo.fileName)
			}	
		})
	});
	return(promise)
}
module.exports = {
	videoDownloader
}