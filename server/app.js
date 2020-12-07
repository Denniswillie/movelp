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
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const multer  = require('multer');
const upload = multer();
const uploadFields = upload.fields([{ name: 'fileInput', maxCount: 10 }])
const {Storage} = require('@google-cloud/storage');
const projectId = 'movelp';
const keyFilename = path.join(__dirname, '/key.json');
const storage = new Storage({projectId, keyFilename});

// mongoose.connect("mongodb+srv://admin-dennis:JOUwExYMLOD7KkDn@movelpdb.8hxbz.mongodb.net/movelpDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb://localhost:27017/movelpDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

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

app.use('/auth', authRoutes);

app.post('/createPost', uploadFields, (req, res, next) => {
  console.log(req.files['fileInput']);
  console.log(req.body);
  res.end();
})

app.listen(port, () => {
  console.log(`Server has started at ${port}`);
});
