const userModel = require("../models/user-model");
const notesModel = require("../models/notes-model");

const getNotes = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("notes");

    if (!user) {
      return res.send({ success: false });
    }

    res.send({ success: true, notes: user.notes });
  } catch (error) {
    console.error("Error in getting notes", error);
    res.send({ success: false });
  }
};

const createNote = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });

    if (!user) {
      return res.send({ success: false });
    }

    const newNote = await notesModel.create({ ...req.body, user: user._id });
    user.notes.push(newNote._id);
    await user.save();

    res.send({ success: true, newNote });
  } catch (error) {
    console.error("Error in creating note", error);
    res.send({ success: false });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedNote = await notesModel.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.send({ success: false });
    }

    await userModel.findByIdAndUpdate(req.user._id, { $pull: { notes: id } });

    res.send({ success: true, deletedNote });
  } catch (error) {
    console.error("Error in deleting note", error);
    res.send({ success: false });
  }
};

const editNote = async (req, res) => {
  try {
    const { id, title, text } = req.body;
    const updatedNote = await notesModel.findByIdAndUpdate(
      id,
      { title, text },
      { new: true }
    );

    if (!updatedNote) {
      return res.send({ success: false });
    }

    res.send({ success: true, updatedNote });
  } catch (error) {
    console.error("Error in updating note", error);
    res.send({ success: false });
  }
};

module.exports = { getNotes, createNote, deleteNote, editNote };
