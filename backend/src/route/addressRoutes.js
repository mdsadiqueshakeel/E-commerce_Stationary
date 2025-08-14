const express = require('express');
const { getAddresses, addAddresses } = require('../controllers/addressController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getAddresses);
router.post('/', authMiddleware, addAddresses); // Assuming you want to allow POST for creating addresses




module.exports = router;
