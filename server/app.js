require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const inProduction = process.env.NODE_ENV === "production";
const mongoose = require('mongoose');
const path = require('path');
const CLIENT_URL = inProduction ? process.env.DOMAIN_NAME : "http://localhost:3000";
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');

if (inProduction) {
  mongoose.connect("mongodb+srv://admin-dennis:JOUwExYMLOD7KkDn@movelpdb.8hxbz.mongodb.net/movelpDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
} else {
  mongoose.connect("mongodb://localhost:27017/movelpDB", {useNewUrlParser: true, useUnifiedTopology: true});
}
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

if (inProduction) {
  app.use(express.static('desktop-client/build'));
  app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../desktop-client/build/index.html'));
  })
  app.get('/profile/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../desktop-client/build/index.html'));
  })
  app.get('/movie/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../desktop-client/build/index.html'));
  })
  app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../desktop-client/build/index.html'));
  })
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "535510n53cr3t",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server has started at ${port}`)
});
