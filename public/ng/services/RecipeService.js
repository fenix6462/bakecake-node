angular.module('bakecake').factory('RecipeService', ['$resource', function ($resource) {
    var baseUrl = '/api/recipes'
    return $resource("", {}, {
        getRecipes: {
            method: "GET",
            url: baseUrl,
            isArray: true
        },
        getRecipe: {
            method: "GET",
            url: baseUrl + '/:recipeId',
            isArray: false
        },
        editRecipe: {
            method: "PUT",
            url: baseUrl + '/:recipeId',
            isArray: false
        },
        deleteRecipe: {
            method: "DELETE",
            url: baseUrl + '/:recipeId',
            isArray: false
        },
        addRecipe: {
            method: "POST",
            url: baseUrl,
            isArray: false
        }
    });
}]);