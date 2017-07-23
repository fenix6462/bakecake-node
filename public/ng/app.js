angular.module('bakecake', ['ngResource','ngRoute'])
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
	.when('/przepisy/:productId',{
		templateUrl: 'views/recipes/details.html',
		controller: 'DetailsRecipesController',
        activetab: 'recipe'
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
	.when('/produkty/:productId',{
		templateUrl: 'views/products/details.html',
		controller: 'DetailsProductsController',
        activetab: 'product'
	})
	.otherwise({redirectTo:'/'});
}]);