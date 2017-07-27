angular.module('bakecake', ['ngResource','ngRoute', 'thatisuday.dropzone', 'textAngular', 'ui.sortable'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

    $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
    
	$routeProvider
	.when('/',{
		templateUrl: 'views/dashboard/index.html',
		controller: 'DashboardController',
        activetab: 'dashboard'
	})
	.when('/przepisy',{
		templateUrl: 'views/recipes/list.html',
		controller: 'ListRecipesController',
        activetab: 'recipes'
	})
	.when('/przepisy/dodaj',{
		templateUrl: 'views/recipes/create.html',
		controller: 'CreateRecipesController',
        activetab: 'createRecipe'
	})
	.when('/przepisy/:id/edit',{
		templateUrl: 'views/recipes/edit.html',
		controller: 'EditRecipesController',
        activetab: 'editRecipe'
	})

	.when('/produkty',{
		templateUrl: 'views/products/list.html',
		controller: 'ListProductsController',
        activetab: 'products'
	})
	.when('/produkty/dodaj',{
		templateUrl: 'views/products/create.html',
		controller: 'CreateProductsController',
        activetab: 'createProduct'
	})
	.otherwise({redirectTo:'/'});
}]);