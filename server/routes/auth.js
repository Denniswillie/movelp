const router = require('express').Router();
const passport = require('passport');
const inProduction = process.env.NODE_ENV === "production";
const DOMAIN_NAME = "http://movelp.com";
const CLIENT_URL = inProduction ?

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile", "email"] })
);

app.get("/auth/logout", function(req, res){
  req.logout();
  res.redirect(CLIENT_URL);
});

app.get("/auth/google/movelp",
  passport.authenticate('google', { failureRedirect: CLIENT_URL, successRedirect: CLIENT_URL })
);

app.get("/auth/isLoggedIn", function(req, res) {
  res.json({
    user: req.user
  });
});
