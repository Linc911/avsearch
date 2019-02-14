
  var express = require('express');
  var fs = require('fs')
  var path = require('path')
  var gm = require('gm').subClass({imageMagick: true});


  var router = express.Router();
  router.get("/crop",function(req,res) {
    try{
      gm(path.join(__dirname,'../src/img/03.png'))
      .resizeExact(240, 240)
      .write(path.join(__dirname,'../src/img_gm/resize.png'), function (err) {
        if (err){
          console.log(err);
        }else{
          console.log('done');
        }
      });
    }catch(err){
      console.log(err)
    }

  })
  router.get("/streams",function(req,res) {
    try{
      var readStream = fs.createReadStream(path.join(__dirname,'../src/img/03.png'));
      gm(readStream,'03.png')
      .write(path.join(__dirname,'../src/img_gm/resize.png'), function (err) {
        if (err){
          console.log(err);
        }else{
          console.log('done');
        }
      });
    }catch(err){
      console.log(err)
    }

  })


 module.exports = router;
