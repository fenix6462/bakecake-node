angular.module('bakecake').controller('ListProductsController', ['$scope', 'ProductService', function($scope, ProductService) {

	$scope.products = [];

	$scope.isProductsFetching = true;

	ProductService.getProducts(function(response){
		$scope.products = response;
		$scope.isProductsFetching = false;
	}, function(){
		alert('error');
		$scope.isProductsFetching = false;
	});

	$scope.enableEditMode = function(product){
		product.isEditMode = true;
	}

	$scope.saveProduct = function(product){
		product.isEditMode = false;
		product.isLoading = true;
		ProductService.editProduct({ productId: product._id }, product, function(response){
			product.isLoading = false;
		},function(){
			product.isLoading = false;
			alert('error');
		})
	}

	$scope.deleteProduct = function(product){
		product.isLoading = true;
		product.isEditMode = false;
		var productIndex = $scope.products.indexOf(product);
		ProductService.deleteProduct({ productId: product._id }, function(){
			$scope.products.splice(productIndex, 1);
			product.isLoading = false;
		}, function(){
			product.isLoading = false;
			alert('error');
		})
	}

}]);