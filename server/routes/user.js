const multer  = require('multer');
const uploadCreateUserProfile = multer({ dest: 'uploads/' });
const router = require('express')();
const MongoDBUserManager = require('../managers/mongoDB/MongoDBUserManager');
const GoogleStorageManager = require('../GoogleStorageManager');
const User = require('../entities/User');
const inProduction = process.env.NODE_ENV === "production";
const CLIENT_URL = inProduction ? process.env.DOMAIN_NAME : "http://localhost:3000";

router.post('/createProfile', uploadCreateUserProfile.single('userProfileImage'), async (req, res) => {
  const nickname = req.body.nickname;
  const file = req.file;

  const nicknameExists = await MongoDBUserManager.nicknameExists(nickname);
  if (nicknameExists) {
    res.send(true);
  } else {
    const createdUserProfile =
        new User.Builder()
        .setNickname(nickname)
        .setNumOfFollowers(0)
        .setNumOfFollowing(0)
        .build();

    await MongoDBUserManager.createOrEditProfile(createdUserProfile, req.user._id);
    if (file) {
      await GoogleStorageManager.uploadSingleToBucket(GoogleStorageManager.STORAGE.BUCKET.USER_PROFILE, file, req.user._id);
    }
    res.send(false);
  }
})

router.post('/editProfile', (req, res) => {

});

router.post('/follow', (req, res) => {

})

router.post('/delete', (req, res) => {

})

module.exports = router;
