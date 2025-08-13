const express = require('express');
const { getAdminProducts, createProduct, updateProduct, changeStatus, deleteProduct } = require('../../controllers/productControllers/adminController');
const { authMiddleware } = require('../../middleware/auth');


const router = express.Router();


router.get('/admin/products', authMiddleware, getAdminProducts);
router.post('/admin/products/create', authMiddleware, createProduct);
router.put('/admin/products/:id', authMiddleware, updateProduct);
router.patch('admin/products/:id/status', authMiddleware, changeStatus);
router.delete('admin/products/:id/delete', authMiddleware, deleteProduct);




module.exports = router;