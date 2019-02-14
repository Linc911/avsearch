
  var express = require('express');


  var router = express.Router();
  router.get("/set/:key/:value",function(req,res) {
    console.log(req.params["key"])
      console.log(req.params["value"])
    req.session[req.params["key"] ] = req.params["value"];
    res.send("成功:" + req.params["value"])
  })
  router.get("/get/:key",function(req,res) {
    console.log(req.params["key"])
      console.log(req.session)
    res.send("值：" + req.session[req.params["key"]])
  })

 module.exports = router;
