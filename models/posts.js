const mongoose = require("./connection");
const User = require("./user");

const { Schema, model } = mongoose;

const commentsSchema = new Schema(
  {
    username: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const postsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: String,
    title: {
      type: String,
      default: "Untitled",
      required: true,
    },
    description: String,
    toolsUsed: [String],
    username: String,
    owner: String,
    comments: [commentsSchema],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postsSchema);

module.exports = Post;
