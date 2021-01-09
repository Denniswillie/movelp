const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;

const movieInfoSchema = new mongoose.Schema ({
  movieId: Number,
  movieType: String //Can be a movie or a tv show
});

module.exports = movieInfoSchema;
