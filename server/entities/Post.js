"use strict";
//jshint esversion:6

// •	creatorId
// •	Type
// •	File_url
// •	Post_string
// •	timeOfCreation
// •	noOfLikes
// •	noOfComments
// •	isEdited

class Post {

  static FIELDS = {
    CREATOR_ID: 'creatorId',
    CREATOR_NAME: 'creatorName',
    TYPE: 'type',
    FILE_IDS: 'fileIds',
    TEXT: 'text',
    TITLE: 'title',
    RATING: 'rating',
    TIME_OF_CREATION: 'timeOfCreation',
    NO_OF_LIKES: 'noOfLikes',
    NO_OF_COMMENTS: 'noOfComments',
    IS_EDITED: 'isEdited',
    MOVIE_IDS: 'movieIds',
  }

  static TYPES = {
    GENERAL: 'general',
    RECOMMENDATION: 'recommendation',
    DIARY: 'diary',
    ASK_SUGGESTION: 'asksuggestion'
  }

  constructor(build) {
    if (arguments.length === 1 && this.validateBuild(build)) {
      const creatorId = build.creatorId;
      const creatorName = build.creatorName;
      const type = build.type;
      const fileIds = build.fileIds;
      const text = build.text;
      const timeOfCreation = build.timeOfCreation;
      const noOfLikes = build.noOfLikes;
      const noOfComments = build.noOfComments;
      const isEdited = build.isEdited;
      const title = build.title;
      const rating = build.rating;
      const movieIds = build.movieIds;

      Object.defineProperties(this, {
        creatorId: {
          value: creatorId,
          writable: false
        },
        creatorName: {
          value: creatorName,
          writable: false
        },
        type: {
          value: type,
          writable: false
        },
        fileIds: {
          value: fileIds,
          writable: false
        },
        text: {
          value: text,
          writable: false
        },
        timeOfCreation: {
          value: timeOfCreation,
          writable: false
        },
        noOfLikes: {
          value: noOfLikes,
          writable: false
        },
        noOfComments: {
          value: noOfComments,
          writable: false
        },
        isEdited: {
          value: isEdited,
          writable: false
        },
        title: {
          value: title,
          writable: false
        },
        rating: {
          value: rating,
          writable: false
        },
        movieIds: {
          value: movieIds,
          writable: false
        },
        fileIds: {
          value: fileIds,
          writable: false
        }
      });
    }
  }
  validateBuild(build) {
    return (String(build.constructor) === String(Post.Builder));
  }
  static get Builder() {
    class Builder {
      setCreatorId(creatorId) {
        this.creatorId = creatorId;
        return this;
      }
      setCreatorName(creatorName) {
        this.creatorName = creatorName;
        return this;
      }
      setType(type) {
        this.type = type;
        return this;
      }
      setFileIds(fileIds) {
        this.fileIds = fileIds;
        return this;
      }
      setText(text) {
        this.text = text;
        return this;
      }
      setTimeOfCreation(timeOfCreation) {
        this.timeOfCreation = timeOfCreation;
        return this;
      }
      setNoOfLikes(noOfLikes) {
        this.noOfLikes = noOfLikes;
        return this;
      }
      setNoOfComments(noOfComments) {
        this.noOfComments = noOfComments;
        return this;
      }
      setIsEdited(isEdited) {
        this.isEdited = isEdited;
        return this;
      }
      setTitle(title) {
        this.title = title;
        return this;
      }
      setRating(rating) {
        this.rating = rating;
        return this;
      }
      setMovieIds(movieIds) {
        this.movieIds = movieIds;
        return this;
      }
      build() {
        return new Post(this);
      }
    }
    return Builder;
  }
}

module.exports = Post;
