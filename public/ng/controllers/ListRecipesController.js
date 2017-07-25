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
});