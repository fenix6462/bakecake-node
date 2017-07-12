var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;

module.exports.getProducts = function(req, res){

	var db = dbconn.get();
	var collection = db.collection('products');

	var offset = 0;
	var count = 5;

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset, 10);
	}

	if(req.query && req.query.count){
		count = parseInt(req.query.count, 10);
	}

	collection
		.find()
		.skip(offset)
		.limit(count)
		.toArray(function(err, docs){
			console.log("Found products", docs);
			res
				.status(200)
				.json(docs)
		});

}

module.exports.getProduct = function(req, res){
	var db = dbconn.get();
	var collection = db.collection('products');

	var productId = req.params.productId;

	collection
		.findOne({"_id": ObjectId(productId)}, function(err, doc){
			console.log("GET product with Id = ", productId);

			res
				.status(200)
				.json(doc);
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