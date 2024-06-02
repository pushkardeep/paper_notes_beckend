const express = require("express");
const app = express();

const cors = require("cors");
const cookie_parser = require("cookie-parser");
require("dotenv").config();

const userRoute = require("./routes/user");
const notesRoute = require("./routes/notes");
const searchRoute = require("./routes/search");

app.use(
  cors({
    origin: process.env.ORIGIN_URI,
  })
);

app.use(cookie_parser());
app.use(express.json());

app.use("/user/", userRoute);
app.use("/notes/", notesRoute);
app.use("/search/", searchRoute);

module.exports = app;