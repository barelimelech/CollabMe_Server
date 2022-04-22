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



router.post("/upload", upload.single("upload"), async (req, res) => {
  if (req.file === undefined) return res.status(400).send;
  const imgUrl = req.file.path;
   res.status(200).send(imgUrl);
});


router.get("/file/:filename", async (req, res) => {
  let nulli = req.params.filename.toString();
  if(nulli==="null"){
    res.status(400).send();
  }
  fs.readFile(req.params.filename, function(err, data) {
    try{
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end(data); // Send the file data to the browser.  
    }catch(err){
      res.status(400).send();
    }
        
  });
});

  

 
module.exports = router