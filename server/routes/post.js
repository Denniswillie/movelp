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
      .setCreatorName(req.user.nickname)
      .setFileIds(fileIds)
      .setType(type)
      .setText(req.body.text)
      .setTimeOfCreation(new Date())
      .setNoOfLikes(0)
      .setNoOfComments(0)
      .setIsEdited(false)
      .build();

  const createdPost = await MongoDBPostManager.create(post);
  const urls = await GoogleStorageManager.downloadFilesForSinglePost(
    createdPost,
    GoogleStorageManager.STORAGE.BUCKET.POST
  );
  const creatorProfileImageUrl = await GoogleStorageManager.downloadUserProfileImage(req.user._id, GoogleStorageManager.STORAGE.BUCKET.USER_PROFILE);
  const liked = false;
  res.send({
    post: createdPost,
    urls: urls,
    liked: liked,
    creatorProfileImageUrl: creatorProfileImageUrl,
    userId: req.user._id
  });
})

router.get('/get', async (req, res) => {
  const userId = req.user._id;
  const [docs, liked] = await MongoDBPostManager.getAll(userId);
  const urls = await GoogleStorageManager.downloadFilesForMultiplePosts(
      docs, GoogleStorageManager.STORAGE.BUCKET.POST
  );
  const creatorProfileImageUrls = await GoogleStorageManager.downloadUserProfileImages(docs);
  res.send({
    posts: docs,
    urls: urls,
    liked: liked,
    creatorProfileImageUrls: creatorProfileImageUrls,
    userId: userId
  })
})

router.post('/getPostsByUser', upload.none(), (req, res) => {
  const userId = req.body.userId;
  const creatorId = req.body.creatorId;
});

router.post('/getMoviesSpecificPosts', upload.none(), (req, res) => {

})

router.post('/edit', uploadFields, async (req, res) => {
  const postId = req.body.postId;
  const type = req.body.postType;
  const existingFileIds = req.body.fileInput ? req.body.fileInput : [];
  const deletedFileIds = req.body.deletedFileIds;
  const uploadedFiles = req.files;
  var uploadedFileIds = [];
  const movieIds = req.body.chosenMoviesIds ? req.body.chosenMoviesIds : [];

  const postBuilder = new Post.Builder();

  if (type === Post.TYPES.GENERAL) {
    postBuilder.setMovieIds(movieIds);
  } else if (type === Post.TYPES.RECOMMENDATION) {
    postBuilder.setRating(req.body.rating)
        .setMovieIds(movieIds);
  } else if (type === Post.TYPES.DIARY) {
    postBuilder.setTitle(req.body.title)
        .setMovieIds(movieIds);
  } else if (type !== Post.TYPES.ASK_SUGGESTION) {
    throw new Error("No such post type exists");
  }

  postBuilder.setCreatorId(req.user._id)
      .setIsEdited(true)
      .setText(req.body.text)
      .setType(type);

  // Delete deletedFileIds
  if (deletedFileIds) {
    await GoogleStorageManager.deleteMultipleFiles(deletedFileIds, GoogleStorageManager.STORAGE.BUCKET.POST);
  }

  // Store new uploaded files to Google Cloud Storage
  if (uploadedFiles.length > 0) {
    uploadedFileIds = await GoogleStorageManager.uploadMultipleToBucket(
      GoogleStorageManager.STORAGE.BUCKET.POST,
      uploadedFiles
    );
  } else {
    uploadedFileIds = [];
  }

  postBuilder.setFileIds(existingFileIds.concat(uploadedFileIds));

  const editedPost = await MongoDBPostManager.edit(postId, postBuilder);
  const urls = await GoogleStorageManager.downloadFilesForSinglePost(
    editedPost,
    GoogleStorageManager.STORAGE.BUCKET.POST
  );
  const liked = await MongoDBPostManager.userHasLiked(req.user._id, editedPost._id);
  const creatorProfileImageUrl = await GoogleStorageManager.downloadUserProfileImage(req.user._id, GoogleStorageManager.STORAGE.BUCKET.USER_PROFILE);

  res.send({
    post: editedPost,
    urls: urls,
    liked: liked,
    creatorProfileImageUrl: creatorProfileImageUrl,
    userId: req.user._id
  })
});

router.post('/delete', upload.none(), async (req, res) => {
  const postId = req.body.postId;
  const fileIds = req.body.fileIds;
  await MongoDBPostManager.delete(postId);
  res.status(200).send(true);
});

router.post('/toggleLike', upload.none(), async (req, res) => {
  const postId = req.body.postId;
  const userId = req.user._id;
  await MongoDBPostManager.createOrToggleLike(postId, userId);
  res.end();
});

module.exports = router;
