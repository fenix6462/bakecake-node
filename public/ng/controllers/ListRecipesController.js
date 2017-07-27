angular.module('bakecake').controller('ListRecipesController', function($scope, RecipeService) {

	$scope.recipes = [];

	$scope.isRecipesFetching = true;

	RecipeService.getRecipes(function(response){
		$scope.recipes = response;
		$scope.isRecipesFetching = false;
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

	$scope.togglePublish = function(recipe){
		recipe.isLoading = true;
		if(recipe.isPublished){
			RecipeService.publishRecipe({ recipeId: recipe._id }, function(response){
				recipe.isPublished = true;
				recipe.isLoading = false;
			}, function(){
				alert('error');
				recipe.isPublished = false;
				recipe.isLoading = false;
			})
		} else {
			RecipeService.unpublishRecipe({ recipeId: recipe._id }, function(response){
				recipe.isPublished = false;
				recipe.isLoading = false;
			}, function(){
				alert('error');
				recipe.isPublished = true;
				recipe.isLoading = false;
			})
		}
	}
});