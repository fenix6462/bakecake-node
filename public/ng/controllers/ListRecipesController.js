angular.module('bakecake').controller('ListRecipesController', function($scope, RecipeService) {

	$scope.recipes = [];

	$scope.isRecipesFetching = true;

	RecipeService.getRecipes(function(response){
		$scope.recipes = response;
		$scope.isRecipesFetching = false;
		console.log($scope.recipes);
	}, function(){
		alert('error');
		$scope.isRecipesFetching = false;
	});

	$scope.deleteRecipe = function(recipe){
		recipe.isLoading = true;
		recipe.isEditMode = false;
		var recipeIndex = $scope.recipes.indexOf(recipe);
		RecipeService.deleteRecipe({ recipeId: recipe._id }, function(){
			$scope.recipes.splice(recipeIndex, 1);
			recipe.isLoading = false;
		}, function(){
			recipe.isLoading = false;
			alert('error');
		})
	}
});