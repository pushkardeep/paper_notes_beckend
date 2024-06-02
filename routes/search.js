const express = require("express");
const { searchedNote } = require("../controllers/search");
const auth = require("../middlewares/auth");
const router = express();

router.post("/notes", auth, searchedNote);

module.exports = router;
