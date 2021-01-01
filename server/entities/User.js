"use strict";
//jshint esversion:6

// •	id
// •	Username
// •	googleId
// •	facebookId
// •	password
// •	nickname
// •	numOfFollowers
// •	numOfFollowing

class User {

  static FIELDS = {
    NICKNAME: 'nickname',
    NUM_OF_FOLLOWERS: 'numOfFollowers',
    NUM_OF_FOLLOWING: 'numOfFollowing',
  }

  constructor(build) {
    if (arguments.length === 1 && this.validateBuild(build)) {
      const nickname = build.nickname;
      const numOfFollowers = build.numOfFollowers;
      const numOfFollowing = build.numOfFollowing;

      Object.defineProperties(this, {
        nickname: {
          value: nickname,
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
      setNumOfFollowers(numOfFollowers) {
        this.numOfFollowers = numOfFollowers;
        return this;
      }
      setNumOfFollowing(numOfFollowing) {
        this.numOfFollowing = numOfFollowing;
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
