const express = require("express");
const router = express();
const auth = require("../middlewares/auth");
const { createNote, getNotes, deleteNote, editNote } = require("../controllers/notes");

router.post("/getNotes", auth, getNotes);
router.post("/createNote", auth, createNote);
router.post("/deleteNote", auth, deleteNote);
router.post("/editNote", auth, editNote);

module.exports = router;
