const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;

const postSchema = new mongoose.Schema ({
  creatorId: ObjectId,
  type: String,
  fileIds: [String],
  text: String,
  timeOfCreation: Date,
  noOfLikes: Number,
  noOfComments: Number,
  isEdited: Boolean
});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
