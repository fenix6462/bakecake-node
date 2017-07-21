var express = require('express');
var router = express.Router();

var productsController = require('../controllers/products.controller.js');
// var recipesController = require('../controllers/recipes.controller.js');

// // Recipe

// router
// 	.route('/recipes')
// 	.get(recipesController.getRecipes)
// 	.post(recipesController.addRecipe);

// router
// 	.route('/recipes/published')
// 	.get(recipesController.getPublishedRecipes);

// router
// 	.route('/recipes/:recipeId')
// 	.get(recipesController.getRecipe)
// 	.put(recipesController.updateRecipe)
// 	.delete(recipesController.deleteRecipe);

// router
// 	.route('/recipes/:recipeId/publish')
// 	.post(recipesController.publishRecipe);


// router
// 	.route('/recipes/:recipeId/unpublish')
// 	.post(recipesController.unpublishRecipe);


// // Product
router
	.route('/products')
	.get(productsController.getProducts)
// 	.post(productsController.addProduct);

// router
// 	.route('/products/:productId')
// 	.get(productsController.getProduct)
// 	.put(productsController.updateProduct)
// 	.delete(productsController.deleteProduct);


module.exports = router;