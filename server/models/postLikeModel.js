const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;

const postLikeSchema = new mongoose.Schema ({
  userId: { type: ObjectId, ref: "User" },
  postId: { type: ObjectId, ref: 'Post' },
  liked: Number
});

const PostLike = new mongoose.model("PostLike", postLikeSchema);

module.exports = PostLike;
