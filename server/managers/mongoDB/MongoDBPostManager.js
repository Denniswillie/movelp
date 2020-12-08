"use strict";
// jshint esversion:6

// •	create post
// •	edit post
// •	delete post
// •	toggle post like

// Fields:
// creatorId: ObjectId,
// type: String,
// fileIds: [String],
// text: String,
// timeOfCreation: Date,
// noOfLikes: Number,
// noOfComments: Number,
// isEdited: Boolean

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const PostModel = require('../../models/postModel');
const PostLikeModel = require('../../models/postLikeModel');

class MongoDBPostManager {
  static async create(post) {
    await PostModel.create(this.constructSchemaFields(post))
      .then(docs => {
        return docs;
      })
      .catch(err => console.log(err));
  }

  static async edit(post) {
    await PostModel.findByIdAndUpdate(post._id, this.constructSchemaFields(post))
      .then(docs => {
        return docs;
      })
      .catch(err => console.log(err));
  }

  static constructSchemaFields(post) {
    return {
      creatorId: post.creatorId,
      type: post.type,
      fileIds: post.fileIds,
      text: post.text,
      timeOfCreation: post.timeOfCreation,
      noOfLikes: post.noOfLikes,
      noOfComments: post.noOfComments,
      isEdited: post.isEdited
    }
  }

  static async delete(postId) {
    await PostModel.findByIdAndDelete(postId)
      .then(docs => {
        return docs;
      })
      .catch(err => console.log(err));
  }

  static async toggleLike(postId, userId) {
    await PostLikeModel.findOneAndUpdate({postId: postId, userId: userId},
      {$bit: {liked: {xor: 1}}})
      .then(docs => {
        if (docs) {
          return docs;
        } else {
          PostLikeModel.create({postId: postId, userId: userId, liked: 1})
        }
      })
      .catch(err => console.log)
      .then(docs => {
        return docs;
      })
      .catch(err => console.log);
  }
}

module.exports = MongoDBPostManager;
