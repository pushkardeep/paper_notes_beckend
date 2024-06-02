const userModel = require("../models/user-model");
const notesModel = require("../models/notes-model");

const searchedNote = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    const searchedNote = await notesModel.find({ title: req.body.search });

    const notes = searchedNote.filter((elem) => {
      return JSON.stringify(elem.user) === JSON.stringify(user._id);
    });

    res.send({
      success: true,
      notes,
    });
  } catch (error) {
    console.log("you have error in searching note");
  }
};

module.exports = { searchedNote };
