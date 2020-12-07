const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema ({
  username: String,
  password: String,
  googleId: String,
  facebookId: String,
  nickname: String,
  genre: String,
  numOfFollowers: Number,
  numOfFollowing: Number
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

module.exports = User;
