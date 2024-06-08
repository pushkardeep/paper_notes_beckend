const userModel = require("../models/user-model");
const notesModel = require("../models/notes-model");

const searchedNote = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });

    const notes = await notesModel.find({
      title: { $regex: req.body.search, $options: "i" },
      user: user._id,
    });

    res.send({
      success: true,
      notes,
    });
  } catch (error) {
    res.send({
      success: false,
    });
    console.log("Error in searching note:", error);
  }
};

module.exports = { searchedNote };
