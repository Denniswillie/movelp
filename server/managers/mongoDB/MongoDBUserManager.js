"use strict";
// jshint esversion:6

// Fields:
// •	create profile
// •	edit profile
// •	delete user
// •	follow and unfollow toggle
// •	request_to_follow
// •	display following and followers list

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const UserModel = require('../../models/userModel');
const FollowModel = require('../../models/followModel');

class MongoDBUserManager {
  static async createOrEditProfile(user) {
    UserModel.findByIdAndUpdate(user._id, {
      nickname: user.nickname,
      genre: user.genre,
      numOfFollowers: user.numOfFollowers,
      numOfFollowing: user.numOfFollowing,
      privacyType: user.privacyType
    })
    .then(docs => {
      return docs;
    })
    .catch(err => console.log(err));
  }

  static async delete(userId) {
    UserModel.findByIdAndDelete(userId)
      .then(docs => {
        return docs;
      })
      .catch(err => console.log(err));
  }

  static async createOrToggleFollow(followerId, followedId) {
    FollowModel.findOneAndUpdate({followerId: followerId, followedId: followedId}, {
      {$bit: {followed: {xor: 1}}}
    })
    .then(docs => {
      if (docs) {
        if (docs.followed == 1) {
          this.updateFollowNumber(followerId, followedId, true);
        } else {
          this.updateFollowNumber(followerId, followedId, false);
        }
      } else {
        FollowModel.create({followerId: followerId, followedId: followedId, followed: 1});
          .then(this.updateFollowNumber(followerId, followedId, true))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
    .then(docs => {
      return docs;
    })
    .catch(err => console.log(err));
  }

  static async updateFollowNumber(followerId, followedId, isFollowed) {
    const promises = [];
    if (isFollowed) {
      promises.push(
        UserModel.findByIdAndUpdate(followerId, {$inc: {noOfFollowing: 1}}),
        UserModel.findByIdAndUpdate(followedId, {$inc: {noOfFollowers: 1}})
      );
    } else {
      promises.push(
        UserModel.findByIdAndUpdate(followerId, {$inc: {noOfFollowing: -1}}),
        UserModel.findByIdAndUpdate(followedId, {$inc: {noOfFollowers: -1}})
      );
    }
    const info = await Promise.all(promises);
    return info;
  }

  static async fetchFollowings(userId, lastFollowId) {
    const query;
    if (lastFollowId) {
      query = FollowModel.find({followerId: userId, _id: {$gte: lastFollowId}});
    } else {
      query = FollowModel.find({followerId: userId});
    }
    await query.limit(20).exec(function(err, docs) {
      if (err) {
        console.log(err);
        return;
      }
      return docs;
    });
  }

  static async fetchFollowers(userId, lastFollowId) {
    const query;
    if (lastFollowId) {
      query = FollowModel.find({followedId: userId, _id: {$gte: lastFollowId}});
    } else {
      query = FollowModel.find({followedId: userId});
    }
    await query.limit(20).exec(function(err, docs) {
      if (err) {
        console.log(err);
        return;
      }
      return docs;
    });
  }
}

module.exports = MongoDBUserManager;
