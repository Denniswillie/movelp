const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;

const postSchema = new mongoose.Schema ({
  creatorId: ObjectId,
  creatorName: String,
  type: String,
  fileIds: [String],
  title: String, //For diary post only
  rating: Number, //For Recommendation post only
  text: String,
  timeOfCreation: Date,
  noOfLikes: Number,
  noOfComments: Number,
  isEdited: Boolean,
  movieIds: [Number] //for diary, general, and recommendation posts
});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
