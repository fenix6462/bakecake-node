var productsData = require('../data/products.json');

module.exports.getProducts = function(req, res){
	var offset = 0;
	var count = 5;

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset, 10);
	}

	if(req.query && req.query.count){
		count = parseInt(req.query.count, 10);
	}

	var returnData = productsData.slice(offset, offset+count);

	console.log("GET products");

	res
		.status(200)
		.json(returnData)
}
module.exports.getProduct = function(req, res){
	var productId = req.params.productId;
	var product = productsData.find(function(element){
		return element.id == productId;
	})
	console.log("GET product with Id = ", productId);
	res
		.status(200)
		.json(product)
}

module.exports.addProduct = function(req, res){
	console.log("POST product");
	console.log(req.body);
	res
		.status(200)
		.json(req.body);
}