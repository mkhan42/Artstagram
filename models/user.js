const mongoose = require("./connection");
const { Schema, model } = mongoose;
//const Post = require("./posts");


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
  //posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]

});

const User = model("User", userSchema);

module.exports = User;