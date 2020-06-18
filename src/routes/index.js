var express = require('express');
var router = express.Router();
const fs = require('fs');


router.get('/', function(req, res, next) {


  let buff = fs.readFileSync('a.jpeg');
  let base64data = buff.toString('base64');
  
  console.log('Image converted to base 64 is:\n\n' + base64data);
  

  res.status(200).json(base64data);
});

module.exports = router;
