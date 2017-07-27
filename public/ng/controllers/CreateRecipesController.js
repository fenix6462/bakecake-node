angular.module('bakecake').controller('CreateRecipesController', function($scope, RecipeService, ProductService, $location) {
	
	$scope.products = [];
	$scope.isLoading = false;	

	$scope.newRecipe = {
		photos: [],
		products: []
	};

	ProductService.getProducts(function(response){
		$scope.products = response;
	}, function(){
		alert('error');
	});

	$scope.dzOptions = {
		url : '/api/uploadImage',
		paramName : 'photo',
		maxFilesize : '10',
		acceptedFiles : 'image/*',
		addRemoveLinks : true,
		dictDefaultMessage: 'Wrzuć zdjęcie lub kliknij żeby wybrać'
	};
	
	$scope.dzCallbacks = {
		addedfile : function(file){
			$scope.newFile = file;
		},
		success : function(file, xhr){
			$scope.newRecipe.photos.push(xhr[0].path);
		},
		removedfile: function(file){
			var filePath = JSON.parse(file.xhr.response)[0].path;
			var fileIndex = $scope.newRecipe.photos.indexOf(filePath);
			$scope.newRecipe.photos.splice(fileIndex, 1);
		}
	};
	
	$scope.dzMethods = {};

	$scope.taOptions = {
		toolbar: [
			['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p',
			'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol',
			'justifyLeft', 'justifyCenter', 'justifyRight']
		]
	}

	$scope.createRecipe = function(){
		var products = [];
		for(var i = 0; i < $scope.newRecipe.products.length; i++){
			var newProduct = {};
			newProduct.product = $scope.newRecipe.products[i]._id;
			newProduct.productWeight = $scope.newRecipe.products[i].productWeight;
			products.push(newProduct);
		}
		var newRecipe = $scope.newRecipe;
		newRecipe.products = products;
		$scope.isLoading = true;
		RecipeService.addRecipe(newRecipe, function(){
			$scope.isLoading = false;
			$location.path('/przepisy');
		}, function(){
			alert('error');
			$scope.isLoading = false;
		})
	}

  	function createOptions (listName) {
	    var _listName = listName;
		var options = {
			placeholder: "app",
			connectWith: ".list-group"
		};
		return options;
	}

  	$scope.sortableOptionsList = [createOptions('A'), createOptions('B')];

});