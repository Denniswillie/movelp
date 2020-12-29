const router = require('express').Router();
const passport = require('passport');
const inProduction = process.env.NODE_ENV === "production";
const CLIENT_URL = inProduction ? process.env.DOMAIN_NAME : "http://localhost:3000"

router.get("/google",
  passport.authenticate('google', { scope: ["profile", "email"] })
);

router.get("/logout", function(req, res){
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google/movelp",
  passport.authenticate('google', { failureRedirect: CLIENT_URL, successRedirect: CLIENT_URL })
);

router.get("/isLoggedIn", function(req, res) {
  res.send(req.user);
});

module.exports = router;
