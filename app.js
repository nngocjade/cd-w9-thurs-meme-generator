const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const indexRouter = require("./routes/index");
const utilsHelper = require("./helpers/utils.helper");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api", indexRouter);

/* Initialize Error Handling */
app.use((err, req, res, next) => {
  console.log("ERROR", err);
  return utilsHelper.sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    { message: err.message },
    "Internal Server Error"
  );
});

module.exports = app;
