var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports.getProducts = function(req, res){

	var offset = 0;
	var count = 5;

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset, 10);
	}

	if(req.query && req.query.count){
		count = parseInt(req.query.count, 10);
	}

	Product
		.find({isDeleted: {$in: [null, false]}})
		.skip(offset)
		.limit(count)
		.select({isDeleted: false})
		.exec(function(err, products){
			console.log("Found products", products.length);
			res
				.json(products);
		});

}

module.exports.getProduct = function(req, res){
	var productId = req.params.productId;

	Product
		.findById(productId)
		.exec(function(err, product){
			console.log("Found product", product);

			res
				.status(200)
				.json(product);
		})
}

module.exports.addProduct = function(req, res){
	var db = dbconn.get();
	var collection = db.collection('products');
	var newProduct = {};

	if(req.body && req.body.name && req.body.price && req.body.weight){
		newProduct = {
			name: req.body.name,
			price: req.body.price,
			weight: req.body.weight
		}

		collection
			.insertOne(newProduct, function(err, response){
				console.log(response.ops);
				res
					.status(201)
					.json(response.ops);
			})
	} else {
		console.log("Data missing from body");
		res
			.status(400)
			.json({message : "Required data missing from body"});
	}
}

module.exports.updateProduct = function(req, res){
	var db = dbconn.get();
	var collection = db.collection('products');
	var productId = req.params.productId;
	var dbProduct = {};

	collection
		.findOne({"_id": ObjectId(productId)}, function(err, doc){
			res
				.status(200)
				.json(doc);
		})


	if(req.body && req.body.name && req.body.price && req.body.weight){
		newProduct = {
			name: req.body.name,
			price: req.body.price,
			weight: req.body.weight
		}

		collection
			.insertOne(newProduct, function(err, response){
				console.log(response.ops);
				res
					.status(201)
					.json(response.ops);
			})
	} else {
		console.log("Data missing from body");
		res
			.status(400)
			.json({message : "Required data missing from body"});
	}
}

module.exports.deleteProduct = function(req, res){
	var db = dbconn.get();
	var collection = db.collection('products');
	var productId = req.params.productId;
	var dbProduct = {};

	collection
		.findOne({"_id": ObjectId(productId)}, function(err, doc){
			res
				.status(200)
				.json(doc);
		})


	if(req.body && req.body.name && req.body.price && req.body.weight){
		newProduct = {
			name: req.body.name,
			price: req.body.price,
			weight: req.body.weight
		}

		collection
			.insertOne(newProduct, function(err, response){
				console.log(response.ops);
				res
					.status(201)
					.json(response.ops);
			})
	} else {
		console.log("Data missing from body");
		res
			.status(400)
			.json({message : "Required data missing from body"});
	}
}