require("dotenv").config(); // Load ENV Variables
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, CONFIG);

mongoose.connection
  .on("open", () =>
    console.log(
      `Connected to Mongoose ${mongoose.connection.host}:${mongoose.connection.port}`
    )
  )
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

module.exports = mongoose;
