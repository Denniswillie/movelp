require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const inProduction = process.env.NODE_ENV === "production";
const mongoose = require('mongoose');
const path = require('path');
const DOMAIN_NAME = "http://movelp.com";
const CLIENT_URL = inProduction ? DOMAIN_NAME : "http://localhost:3000";
const AUTH_REDIRECT_URL = inProduction ? DOMAIN_NAME : "http://localhost:5000";

if (inProduction) {
  app.use(express.static('desktop-client/build'));
  app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../desktop-client/build/index.html'))
  })
}

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "535510n53cr3t",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: CLIENT_URL
  })
);

mongoose.connect("mongodb+srv://admin-dennis:JOUwExYMLOD7KkDn@movelpdb.8hxbz.mongodb.net/movelpDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect("mongodb://localhost:27017/movelpDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  username: String,
  password: String,
  googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: AUTH_REDIRECT_URL + "/auth/google/movelp",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ username: profile.emails[0].value, googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile", "email"] })
);

app.get("/logout", function(req, res){
  req.logout();
  res.redirect(CLIENT_URL);
});

app.get("/auth/google/movelp",
  passport.authenticate('google', { failureRedirect: CLIENT_URL, successRedirect: CLIENT_URL })
);

app.get("/isLoggedIn", function(req, res) {
  res.json({
    user: req.user
  });
});


app.listen(port, () => {
  console.log(`Server has started at ${port}`);
});
