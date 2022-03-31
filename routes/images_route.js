const express = require('express');
const router = express();
const user = require('../controllers/users')

var multer, storage, path, crypto;
multer = require('multer')
path = require('path');
crypto = require('crypto');
var fs = require('fs');

router.use('/uploads', express.static('uploads'));
storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    return crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) {
        return cb(err);
      }
      return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
    });
  }
});
var upload = multer({ storage: storage })

router.post(
  "/upload/:username",
  multer({
    storage: storage
  }).single('upload'), function(req, res) {
    console.log(req.file);
    console.log(req.params.username); 
    res.redirect(200,"/uploads/" + req.file.filename);
//    res.status(200).send("/uploads/" + req.file.filename);
  });


  /*
  router.get('/uploads/:upload', function (req, res){
    file = req.params.upload;
    console.log(req.params.upload);
    var img = fs.readFileSync(__dirname + "/uploads/" + file);
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
  
  });
  */
  

 
module.exports = router