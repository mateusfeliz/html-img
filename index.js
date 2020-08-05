const cool = require('cool-ascii-faces');
const express = require('express');
const app = express();
const router = express.Router();
const nodeHtmlToImage = require('node-html-to-image');
app.use(express.static('public'));

router.get(`/api`, async function(req, res) {
  const image = await nodeHtmlToImage({
    transparent: true,
    puppeteerArgs: { args: ['--no-sandbox']},
    html: `
    <h1> ${req.query.q || 'texto'} <br> ${req.query.q2 || 'texto'} </h1>
    <h2> ${req.query.q || 'texto'} <br> ${req.query.q2 || 'texto' } </h2>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:900");

h1,h2,body,html{
  padding:0px;
  margin:0px;
}

body {
  width:1870px;
  height:638px;
  font: 900 120px/.75 'Source Sans Pro', Arial, sans-serif; background: transparent ; text-transform: uppercase; color: #fff; text-align: center; padding-top: 10%; letter-spacing: -6px; }

h1 {  
text-shadow: 1px 1px 0 #ff5a3d, 2px 2px 0 #ff5233, 3px 3px 0 #ff4928, 4px 4px 0 #ff401e, 5px 5px 0 #ff3814, 6px 6px 0 #ff2f0a, 7px 7px 0 #ff2700, 8px 8px 0 #f42500, 9px 9px 0 #ea2400, 10px 10px 0 #e02200, 11px 11px 0 #d62100, 12px 12px 0 #cc1f00, 13px 13px 0 #c11d00, 14px 14px 0 #b71c00, 15px 15px 0 #ad1a00, 16px 16px 0 #a31900, 17px 17px 0 #991700, 18px 18px 0 #8e1600, 19px 19px 0 #841400, 20px 20px 0 #7a1300, 21px 21px 0 #701100, 22px 22px 0 #660f00, 23px 23px 0 #5b0e00, 24px 24px 0 #510c00, 25px 25px 0 #470b00;
transform: skewY(169deg);
position:absolute;
z-index:1;
font-size:2em;
color:transparent;
}

h2{
z-index:4;
position:absolute;
transform: skewY(169deg);
font-size:2em;
background-image: -webkit-linear-gradient(95deg, #f35626, #feab3a);
-webkit-background-clip: text;
color:transparent;
}

</style>
    
    
    
    
    `
  }).catch(function(e) {
    console.log(e);
  });
  
  console.log(req.query);
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'binary');
});



router.get('/img',  function(req,res){
res.send('<img src="/api/?q=texto aqui" border="1" style="max-width:100%;">');
});

router.get('/', express.static('public'))

app.use('/',router);
app.listen( process.env.PORT || 8080)
