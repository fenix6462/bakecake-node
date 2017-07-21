var connection = require('../data/dbconnection.js');
var utc = new Date();
utc.setHours( utc.getHours() + 2);

module.exports.getProducts = function(req, res){

	var offset = 0;
	var count = 5;

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset, 10);
	}

	if(req.query && req.query.count){
		count = parseInt(req.query.count, 10);
	}

	if(isNaN(offset) || isNaN(count)){
		res
			.status(400)
			.json({
				"message": "If supplied in querystring count and offset should be numbers"
			});
		return;
	}

	Product
		.find()
		.select('_id name description price photos products isPublished')
		.skip(offset)
		.limit(count)
		.exec(function(err, products){
			if(err){
				console.log("Error finding products")
				res
					.status(500)
					.json(err);
			} else {
				console.log("Found products", products.length);
				res
					.status(200)
					.json(products);
			}
		});

}

module.exports.getProduct = function(req, res){
	var productId = req.params.productId;

	Product
		.findById(productId)
		.select("_id name weight price photo")
		.exec(function(err, product){
			if(err){
				console.log("Error finding product");
				res
					.status(500)
					.json(err);
			} else if (!product){
				res
					.status(404)
					.json({
						"message": "Product ID not found"
					});
			} else {
				console.log("Found product", product);
				res
					.status(200)
					.json(product);
			}
		})
}

module.exports.addProduct = function(req, res){
	Product
		.create({
			name: req.body.name,
			weight: parseInt(req.body.weight),
			price: parseFloat(req.body.price).toFixed(2),
			photo: req.body.photo,
			createdAt: utc,
			updatedAt: utc
		}, function(err, product){
			if(err){
				console.log("Error creating product");
				res
					.status(400)
					.json(err);
			} else {
				console.log("Product created", product);
				res
					.status(201)
					.json(product);
			}
		})
}

module.exports.updateProduct = function(req, res){
	var productId = req.params.productId;

	Product
		.findById(productId)
		.select('_id name weight price photo')
		.exec(function(err, product){
			if(err){
				console.log("Error finding product");
				res
					.status(500)
					.json(err);
			} else if (!product){
				res
					.status(404)
					.json({
						"message": "Product ID not found"
					});
			} else {
				product.name = req.body.name;
				product.weight = parseInt(req.body.weight);
				product.price = parseFloat(req.body.price).toFixed(2);
				product.photo = req.body.photo;
				product.updatedAt = utc;

				product.save(function(err, updatedProduct){
					if(err){
						res
							.status(500)
							.json(err);
					} else {
						res
							.status(204)
							.json();
					}
				})
			}
		})
}

module.exports.deleteProduct = function(req, res){
	var productId = req.params.productId;

	Product
		.findById(productId)
		.select("isDeleted")
		.exec(function(err, product){
			if(err){
				console.log("Error finding product");
				res
					.status(500)
					.json(err);
			} else if (!product){
				res
					.status(404)
					.json({
						"message": "Product ID not found"
					});
			} else {
				console.log("Product deleted, id: ", product);
				product.isDeleted = true;
				product.deletedAt = utc;
				product.save(function(err, updatedProduct){
					res
						.status(204)
						.json();
				})
			}
		})
}