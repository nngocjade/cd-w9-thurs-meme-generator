var express = require("express");
var router = express.Router();

const upload = require("../middleware/upload.helper").upload;
const photoHelper = require("../middleware/photo.helper");

const memeController = require("../controllers/meme.controller");

/**
 * @route GET api/memes
 * @description Get all memes
 * @access Public
 */
router.get("/", memeController.getMemes);

/**
 * @route GET api/memes/images
 * @description Get list of original images
 * @access Public
 */
router.get("/images", memeController.getOriginalImages);

/**
 * @route POST api/memes
 * @description Create a new meme
 * @access Public
 */

router.post(
  "/",
  upload.single("image"),
  photoHelper.resize,
  memeController.createMeme,
  function (req, res, next) {
    //Accept an upload with this request
    //Save the file to disk
    //Return success if everything worked
    console.log("req.file is ", req.file);

    res.json({ status: "ok", text: "upload file here" });
  }
);

module.exports = router;
