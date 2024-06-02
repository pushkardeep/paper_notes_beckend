const express = require("express");
const app = express();

const cors = require("cors");
const cookie_parser = require("cookie-parser");
require("dotenv").config();

const userRoute = require("./routes/user");
const notesRoute = require("./routes/notes");
const searchRoute = require("./routes/search");

const corsURI = {
  origin: process.env.ORIGIN_URI,
};

app.use(cors(corsURI));

app.use(cookie_parser());
app.use(express.json());

app.use("/user/", userRoute);
app.use("/notes/", notesRoute);
app.use("/search/", searchRoute);

app.get("/", (req, res) => {
  console.log(process.env.ORIGIN_URI);
  res.send("i am working");
});

module.exports = app;
