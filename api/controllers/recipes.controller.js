var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');
var utc = new Date();
utc.setHours( utc.getHours() + 2);

module.exports.getRecipes = function(req, res){

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

	Recipe
		.find({isDeleted: {$in: [null, false]}})
		.select('_id name weight price photos')
		.skip(offset)
		.limit(count)
		.exec(function(err, recipes){
			if(err){
				console.log("Error finding recipes")
				res
					.status(500)
					.json(err);
			} else {
				console.log("Found recipes", recipes.length);
				res
					.status(200)
					.json(recipes);
			}
		});
}

module.exports.getPublishedRecipes = function(req, res){

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

	Recipe
		.find({isPublished: true})
		.select('_id name description price photos products isPublished')
		.skip(offset)
		.limit(count)
		.exec(function(err, recipes){
			if(err){
				console.log("Error finding recipes")
				res
					.status(500)
					.json(err);
			} else {				
				console.log("Found recipes", recipes.length);
				res
					.status(200)
					.json(recipes);
			}
		});
}

module.exports.getRecipe = function(req, res){
	var recipeId = req.params.recipeId;

	Recipe
		.findById(recipeId)
		.select('_id name description price photos products isPublished')
		.exec(function(err, recipe){
			if(err){
				console.log("Error finding recipe");
				res
					.status(500)
					.json(err);
			} else if (!recipe){
				res
					.status(404)
					.json({
						"message": "Recipe ID not found"
					});
			} else {
				console.log("Found recipe", recipe);
				res
					.status(200)
					.json(recipe);
			}
		})
}

module.exports.addRecipe = function(req, res){
	Recipe
		.create({
			name: req.body.name,
			description: req.body.description,
			price: parseFloat(req.body.price).toFixed(2),
			products: req.body.products,
			photos: req.body.photos,
			createdAt: utc,
			updatedAt: utc
		}, function(err, recipe){
			if(err){
				console.log("Error creating recipe");
				res
					.status(400)
					.json(err);
			} else {
				console.log("Recipe created", recipe);
				res
					.status(201)
					.json(recipe);
			}
		})
}

module.exports.updateRecipe = function(req, res){
	var recipeId = req.params.recipeId;

	Recipe
		.findById(recipeId)
		.select('_id name description price photos products isPublished')
		.exec(function(err, recipe){
			if(err){
				console.log("Error finding recipe");
				res
					.status(500)
					.json(err);
			} else if (!recipe){
				res
					.status(404)
					.json({
						"message": "Recipe ID not found"
					});
			} else {
				recipe.name = req.body.name;
				recipe.description = req.body.description;
				recipe.price = parseFloat(req.body.price).toFixed(2);
				recipe.products = req.body.products;
				recipe.photos = req.body.photos;
				recipe.updatedAt = utc;

				recipe.save(function(err, updatedRecipe){
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


module.exports.deleteRecipe = function(req, res){
	var recipeId = req.params.recipeId;

	Recipe
		.findById(recipeId)
		.select("isDeleted")
		.exec(function(err, recipe){
			if(err){
				console.log("Error finding recipe");
				res
					.status(500)
					.json(err);
			} else if (!recipe){
				res
					.status(404)
					.json({
						"message": "Recipe ID not found"
					});
			} else {
				console.log("Recipe deleted, id: ", recipe);
				recipe.isDeleted = true;
				recipe.deletedAt = utc;
				recipe.save(function(err, updatedRecipe){
					res
						.status(204)
						.json();
				})
			}
		})
}

module.exports.publishRecipe = function(req, res){
	var recipeId = req.params.recipeId;

	Recipe
		.findById(recipeId)
		.select("isPublished")
		.exec(function(err, recipe){
			if(err){
				console.log("Error finding recipe");
				res
					.status(500)
					.json(err);
			} else if (!recipe){
				res
					.status(404)
					.json({
						"message": "Recipe ID not found"
					});
			} else {
				recipe.isPublished = true;
				recipe.publishedAt = utc;
				recipe.save(function(err, updatedRecipe){
					res
						.status(200)
						.json({
							message: "Recipe published"
						});
				})
			}
		})
}


module.exports.unpublishRecipe = function(req, res){
	var recipeId = req.params.recipeId;

	Recipe
		.findById(recipeId)
		.select("isPublished")
		.exec(function(err, recipe){
			if(err){
				console.log("Error finding recipe");
				res
					.status(500)
					.json(err);
			} else if (!recipe){
				res
					.status(404)
					.json({
						"message": "Recipe ID not found"
					});
			} else {
				recipe.isPublished = false;
				recipe.publishedAt = null;
				recipe.save(function(err, updatedRecipe){
					res
						.status(200)
						.json({
							message: "Recipe unpublished"
						});
				})
			}
		})
}

