var express = require("express");
var _ = require("lodash");
var crypto = require("crypto");
var user = require("../models/user.js");
var router = express.Router();

router.get("/login/:user",function (req,res,next) {
  user.find(req.params["user"],(err,data)=>{
    if(err){
      next(err)
    }else{
      if(data.length){
        res.send("登录成功")
      }else{
        res.send("登录失败")
      }
      // res.send(JSON.stringify({
      //   data:data,
      // }))
    }

  })
});
router.get("/add/:user/:pd",function (req,res,next) {
  const secret =  "hwn";
  // const hash = crypto.createHmac('sha256', secret).digest('hex');
  user.add({
    name:req.params["user"],
    password:crypto.createHmac("sha256",secret).update(req.params["pd"]).digest("hex")
  },(err,data)=>{
    if(err){
      next(err)
    }else{
      res.send(JSON.stringify({
        data:data,
      }))
    }

  })
});
router.get("/remove",function (req,res) {
  user.removeByCond({
    name:"横下有章",
  },(err,data)=>{
    res.send(JSON.stringify({
      data:data,
    }))
  })
});
router.get("/clear",function (req,res) {
  user.removeByCond({},(err,data)=>{
    res.send(JSON.stringify({
      data:data,
    }))
  })
});
router.get("/removeById",function (req,res) {
  user.removeById(req.query.id,(err,data)=>{
    res.send(JSON.stringify({
      data:data,
    }))
  })
});
router.get("/list",function (req,res) {
  user.list({},(err,data)=>{
    res.send(JSON.stringify({
      data:data,
    }))
  })
});
module.exports = router;
