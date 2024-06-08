const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const sign_up = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({ success: false, message: "User already exists" });
    }

    // Create JWT token
    const token = jwt.sign({ email }, process.env.SECERET_KEY);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await userModel.create({
      username: name,
      email,
      password: hashedPassword,
    });

    // Send response
    res.send({
      success: true,
      token,
      user: newUser,
    });
  } catch (error) {
    console.error("sign_up error", error);
    res.send({ success: false, message: "Error signing up" });
  }
};

const log_in = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ success: false, message: "User not found" });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.send({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ email: user.email }, process.env.SECERET_KEY);

    // Send response
    res.send({
      success: true,
      token,
    });
  } catch (error) {
    console.error("log_in error", error);
    res.send({ success: false, message: "Error logging in" });
  }
};

const profile = (req, res) => {
  try {
    res.send({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("profile error", error);
    res.send({ success: false, message: "Error retrieving profile" });
  }
};

module.exports = { sign_up, log_in, profile };
