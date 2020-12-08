const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;

const postLikeSchema = new mongoose.Schema ({
  userId: ObjectId,
  postId: ObjectId,
  liked: Number
});

const PostLike = new mongoose.model("PostLike", postLikeSchema);

module.exports = PostLike;
