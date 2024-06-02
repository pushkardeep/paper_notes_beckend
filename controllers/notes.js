const userModel = require("../models/user-model");
const notesModel = require("../models/notes-model");

const getNotes = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      res.send({
        success: false,
      });

      return;
    }

    const notes = await userModel
      .findOne({ email: req.user.email })
      .populate("notes");

    res.send({
      success: true,
      notes: notes.notes,
    });
  } catch (error) {
    console.log("you have error n getting notes");
  }
};

const createNote = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      res.send({
        success: false,
      });
      return;
    }

    const newNote = await notesModel.create(req.body);
    newNote.user = user._id;
    newNote.save();

    user.notes.push(newNote._id);
    user.save();

    res.send({
      success: true,
      newNote,
    });
  } catch (error) {
    console.log("you have error in creating notes");
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await notesModel.findOneAndDelete({ _id: req.body.id });
    await userModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        $pull: { notes: req.body.id },
      },
      { new: true }
    );

    res.send({
      success: true,
      deletedNote,
    });
  } catch (error) {
    console.log("you have error in deleting note", error);
  }
};

const editNote = async (req, res) => {
  try {
    const note = await notesModel.findOne({ _id: req.body.id });

    if (!note) {
      res.send({
        success: false,
      });
      return;
    }

    const updatedNote = await notesModel.findOneAndUpdate(
      { _id: req.body.id },
      { title: req.body.title, text: req.body.text },
      { new: true }
    );

    res.send({
      success: true,
      updatedNote,
    });
  } catch (error) {
    console.log("you have error in updating notes");
  }
};

module.exports = { createNote, getNotes, deleteNote, editNote };
