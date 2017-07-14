var express = require('express');
var router = express.Router();

var productsController = require('../controllers/products.controller.js');
var recipesController = require('../controllers/recipes.controller.js');

//GET api/products
router
	.route('/products')
	.get(productsController.getProducts);

//GET api/products/1
router
	.route('/products/:productId')
	.get(productsController.getProduct);

//POST api/products
router
	.route('/products')
	.post(productsController.addProduct);

//PUT api/products/1
router
	.route('/products/:productId')
	.put(productsController.updateProduct);

//DELETE api/products/1
router
	.route('/products/:productId')
	.delete(productsController.deleteProduct);

//GET api/recipes
router
	.route('/recipes')
	.get(recipesController.getRecipes);

//GET api/recipes/1
router
	.route('/recipes/:recipeId')
	.get(recipesController.getRecipe);

//POST api/recipes
router
	.route('/recipes')
	.post(recipesController.addRecipe);

//PUT api/recipes/1
router
	.route('/recipes/:recipeId')
	.put(recipesController.updateRecipe);

//DELETE api/recipes/1
router
	.route('/recipes/:recipeId')
	.delete(recipesController.deleteRecipe);


module.exports = router;