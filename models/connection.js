require("dotenv").config() // Load ENV Variables
const mongoose = require("mongoose")

const MONGO_DEV_URI = process.env.MONGO_DEV_URI
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_DEV_URI, CONFIG)

mongoose.connection
  .on("open", () => console.log(`Connected to Mongoose ${mongoose.connection.host}:${mongoose.connection.port}`))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))

  module.exports = mongoose

  //import from