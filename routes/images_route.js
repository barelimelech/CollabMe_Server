const express = require('express');
const router = express();
const images = require('../controllers/images')
var multer, storage, path, crypto;
multer = require('multer')
path = require('path');
crypto = require('crypto');
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
  "/upload",
  multer({
    storage: storage
  }).single('upload'), function(req, res) {
    res.redirect(200,"/uploads/" + req.file.filename);
    res.status(200).send();
  });

 
module.exports = router