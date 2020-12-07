const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;

const followRelationshipSchema = new mongoose.Schema ({
  follower: ObjectId,
  followed: ObjectId,
  timeOfFollowing: Date
});

const FollowRelationship = new mongoose.model("FollowRelationship", followRelationshipSchema);

module.exports = FollowRelationship;
