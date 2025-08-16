const express = require('express');
const { getAdminProducts, createProduct, updateProduct, changeStatus, deleteProduct } = require('../../controllers/productControllers/adminController');
const { authMiddleware } = require('../../middleware/auth');
const { upload, s3 } = require('../../config/s3_config');
const { imageSizeLimit } = require('../../middleware/imageSizeLimit');


const router = express.Router();


router.get("/", authMiddleware, getAdminProducts);
router.post('/create', authMiddleware, upload.array('images', 5), createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.patch('/:id/status', authMiddleware, changeStatus);
router.delete('/:id/delete', authMiddleware, deleteProduct);




module.exports = router;