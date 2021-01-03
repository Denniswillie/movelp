const router = require('express').Router();
const passport = require('passport');
const inProduction = process.env.NODE_ENV === "production";
const CLIENT_URL = inProduction ? process.env.DOMAIN_NAME : "http://localhost:3000";
const GoogleStorageManager = require('../GoogleStorageManager');

router.get("/google",
  passport.authenticate('google', { scope: ["profile", "email"] })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google/movelp",
  passport.authenticate('google', { failureRedirect: CLIENT_URL, successRedirect: CLIENT_URL })
);

router.get("/isLoggedIn", async (req, res) => {
  if (req.user) {
    const userProfileImageUrlOriginal = await GoogleStorageManager.downloadUserProfileImage(
      req.user._id,
      GoogleStorageManager.STORAGE.BUCKET.USER_PROFILE,
      false
    );
    const userProfileImageUrlCropped = await GoogleStorageManager.downloadUserProfileImage(
      req.user._id,
      GoogleStorageManager.STORAGE.BUCKET.USER_PROFILE,
      true
    );
    res.send({
      user: req.user,
      profileImageUrlOriginal: userProfileImageUrlOriginal,
      profileImageUrlCropped: userProfileImageUrlCropped
    });
  } else {
    res.send(undefined);
  }
});

module.exports = router;
