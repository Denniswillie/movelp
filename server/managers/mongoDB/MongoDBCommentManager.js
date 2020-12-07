"use strict";
// jshint esversion:6

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const CommentModel = require('../../models/commentModel');

class MongoDBCommentManager {
  getRoomWithSpecifiedUsername(searchedUsername) {
    console.log("test function");
  }
}

module.exports = MongoDBCommentManager;
