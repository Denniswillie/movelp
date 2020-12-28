"use strict";
//jshint esversion:6

// •	Id
// •	postId
// •	creatorId
// •	timeOfCreation
// •	comment_string
// •	noOfLikes
// •	isEdited

class Comment {

  static FIELDS = {
    POST_ID: 'postId',
    CREATOR_ID: 'creatorId',
    TIME_OF_CREATION: 'timeOfCreation',
    TEXT: 'text',
    NO_OF_LIKES: 'noOfLikes',
    IS_EDITED: 'isEdited'
  }

  constructor(build) {
    if (arguments.length === 1 && this.validateBuild(build)) {
      const postId = build.postId;
      const creatorId = build.creatorId;
      const timeOfCreation = build.timeOfCreation;
      const text = build.text;
      const noOfLikes = build.noOfLikes;
      const isEdited = build.isEdited;

      Object.defineProperties(this, {
        postId: {
          value: postId,
          writable: false
        },
        creatorId: {
          value: creatorId,
          writable: false
        },
        timeOfCreation: {
          value: timeOfCreation,
          writable: false
        },
        text: {
          value: text,
          writable: false
        },
        noOfLikes: {
          value: noOfLikes,
          writable: false
        },
        isEdited: {
          value: isEdited,
          writable: false
        },
      });
    }
  }
  validateBuild(build) {
    return (String(build.constructor) === String(Comment.Builder));
  }
  static get Builder() {
    class Builder {
      setPostId(postId) {
        this.postId = postId;
        return this;
      }
      setCreatorId(creatorId) {
        this.creatorId = creatorId;
        return this;
      }
      setTimeOfCreation(timeOfCreation) {
        this.timeOfCreation = timeOfCreation;
        return this;
      }
      setText(text) {
        this.text = text;
        return this;
      }
      setNoOfLikes(noOfLikes) {
        this.noOfLikes = noOfLikes;
        return this;
      }
      setIsEdited(isEdited) {
        this.isEdited = isEdited;
        return this;
      }
      build() {
        return new Comment(this);
      }
    }
    return Builder;
  }
}

module.exports = Comment;
