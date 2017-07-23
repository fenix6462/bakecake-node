angular.module('bakecake').controller('ListProductsController', ['$scope', 'ProductService', function($scope, ProductService) {

	$scope.products = [];

	ProductService.getProducts(function(response){
		$scope.products = response;
	}, function(){
		console.log('error');
	})
}]);