const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const sign_up = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      res.send({
        success: false,
      });

      return;
    }

    const token = jwt.sign({ email: req.body.email }, process.env.SECERET_KEY);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await userModel.create({
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.send({
      success: true,
      token: token,
      user: newUser,
    });
  } catch (error) {
    console.log("sign_up error", error);
  }
};

const log_in = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.send({
        success: false,
      });

      return;
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ email: user.email }, process.env.SECERET_KEY);
        res.send({
          success: true,
          token: token,
        });
      } else {
        res.send({
          success: false,
        });
      }
    });
  } catch (error) {
    console.log("you have log_in error");
  }
};

const profile = (req, res) => {
  try {
    res.send({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.send({
      success: false,
    });
  }
};

module.exports = { sign_up, log_in, profile };
