const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;

const postSchema = new mongoose.Schema ({
  userId: ObjectId,
  type: String,
  fileUrl: String,
  text: String,
  timeOfCreation: Date,
  noOfLikes: Number,
  noOfComments: Number,
  likers: [ObjectId]
});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
