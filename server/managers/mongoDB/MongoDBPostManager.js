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
const Post = require('../../entities/Post');
const PostModel = require('../../models/postModel');
const PostLikeModel = require('../../models/postLikeModel');

class MongoDBPostManager {
  static async create(post) {
    await PostModel.create(this.constructSchemaFields(post))
      .then(docs => {
        return docs;
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }

  static async edit(postId, postBuilder) {
    await PostModel.findByIdAndUpdate(postId, postBuilder)
        .then(docs => {
          return docs;
        })
        .catch(err => {
          console.log(err);
          return;
        })
  }

  static constructSchemaFields(post) {
    return {
      creatorId: post.creatorId,
      type: post.type,
      fileIds: post.fileIds,
      title: post.title,
      rating: post.rating,
      text: post.text,
      timeOfCreation: post.timeOfCreation,
      noOfLikes: post.noOfLikes,
      noOfComments: post.noOfComments,
      isEdited: post.isEdited,
      movieIds: post.movieIds
    }
  }

  static async getAll() {
    const docs = await PostModel.find({}).sort({timeOfCreation: -1}).exec();
    return docs;
  }

  static async delete(postId) {
    await PostModel.findByIdAndDelete(postId)
      .then(docs => {
        return docs;
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }

  static async createOrToggleLike(postId, userId) {
    await PostLikeModel.findOneAndUpdate({postId: postId, userId: userId},
      {$bit: {liked: {xor: 1}}})
      .then(docs => {
        if (docs) {
          if (docs.liked == 1) {
            this.updateNoOfLikes(postId, true);
          } else {
            this.updateNoOfLikes(postId, false);
          }
        } else {
          PostLikeModel.create({postId: postId, userId: userId, liked: 1})
            .then(this.updateNoOfLikes(postId, true))
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
      .then(docs => {
        return docs;
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }

  static async updateNoOfLikes(postId, isIncreased) {
    if (isIncreased) {
      PostModel.findByIdAndUpdate(postId, {$inc: {noOfLikes: 1}}, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        return docs;
      })
    } else {
      PostModel.findByIdAndUpdate(postId, {$inc: {noOfLikes: -1}}, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        return docs;
      })
    }
  }
}

module.exports = MongoDBPostManager;
