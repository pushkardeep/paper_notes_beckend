const app = require("./app");
const connectDB = require("./config/db");

require("dotenv").config();

connectDB().then(() => {
  app.listen({ port: process.env.PORT });
});
