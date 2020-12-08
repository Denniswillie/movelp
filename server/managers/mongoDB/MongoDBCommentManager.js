"use strict";
// jshint esversion:6

// Field:
// •	create comment
// •	edit comment
// •	delete comment
// •	createOrToggleLike

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const CommentModel = require('../../models/commentModel');
const CommentLikeModel = require('../../models/commentLikeModel');

class MongoDBCommentManager {
  static async create(comment) {
    CommentModel.create(constructSchemaFields(comment))
      .then(docs => {
        return docs;
      })
      .catch(err => console.log);
  }

  static async edit(comment) {
    CommentModel.findByIdAndUpdate(comment._id, constructSchemaFields(comment))
      .then(docs => {
        return docs;
      })
      .catch(err => console.log);
  }

  static constructSchemaFields(comment) {
    return {
      postId: comment.postId,
      creatorId: comment.creatorId,
      timeOfCreation: comment.timeOfCreation,
      text: comment.text,
      noOfLikes: comment.noOfLikes,
      isEdited: comment.isEdited
    }
  }

  static async delete(commentId) {
    CommentModel.findByIdAndDelete(commentId)
      .then(docs => {return docs})
      .catch(err => console.log(err));
  }

  static async createOrToggleLike(commentId, userId) {
    await CommentLikeModel.findOneAndUpdate({commentId: commentId, userId: userId},
      {$bit: {liked: {xor: 1}}})
      .then(docs => {
        if (docs) {
          if (docs.liked == 1) {
            this.updateNoOfLikes(commentId, true);
          } else {
            this.updateNoOfLikes(commentId, false);
          }
        } else {
          CommentLikeModel.create({commentId: commentId, userId: userId, liked: 1})
            .then(this.updateNoOfLikes(commentId, true))
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
      .then(docs => {
        return docs;
      })
      .catch(err => console.log(err));
  }

  static async updateNoOfLikes(commentId, isIncreased) {
    if (isIncreased) {
      CommentModel.findByIdAndUpdate(commentId, {$inc: {noOfLikes: 1}}, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        return docs;
      })
    } else {
      CommentModel.findByIdAndUpdate(commentId, {$inc: {noOfLikes: -1}}, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        return docs;
      })
    }
  }
}

module.exports = MongoDBCommentManager;
