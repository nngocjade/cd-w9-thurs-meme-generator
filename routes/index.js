var express = require("express");
var router = express.Router();

//All route of Meme
const memeAPI = require("./meme.api");
router.use("/memes", memeAPI);

module.exports = router;
