var express = require('express');
var router = express.Router();

var productsController = require('../controllers/products.controller.js');

router
	.route('/products')
	.get(productsController.getProducts);
router
	.route('/products/:productId')
	.get(productsController.getProduct);
router
	.route('/products')
	.post(productsController.addProduct);

module.exports = router;