const express = require('express');
const { getAddresses, addAddresses, updateAddress, deleteAddress } = require('../controllers/addressController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();


// get(list), post(create)
router.get('/', authMiddleware, getAddresses);
router.post('/', authMiddleware, addAddresses); 


// put(update), delete(remove)
router.put('/:addressId', authMiddleware, updateAddress);
router.delete('/:addressId', authMiddleware, deleteAddress);




module.exports = router;
