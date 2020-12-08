const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;

const followSchema = new mongoose.Schema ({
  followerId: ObjectId,
  followedId: ObjectId,
  followed: Number,
});

const Follow = new mongoose.model("Follow", followSchema);

module.exports = Follow;
