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
  static create(post) {
    return PostModel.create(this.constructSchemaFields(post))
      .then(docs => {
        return docs;
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }

  static edit(postId, postBuilder) {
    return PostModel.findByIdAndUpdate(postId, postBuilder, {new: true})
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

  static async getAll(userId) {
    const docs = await PostModel.find({}).sort({timeOfCreation: -1}).exec();

    // likeList contains boolean values (true = the user has liked the post,
    // false = the user has not liked the post)
    const promises = [];
    for (var i = 0; i < docs.length; i++) {
      console.log("userId: " + userId);
      console.log("postId: " + docs[i]._id);
      const result = await PostLikeModel.findOne({userId: userId, postId: docs[i]._id});
      if (result && result.liked == 1) {
        promises.push(true);
      } else {
        promises.push(false);
      }
    }
    const liked = await Promise.all(promises);
    return [docs, liked];
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
    return PostLikeModel.findOneAndUpdate({postId: postId, userId: userId},
      {$bit: {liked: {xor: 1}}}, {new: true})
      .then(async (docs) => {
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
      console.log("increase noOfLikes");
      await PostModel.findByIdAndUpdate(postId, {$inc: {noOfLikes: 1}}, {new: true}, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        return docs;
      })
    } else {
      console.log("decrease noOfLikes");
      await PostModel.findByIdAndUpdate(postId, {$inc: {noOfLikes: -1}}, {new: true}, (err, docs) => {
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
