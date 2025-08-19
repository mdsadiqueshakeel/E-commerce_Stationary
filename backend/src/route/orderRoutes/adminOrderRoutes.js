const express = require('express');
const { getAllOrders, getOrderById, updateOrders, deleteOrders } = require('../../controllers/orderControllers/adminOrderController');
const { authMiddleware } = require('../../middleware/auth');


const router = express.Router();


router.get('/', authMiddleware, getAllOrders);
router.get('/:id', authMiddleware, getOrderById);
router.patch('/:id/status', authMiddleware, updateOrders);
router.delete('/:id', authMiddleware, deleteOrders);




module.exports = router;