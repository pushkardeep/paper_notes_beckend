const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      res.send({
        success: false,
      });
      return;
    }

    jwt.verify(token, process.env.SECERET_KEY, async (err, result) => {
      if (err) {
        console.log("jwt verificatio error", err);
        res.send({
          success: false,
        });

        return;
      }

      if (result) {
        req.user = await userModel.findOne({ email: result?.email });
        next();
      }
    });
  } catch (error) {
    console.log("you have error in auth middle ware");
  }
};

module.exports = auth;
