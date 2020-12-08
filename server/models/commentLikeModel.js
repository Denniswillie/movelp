const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;

const commentLikeSchema = new mongoose.Schema ({
  userId: ObjectId,
  commentId: ObjectId,
  liked: Number
});

const CommentLike = new mongoose.model("CommentLike", commentLikeSchema);

module.exports = CommentLike;
