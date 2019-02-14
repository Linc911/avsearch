var fs = require('fs');
  var express = require('express');
  var multer  = require('multer');

  var router = express.Router();
  var upload = multer({dest: 'uploads/'});
  console.log(123)
  router.post('/*', upload.any(), function (req, res, next) {
    console.log(req.files[0]);  // 上传的文件信息
    var des_file = "./upload/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
         fs.writeFile(des_file, data, function (err) {
             if( err ){
                 console.log( err );
             }else{
                 response = {
                     message:'File uploaded successfully',
                     filename:req.files[0].originalname
                 };
                 console.log( response );
                 res.end( JSON.stringify( response ) );
             }
         });
     });
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
  })

  router.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    // req.files 是 `photos` 文件数组的信息
    // req.body 将具有文本域数据，如果存在的话
  })

  var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
  router.post('/cool-profile', cpUpload, function (req, res, next) {
    // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
    //
    // 例如：
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body 将具有文本域数据，如果存在的话
  })

 module.exports = router;
