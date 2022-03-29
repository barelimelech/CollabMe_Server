const express = require('express');
const router = express();
const multer = require("multer");
const images = require('../controllers/images')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


router.post("/uploadfile", upload.single("profile"),images.uploadFile);

 
module.exports = router