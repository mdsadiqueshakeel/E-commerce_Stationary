const { upload } = require('../config/s3_config');

async function imageSizeLimit(req, res, next) {
    await upload.array('images', 5)(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'Image too large. Max 5MB allowed.' });
            }
            if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({ error: 'Too many files. Max 5 files allowed.' });
            }
            return res.status(500).json({ error: 'Error during uploading images' });
        }

        try {
            if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
                console.error(req.files, req.files.length);
                return res.status(400).json({ error: 'No images uploaded.' });
            }

            // Extra manual size validation (optional)
            const maxSize = 5 * 1024 * 1024; // 5MB
            const oversize = req.files.find(file => file.size > maxSize);
            if (oversize) {
                return res.status(400).json({ error: `Image ${oversize.originalname} is too large. Max 5MB allowed.` });
            }

            next();
        } catch (error) {
            console.error("Error in imageSizeLimit:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
}

module.exports = { imageSizeLimit };