const router = require('express')();
const multer  = require('multer');
const upload = multer();
const _ = require('lodash');
const MongoDBCommentManager = require('../managers/mongoDB/MongoDBCommentManager');
const Comment = require('../entities/Comment');
const GoogleStorageManager = require('../GoogleStorageManager');
const inProduction = process.env.NODE_ENV === "production";
const CLIENT_URL = inProduction ? process.env.DOMAIN_NAME : "http://localhost:3000";

router.post('/create', upload.none(), async (req, res) => {
  const postId = req.body.postId;
  const creatorId = req.user._id;
  const creatorName = req.user.nickname;
  const timeOfCreation = new Date();
  const text = req.body.text;
  const noOfLikes = 0;
  const isEdited = false;

  console.log(creatorName);

  const comment =
      new Comment.Builder()
      .setPostId(postId)
      .setCreatorId(creatorId)
      .setCreatorName(creatorName)
      .setTimeOfCreation(timeOfCreation)
      .setText(text)
      .setNoOfLikes(noOfLikes)
      .setIsEdited(isEdited)
      .build();

  const createdComment = await MongoDBCommentManager.create(comment);
  res.send(createdComment);
});

router.post('/get', upload.none(), async (req, res) => {
  const postId = req.body.postId;
  const comments = await MongoDBCommentManager.get(postId);
  res.send(comments);
});

router.post('/edit', upload.none(), async (req, res) => {
  const commentId = req.body.commentId;
  const text = req.body.text;
  const isEdited = true;
  const commentBuilder =
      new Comment.Builder()
      .setText(text)
      .setIsEdited(isEdited);
  await MongoDBCommentManager.edit(commentId, commentBuilder);
  res.end();
});

module.exports = router;
