// Config_s3.js
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');






// Configure AWS S3
aws.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION || "ap-south-1",
});


const s3 = new aws.S3();


// Multer storage engine for S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read', // anyone can view the file (best for product images)
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const uniqueName = (null, Date.now().toString() + '-' + file.originalname);
            cb(null, `products/${uniqueName}`); // store insed products/ folder in S3
        },
    }),
    limits: { 
        fileSize: 5 * 1024 * 1024,   // Limit file size to 5MB     
    },
});


module.exports = { upload, s3 };