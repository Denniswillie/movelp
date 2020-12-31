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
  static create(comment) {
    return CommentModel.create(this.constructSchemaFields(comment))
      .then(docs => {
        return docs;
      })
      .catch(console.log);
  }

  static constructSchemaFields(comment) {
    return {
      postId: comment.postId,
      creatorId: comment.creatorId,
      creatorName: comment.creatorName,
      timeOfCreation: comment.timeOfCreation,
      text: comment.text,
      noOfLikes: comment.noOfLikes,
      isEdited: comment.isEdited
    }
  }

  static edit(commentId, commentBuilder) {
    return CommentModel.findByIdAndUpdate(commentId, commentBuilder, {new: true})
      .then(docs => {
        return docs;
      })
      .catch(console.log);
  }

  static get(postId) {
    return CommentModel.find({postId: postId})
      .then(docs => {
        return docs;
      })
      .catch(console.log);
  }

  static delete(commentId) {
    return CommentModel.findByIdAndDelete(commentId)
      .then(docs => {
        return docs;
      })
      .catch(console.log);
  }

  static async createOrToggleLike(commentId, userId) {
    await CommentLikeModel.findOneAndUpdate({commentId: commentId, userId: userId},
      {$bit: {liked: {xor: 1}}}, {new: true})
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
      CommentModel.findByIdAndUpdate(commentId, {$inc: {noOfLikes: 1}}, {new: true}, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        return docs;
      })
    } else {
      CommentModel.findByIdAndUpdate(commentId, {$inc: {noOfLikes: -1}}, {new: true}, (err, docs) => {
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
