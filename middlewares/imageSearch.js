const axios = require('axios');
const cheerio = require('cheerio');

let results = [];
let count= 0;
const imageSearch = (urls,res)=>{
	const loop = async ()=>{
		for(let i=0;i<urls.length;i++){
      const response = await axios.get("https://images.google.com/searchbyimage?image_url="+encodeURI(urls[i])+"&encoded_image=&image_content=&filename=&hl=en-US",{ headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; rv:20.0) Gecko/20100101 Firefox/20.0'}  })
      const $ = cheerio.load(response.data);
      $('div.r').each((i,element)=>{
        const link = $(element).find('a').attr('href')
        results= [...results,link]
      });
  }
}
  loop().then(()=>{
    let countof={};
    results.forEach(function(item){
    if(!countof[item]) countof[item]=0;
     countof[item]++;//increase
    });
    const countResults =Object.keys(countof).map(link=>({link,count:countof[link]}));
    countResults.sort((a,b)=>a.count-b.count);
    let finalResults = countResults.map(url=>url.link,{} )
    console.log(finalResults);
    res.send(finalResults)
    finalResults = []
  }
  )
}
module.exports = {
  imageSearch,
}
