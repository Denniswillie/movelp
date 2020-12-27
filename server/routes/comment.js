const multer  = require('multer');
const upload = multer();
const uploadFields = upload.array('fileInput[]', 10);
const router = require('express')();
const _ = require('lodash');
const MongoDBCommentManager = require('../managers/mongoDB/MongoDBCommentManager');
const Comment = require('../entities/Comment');
const GoogleStorageManager = require('../GoogleStorageManager');
const inProduction = process.env.NODE_ENV === "production";
const CLIENT_URL = inProduction ? process.env.DOMAIN_NAME : "http://localhost:3000";

module.exports = router;
