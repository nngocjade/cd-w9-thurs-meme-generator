const express = require("express");
const fs = require("fs");
const photoHelper = require("../middleware/photo.helper");

// ===============CREATE MEME==================
const createMeme = async (req, res, next) => {
  try {
    // Read data from the json file
    let rawData = fs.readFileSync("memes.json");
    let memes = JSON.parse(rawData).memes;

    const meme = {};

    const texts = req.body.texts || [];
    const textsArr = [].concat(texts); // Make sure texts is an array.
    meme.texts = textsArr.map((text) => JSON.parse(text));

    // Prepare data for the new meme
    meme.id = Date.now();
    meme.originalImage = req.file.filename;
    meme.originalImagePath = req.file.path;
    const newFilename = `MEME_${meme.id}`;
    const newDirectory = req.file.destination;
    const newFilenameExtension = meme.originalImage.split(".").slice(-1);
    meme.outputMemePath = `${newDirectory}/${newFilename}.${newFilenameExtension}`;

    // Put text on image
    await photoHelper.putTextOnImage(
      meme.originalImagePath,
      meme.outputMemePath,
      meme.texts
    );

    // Add the new meme to the beginning of the list and save to the json file
    meme.createdAt = Date.now();
    meme.updatedAt = Date.now();
    memes.unshift(meme);
    fs.writeFileSync("memes.json", JSON.stringify({ memes }));
    res.status(201).json(meme);
  } catch (err) {
    next(err);
  }
};

// ====================GET MEME=======================

const getMemes = (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    // Read data from the json file
    let rawData = fs.readFileSync("memes.json");
    let memes = JSON.parse(rawData).memes;

    // Calculate slicing
    const totalMemes = memes.length;
    const totalPages = Math.ceil(totalMemes / perPage);
    const offset = perPage * (page - 1);
    memes = memes.slice(offset, offset + perPage);

    res.json({ memes, totalPages });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createMeme,
  getMemes,
};
