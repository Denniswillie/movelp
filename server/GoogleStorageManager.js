"use strict";
// jshint esversion:6

const {Storage} = require('@google-cloud/storage');
const projectId = 'movelp';
const path = require('path');
const keyFilename = path.join(__dirname, '/key.json');
const storage = new Storage({projectId, keyFilename});
const { v4: uuidv4 } = require('uuid');

/**
 * This class is responsible for storing and downloading files from
 * Google Cloud Storage.
 */

class GoogleStorageManager {
  static STORAGE = {
    FILE_TYPE: {
      IMAGE: ".img",
      VIDEO: ".vid"
    },
    DOWNLOAD_OPTIONS: {
      action: "read",
      expires: '12-31-9999'
    },
    BUCKET: {
      USER_PROFILE: storage.bucket('movelp_user_profile'),
      POST: storage.bucket('movelp_post')
    },
    UPLOAD_OPTIONS: (itemId) => {
      return {
        destination: itemId,
        resumable: true,
        validation: 'crc32c'
      }
    }
  }

  static async uploadMultipleToBucket(bucket, requestFiles) {
    if (requestFiles.length <= 0) {
      console.log('No files uploaded');
      return;
    }

    const promises = [];
    for (var i = 0; i < requestFiles.length; i++) {
      const blob = bucket.file(requestFiles[i].originalname);
      const blobStream = blob.createWriteStream();
      blob.name = uuidv4();
      promises.push(blob.name);
      blobStream.on('error', err => {
        return err;
      });

      blobStream.on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
      });

      blobStream.end(requestFiles[i].buffer);
    }
    const result = await Promise.all(promises);
    return result;
  }

  static async downloadFilesForMultiplePosts(posts, bucket) {
    const urls = [];
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].fileIds.length > 0) {
        urls.push(await this.downloadFilesForSinglePost(posts[i], this.STORAGE.BUCKET.POST));
      } else {
        urls.push([]);
      }
    }
    const result = await Promise.all(urls);
    return result;
  }

  static async downloadFilesForSinglePost(post, bucket) {
    const promises = [];
    if (!post.fileIds || post.fileIds.length <= 0) {
      return [];
    }
    console.log(post._id);
    var counterTrialPerFile = 0;
    for (var i = 0; i < post.fileIds.length; i++) {
      if (counterTrialPerFile > 3) {
        counterTrialPerFile = 0;
        continue;
      }
      const file = await bucket.file(post.fileIds[i]);
      const fileExists = await file.exists();
      console.log(fileExists);
      if (fileExists[0]) {
        const signedUrlList = await file.getSignedUrl(this.STORAGE.DOWNLOAD_OPTIONS);
        promises.push(signedUrlList[0]);
      } else {
        await setTimeout(() => {
          i--;
          counterTrialPerFile++;
        }, 2000);
      }
    }
    const urls = await Promise.all(promises);
    return urls;
  }

  static async deleteMultipleFiles(filesIds, bucket) {
    for (var i = 0; i < filesIds.length; i++) {
      await bucket.file(filesIds[i]).delete();
    }
  }

  static async deleteFile(fileId, bucket) {
    await bucket.file(fileId).delete();
  }
}

module.exports = GoogleStorageManager;
