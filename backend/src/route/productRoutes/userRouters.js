const express = require('express');
const { getUserProducts, getUserProductsById } = require('../../controllers/productControllers/userController');
const { authMiddleware } = require('../../middleware/auth');

const router = express.Router();


router.get('/products', getUserProducts);          // Endpoint to get products for a user
router.get('/products/:id', getUserProductsById);      // Endpoint to get a specific product by ID






module.exports = router;