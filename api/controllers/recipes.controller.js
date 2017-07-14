var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

module.exports.getRecipes = function(req, res){

	var offset = 0;
	var count = 5;

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset, 10);
	}

	if(req.query && req.query.count){
		count = parseInt(req.query.count, 10);
	}

	Recipe
		.find({isDeleted: {$in: [null, false]}})
		.skip(offset)
		.limit(count)
		.exec(function(err, recipes){
			console.log("Found recipes", recipes.length);
			res
				.json(recipes);
		});

}

module.exports.getRecipe = function(req, res){
	var recipeId = req.params.recipeId;

	Recipe
		.findById(recipeId)
		.select('_id name description price photos products isPublished')
		.exec(function(err, recipe){
			console.log("Found recipe", recipe);

			res
				.status(200)
				.json(recipe);
		})
}

module.exports.addRecipe = function(req, res){
	var db = dbconn.get();
	var collection = db.collection('recipes');
	var newRecipe = {};

	if(req.body && req.body.name && req.body.price && req.body.weight){
		newRecipe = {
			name: req.body.name,
			price: req.body.price,
			weight: req.body.weight
		}

		collection
			.insertOne(newRecipe, function(err, response){
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

module.exports.updateRecipe = function(req, res){
	var db = dbconn.get();
	var collection = db.collection('recipes');
	var recipeId = req.params.recipeId;
	var dbRecipe = {};

	collection
		.findOne({"_id": ObjectId(recipeId)}, function(err, doc){
			res
				.status(200)
				.json(doc);
		})


	if(req.body && req.body.name && req.body.price && req.body.weight){
		newRecipe = {
			name: req.body.name,
			price: req.body.price,
			weight: req.body.weight
		}

		collection
			.insertOne(newRecipe, function(err, response){
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

module.exports.deleteRecipe = function(req, res){
	var db = dbconn.get();
	var collection = db.collection('recipes');
	var recipeId = req.params.recipeId;
	var dbRecipe = {};

	collection
		.findOne({"_id": ObjectId(recipeId)}, function(err, doc){
			res
				.status(200)
				.json(doc);
		})


	if(req.body && req.body.name && req.body.price && req.body.weight){
		newRecipe = {
			name: req.body.name,
			price: req.body.price,
			weight: req.body.weight
		}

		collection
			.insertOne(newRecipe, function(err, response){
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