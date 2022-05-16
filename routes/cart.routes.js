const express = require('express');

const cartController = require('../controllers/cart.controller');

const router = express.Router();

router.get('/cart', cartController.getCart); // /cart/

router.post('/cart/items', cartController.addCartItem); // /cart/items

router.patch('/cart/items', cartController.updateCartItem);

module.exports = router;