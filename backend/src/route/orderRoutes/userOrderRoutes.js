const express = require('express');
const { createOrders } = require('../../controllers/orderControllers/userOrderController');
const { authMiddleware } = require('../../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createOrders);

module.exports = router;