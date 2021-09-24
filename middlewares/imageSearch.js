const axios = require('axios');
const cheerio = require('cheerio');


const imageSearch = (urls,res)=>{
  let results = [];
  let count= 0;
	const loop = async ()=>{
    for(let i=0;i<urls.length;i++){
      const response = await axios.get("https://images.google.com/searchbyimage?image_url="+encodeURI(urls[i])+"&encoded_image=&image_content=&filename=&hl=en-US",{headers:{
          "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
      }},)
  let $ = await cheerio.load(response.data);
    $(".yuRUbf > a").each((i, el) => {
      results.push($(el).attr("href"));
    });
}
}
  loop().then(()=>{
    let countof={};
    let finalResults=[]
    let countResults = [];
    results.forEach(function(item){
    if(!countof[item]) countof[item]=0;
     countof[item]++;//increase
    });
    countResults =Object.keys(countof).map(link=>({link,count:countof[link]}));
    countResults.sort((a,b)=>a.count-b.count);
    finalResults = countResults.map(url=>url.link,{} )
    res.send(finalResults)
  }
  )
}
module.exports = {
  imageSearch,
}

