// Config_s3.js
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const multer = require('multer');



// Memory storage for multer (keeps files in memory as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 5, // Max 5 files
    },
 });



// Create S3 client (AWS SDK v3)
const s3 = new S3Client({
  region: process.env.AWS_S3_REGION, // e.g. "ap-south-1"
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});



/**
 * Upload file buffer to S3
 * @param {Object} file - Multer file object
 * @param {string} key - File name to save in S3
 */



async function uploadToS3(file, key) {
  const upload = new Upload({
    client: s3, // ✅ must be S3Client
    params: {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    },
  });

  upload.on("httpUploadProgress", (progress) => {
    console.log("Upload progress:", progress);
  });

  return await upload.done();
}






module.exports = { upload, s3, uploadToS3 };