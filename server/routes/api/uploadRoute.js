const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
require("dotenv").config();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

aws.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});
const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: "amazona-bucket",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadS3 = multer({ storage: storageS3 });
router.post("/s3", uploadS3.single("image"), (req, res) => {
  res.send(req.file.location);
});
module.exports = router;

// References used in here  https://levelup.gitconnected.com/file-upload-express-mongodb-multer-s3-7fad4dfb3789#:~:text=multer%20%3A%20Multer%20is%20a%20node,aws%2Dsdk%20multer%20multer%2Ds3
//                          https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html
//                          https://medium.com/@otoloye/uploading-files-to-aws-s3-using-nodejs-multer-mongodb-and-postman-part-1-de790b8131d4
//                          https://www.npmjs.com/package/multer-s3
//                          https://www.youtube.com/watch?v=6KbyN3RNjnQ
//                          https://www.google.com/
//                          https://stackoverflow.com/
