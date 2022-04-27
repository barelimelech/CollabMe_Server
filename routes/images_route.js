const express = require('express');
const router = express();
const user = require('../controllers/users')

var multer, storage, path, crypto;
multer = require('multer')
path = require('path');
crypto = require('crypto');
var fs = require('fs');

/**
* @swagger
* tags:
*   name: Images Api
*   description: The Images API
*/

// /**
// * @swagger
// * /image/uploads:
// *   post:
// *     summary: ______
// *     tags: [Images Api]
// *     parameters:
// *       - in: path
// *         name: path  Image
// *         schema:
// *           type: string
// *         required: true
// *         description: the path to the file that store the image
// *     responses:
// *       200:
// *         description: 
// *         content:
// *           application/json:
// *             schema:
// *               type: string
// */

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

/**
* @swagger
* /image/upload:
*   post:
*     summary: uploading image (image format) and convert to url
*     tags: [Images Api]
*     consumes:
*       - multipart/form-data
*     parameters:
*       - in: formData
*         name: upfile
*         type: file
*         required: true
*         description: The image file to upload.
*     responses:
*       200:
*         description: image was uploaded seccessfully
*         content:
*           application/json:
*             schema:
*               type: string
*/

router.post("/upload", upload.single("upload"), async (req, res) => {
  if (req.file === undefined) return res.status(400).send;
  const imgUrl = req.file.path;
   res.status(200).send(imgUrl);
});

/**
* @swagger
* /image/file/{filename}:
*   get:
*     summary: get URL and send it as byte
*     tags: [Images Api]
*     parameters:
*       - in: path
*         name: URL
*         schema:
*           type: string
*         required: true
*         description: URL of an image
*     responses:
*       200:
*         description: ok
*         Content:
*           application/json:
*            schema: 
*              type: string
*/

// type: object
// *       properties:
// *         Description:
// *           type: string
// *           description: description of the offer

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