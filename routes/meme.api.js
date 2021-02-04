var express = require("express");
var router = express.Router();
const upload = require("../middleware/upload.helper").upload;

router.get("/", function (req, res, next) {
  res.json({ status: "ok", data: "Get all memes" });
});

/**
 * @route POST api/memes
 * @description Create a new meme
 * @access Public
 */

router.post("/", upload.single("image"), function (req, res, next) {
  //Accept an upload with this request
  //Save the file to disk
  //Return success if everything worked
  console.log("req.file is ", req.file);
  res.json({ status: "ok", text: "upload file here" });
});

module.exports = router;
