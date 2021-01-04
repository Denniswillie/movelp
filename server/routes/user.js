const multer  = require('multer');
const uploadCreateUserProfile = multer({ dest: 'uploads/' });
const router = require('express')();
const MongoDBUserManager = require('../managers/mongoDB/MongoDBUserManager');
const GoogleStorageManager = require('../GoogleStorageManager');
const User = require('../entities/User');
const inProduction = process.env.NODE_ENV === "production";
const CLIENT_URL = inProduction ? process.env.DOMAIN_NAME : "http://localhost:3000";
const createProfileUpload =
    uploadCreateUserProfile.fields([{ name: 'userProfileImageCropped', maxCount: 1 }, { name: 'userProfileImageOriginal', maxCount: 1 }])
const _ = require('lodash');
const fs = require('fs');

router.post('/createProfile', createProfileUpload, async (req, res) => {
  const nickname = req.body.nickname;
  const genre = req.body.genre;

  const nicknameExists = await MongoDBUserManager.nicknameExists(nickname);
  if (nicknameExists) {
    res.send(true);
  } else {
    const createdUserProfile =
        new User.Builder()
        .setNickname(nickname)
        .setNumOfFollowers(0)
        .setNumOfFollowing(0)
        .setGenre(genre)
        .setNumOfPosts(0)
        .build();

    await MongoDBUserManager.createProfile(createdUserProfile, req.user._id);

    if (req.files['userProfileImageCropped']) {
      const original = req.files['userProfileImageOriginal'][0];
      const cropped = req.files['userProfileImageCropped'][0];
      await GoogleStorageManager.uploadUserImageProfileToBucket(GoogleStorageManager.STORAGE.BUCKET.USER_PROFILE, original, req.user._id, false);
      await GoogleStorageManager.uploadUserImageProfileToBucket(GoogleStorageManager.STORAGE.BUCKET.USER_PROFILE, cropped, req.user._id, true);
      try {
        fs.unlinkSync('uploads/' + original.filename)
        //file removed
      } catch(err) {
        console.error(err)
      }
      try {
        fs.unlinkSync('uploads/' + cropped.filename)
        //file removed
      } catch(err) {
        console.error(err)
      }
    }
    res.send(false);
  }
})

router.post('/editProfile', createProfileUpload, async (req, res) => {
  const nickname = req.body.nickname;
  const genre = req.body.genre;

  if (_.lowerCase(nickname) !== _.lowerCase(req.user.nickname)) {
    const nicknameExists = await MongoDBUserManager.nicknameExists(nickname);
    if (nicknameExists) {
      res.send(true);
    }
  } else {
    const editedUserBuilder =
        new User.Builder()
        .setNickname(nickname)
        .setGenre(genre)
        .build();

    const editedUserProfile = await MongoDBUserManager.editProfile(editedUserBuilder, req.user._id);
    if (req.files['userProfileImageCropped']) {
      const original = req.files['userProfileImageOriginal'][0];
      const cropped = req.files['userProfileImageCropped'][0];
      await GoogleStorageManager.uploadUserImageProfileToBucket(GoogleStorageManager.STORAGE.BUCKET.USER_PROFILE, original, req.user._id, false);
      await GoogleStorageManager.uploadUserImageProfileToBucket(GoogleStorageManager.STORAGE.BUCKET.USER_PROFILE, cropped, req.user._id, true);
      try {
        fs.unlinkSync('uploads/' + original.filename)
        //file removed
      } catch(err) {
        console.error(err)
      }
      try {
        fs.unlinkSync('uploads/' + cropped.filename)
        //file removed
      } catch(err) {
        console.error(err)
      }
    }
    res.send(false);
  }
});

router.post('/follow', (req, res) => {

})

router.post('/delete', async (req, res) => {
  const deletedUser = await MongoDBUserManager.delete(req.user._id);
  if (deletedUser) {
    res.send(true);
  } else {
    res.send(false);
  }
})

router.post('/getProfile', uploadCreateUserProfile.none(), async (req, res) => {
  const userId = req.body.userId;
  const user = await MongoDBUserManager.getProfile(userId);
  const userProfileImageUrl = await GoogleStorageManager.downloadUserProfileImage(
    userId,
    GoogleStorageManager.STORAGE.BUCKET.USER_PROFILE,
    true
  );
  res.send({
    user: user,
    profileImageUrl: userProfileImageUrl
  });
});

router.post('/getProfileImageUrl', uploadCreateUserProfile.none(), async (req, res) => {
  const userId = req.body.userId;
  const userProfileImageUrl = await GoogleStorageManager.downloadUserProfileImage(
    userId,
    GoogleStorageManager.STORAGE.BUCKET.USER_PROFILE,
    true
  )
  res.send({url: userProfileImageUrl});
})

module.exports = router;
