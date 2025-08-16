const { upload } = require('../config/s3_config');

// Limit image size to 5MB
async function imageSizeLimit(req, res, next) {
    upload.array('images', 5)(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'Image too large. Max 5MB allowed.' });
            }

            if(err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({ error: 'Too many files. Max 5 files allowed.' });
            }

            return res.status(500).json({ error: 'Error during uploading images' });
        }


        if(!req.files || req.files.length === 0) {
            console.log(req.files, req.files.length );
            return res.status(400).json({ error: 'No images uploaded.' });
        }

        next();
    });
}



module.exports = { imageSizeLimit };