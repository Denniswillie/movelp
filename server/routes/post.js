const multer  = require('multer');
const upload = multer();
const uploadFields = upload.array('fileInput[]', 10);
const router = require('express')();
const _ = require('lodash');
const MongoDBPostManager = require('../managers/mongoDB/MongoDBPostManager');
const Post = require('../entities/Post');
const GoogleStorageManager = require('../GoogleStorageManager');
const inProduction = process.env.NODE_ENV === "production";
const CLIENT_URL = inProduction ? process.env.DOMAIN_NAME : "http://localhost:3000";

router.post('/create/:type', uploadFields, async (req, res) => {
  const type = _.toLower(req.params.type);
  const requestFiles = req.files;

  var fileIds;

  if (requestFiles) {
    fileIds = await GoogleStorageManager.uploadMultipleToBucket(
      GoogleStorageManager.STORAGE.BUCKET.POST,
      requestFiles
    );
  } else {
    fileIds = [];
  }

  const postBuilder = new Post.Builder();

  if (type === Post.TYPES.GENERAL) {
    postBuilder.setMovieIds(req.body.chosenMoviesIds);
  } else if (type === Post.TYPES.RECOMMENDATION) {
    postBuilder.setMovieIds(req.body.chosenMoviesIds)
        .setRating(parseInt(req.body.rating));
  } else if (type === Post.TYPES.DIARY) {
    postBuilder.setMovieIds(req.body.chosenMoviesIds)
        .setTitle(req.body.title);
  } else if (type !== Post.TYPES.ASK_SUGGESTION) {
    throw new Error("No such post type exists!");
  }

  const post =
      postBuilder.setCreatorId(req.user._id)
      .setFileIds(fileIds)
      .setType(type)
      .setText(req.body.text)
      .setTimeOfCreation(new Date())
      .setNoOfLikes(0)
      .setNoOfComments(0)
      .setIsEdited(false)
      .build();

  await MongoDBPostManager.create(post);
  res.redirect(CLIENT_URL);
})

router.get('/get', async (req, res) => {
  const docs = await MongoDBPostManager.getAll();
  const urls = await GoogleStorageManager.downloadFilesForMultiplePosts(
      docs, GoogleStorageManager.STORAGE.BUCKET.POST
  );
  res.send([docs, urls]);
})

router.post('/edit', upload.none(), async (req, res) => {
  const postId = req.body.postId;
  const type = req.body.postType;

  const postBuilder = new Post.Builder();

  if (type === Post.TYPES.GENERAL) {
    postBuilder.setMovieIds(req.body.chosenMoviesIds);
  } else if (type === Post.TYPES.RECOMMENDATION) {
    postBuilder.setRating(req.body.rating)
        .setMovieIds(req.body.chosenMoviesIds);
  } else if (type === Post.TYPES.DIARY) {
    postBuilder.setTitle(req.body.title)
        .setMovieIds(req.body.chosenMoviesIds);
  } else if (type !== Post.TYPES.ASK_SUGGESTION) {
    throw new Error("No such post type exists");
  }

  postBuilder.setCreatorId(req.user._id)
      .setIsEdited(true)
      .setText(req.body.text)
      .setType(type);

  await MongoDBPostManager.edit(postId, postBuilder);

  console.log(postBuilder);
  res.redirect(CLIENT_URL);
});

router.post('/delete', upload.none(), async (req, res) => {
  const postId = req.body.postId;
  const fileIds = req.body.fileIds;
  await MongoDBPostManager.delete(postId);
  await GoogleStorageManager.deleteMultipleFiles(fileIds);
});

router.post('/deleteFile', upload.none(), async (req, res) => {
  const fileId = req.body.fileId;
  await GoogleStorageManager.deleteFile(fileId);
})

module.exports = router;
