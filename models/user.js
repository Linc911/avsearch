var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/web2018");
var User = mongoose.model("User",new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true,
    default:16
  },
}))
exports.add = function(obj,callback){
  new User(obj).save((err,data)=>{
    callback(err,data)
  })
}
exports.removeByCond = function(condition,callback){
  User.remove(condition,(err,data)=>{
    callback(err,data)
  })
}
exports.removeById = function(id,callback){
  User.findByIdAndRemove(id,(err,data)=>{
    callback(err,data)
  })
}

exports.find = function(name,callback){
  User.find({
    name:name
  },(err,data)=>{
    callback(err,data)
  })
}
exports.list = function(condition,callback){
  User.find(condition,(err,data)=>{
    callback(err,data)
  })
}
