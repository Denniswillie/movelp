"use strict";
// jshint esversion:6

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const FollowRelationshipModel = require('../../models/followRelationshipModel');

class MongoDBFollowRelationshipManager {
  getRoomWithSpecifiedUsername(searchedUsername) {
    console.log("test function");
  }
}

module.exports = MongoDBFollowRelationshipManager;
