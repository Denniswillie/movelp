"use strict";
// jshint esversion:6

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const UserModel = require('../../models/userModel');

class MongoDBUserManager {
  getRoomWithSpecifiedUsername(searchedUsername) {
    console.log("test function");
  }
}

module.exports = MongoDBUserManager;
