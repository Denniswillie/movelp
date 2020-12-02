const router = require('express').Router();
const passport = require('passport');
const inProduction = process.env.NODE_ENV === "production";
const DOMAIN_NAME = "http://movelp.com";
const CLIENT_URL = inProduction ?

app.get("/google",
  passport.authenticate('google', { scope: ["profile", "email"] })
);

app.get("/logout", function(req, res){
  req.logout();
  res.redirect(CLIENT_URL);
});

app.get("/google/movelp",
  passport.authenticate('google', { failureRedirect: CLIENT_URL, successRedirect: CLIENT_URL })
);

app.get("/isLoggedIn", function(req, res) {
  res.json({
    user: req.user
  });
});
