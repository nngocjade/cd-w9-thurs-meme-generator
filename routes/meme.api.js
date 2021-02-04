var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.json({ status: "ok", text: "hello list all memes here" });
});

router.post("/", function (req, res, next) {
  //Accept an upload with this request
  //Save the file to disk
  //Return success if everything worked
  res.json({ status: "ok", text: "upload file here" });
});

module.exports = router;
