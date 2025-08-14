const express = require('express');
const { getUserProducts, getUserProductsById } = require('../../controllers/productControllers/userController');
const { authMiddleware } = require('../../middleware/auth');

const router = express.Router();


router.get('/', getUserProducts);          // Endpoint to get products for a user
router.get('/:id', getUserProductsById);      // Endpoint to get a specific product by ID






module.exports = router;