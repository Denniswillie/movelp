const multer  = require('multer');
const upload = multer();
const router = require('express')();
const MongoDBUserManager = require('../managers/mongoDB/MongoDBUserManager');
const inProduction = process.env.NODE_ENV === "production";
const CLIENT_URL = inProduction ? process.env.DOMAIN_NAME : "http://localhost:3000";

router.post('/nickname', upload.none(), async (req, res) => {
  const nickname = req.body.nickname;
  console.log(nickname);
  const nicknameExists = await MongoDBUserManager.nicknameExists(nickname);
  if (nicknameExists) {
    res.send(true)
  } else {
    await MongoDBUserManager.saveNickname(req.user._id, nickname);
    res.send(false);
  }
})

module.exports = router;
