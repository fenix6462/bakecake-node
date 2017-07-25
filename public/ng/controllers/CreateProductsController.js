angular.module('bakecake').controller('CreateProductsController', function($scope, $location, ProductService) {

	$scope.newProduct = {};

	$scope.isLoading = false;

	$scope.createProduct = function(){
		$scope.isLoading = true;
		ProductService.addProduct($scope.newProduct, function(){
			$scope.isLoading = false;
			$location.path('/produkty');
		}, function(){
			alert('error');
			$scope.isLoading = false;
		})
	}

});