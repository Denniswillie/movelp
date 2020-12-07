"use strict";
//jshint esversion:6

// •	Id
// •	creatorId
// •	Type
// •	File_url
// •	Post_string
// •	timeOfCreation
// •	noOfLikes
// •	noOfComments
// •	likers = [userId]
// •	isEdited

class Post {

  static FIELDS = {
    CREATOR_ID: 'creatorId',
    TYPE: 'type'
    FILE_IDS: 'fileIds',
    TEXT: 'text',
    TIME_OF_CREATION: 'timeOfCreation',
    NO_OF_LIKES: 'noOfLikes',
    NO_OF_COMMENTS: 'noOfComments',
    LIKERS: 'likers',
    IS_EDITED: 'isEdited'
  }

  constructor(build) {
    if (arguments.length === 1 && this.validateBuild(build)) {
      const creatorId = build.creatorId;
      const type = build.type;
      const fileIds = build.fileIds;
      const text = build.text;
      const timeOfCreation = build.timeOfCreation;
      const noOfLikes = build.noOfLikes;
      const noOfComments = build.noOfComments;
      const likers = build.likers;
      const isEdited = build.isEdited;

      Object.defineProperties(this, {
        creatorId: {
          value: creatorId,
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
        likers: {
          value: likers,
          writable: false
        },
        isEdited: {
          value: isEdited,
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
      setLikers(likers) {
        this.likers = likers;
        return this;
      }
      setIsEdited(isEdited) {
        this.isEdited = isEdited;
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
