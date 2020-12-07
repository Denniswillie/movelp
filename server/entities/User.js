"use strict";
//jshint esversion:6

// •	id
// •	Username
// •	googleId
// •	facebookId
// •	password
// •	nickname
// •	genre
// •	numOfFollowers
// •	numOfFollowing
// •	privacyType

class User {

  static FIELDS = {
    NICKNAME: 'nickname',
    GENRE: 'genre',
    NUM_OF_FOLLOWERS: 'numOfFollowers',
    NUM_OF_FOLLOWING: 'numOfFollowing',
    PRIVACY_TYPE: 'privacyType'
  }

  constructor(build) {
    if (arguments.length === 1 && this.validateBuild(build)) {
      const nickname = build.nickname;
      const genre = build.genre;
      const numOfFollowers = build.numOfFollowers;
      const numOfFollowing = build.numOfFollowing;
      const privacyType = build.privacyType;

      Object.defineProperties(this, {
        nickname: {
          value: nickname,
          writable: false
        },
        genre: {
          value: genre,
          writable: false
        },
        numOfFollowers: {
          value: numOfFollowers,
          writable: false
        },
        numOfFollowing: {
          value: numOfFollowing,
          writable: false
        },
        privacyType: {
          value: privacyType,
          writable: false
        },
      });
    }
  }
  validateBuild(build) {
    return (String(build.constructor) === String(User.Builder));
  }
  static get Builder() {
    class Builder {
      setNickname(nickname) {
        this.nickname = nickname;
        return this;
      }
      setGenre(genre) {
        this.genre = genre;
        return this;
      }
      setNumOfFollowers(numOfFollowers) {
        this.numOfFollowers = numOfFollowers;
        return this;
      }
      setNumOfFollowing(numOfFollowing) {
        this.numOfFollowing = numOfFollowing;
        return this;
      }
      setPrivacyType(privacyType) {
        this.privacyType = privacyType;
        return this;
      }
      build() {
        return new User(this);
      }
    }
    return Builder;
  }
}

module.exports = User;
