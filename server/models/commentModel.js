const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;

const commentSchema = new mongoose.Schema ({
  postId: ObjectId,
  creatorId: ObjectId,
  creatorName: String,
  timeOfCreation: Date,
  text: String,
  noOfLikes: Number,
  isEdited: Boolean
});

const Comment = new mongoose.model("Comment", commentSchema);

module.exports = Comment;
