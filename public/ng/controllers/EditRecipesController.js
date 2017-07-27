angular.module('bakecake').controller('EditRecipesController', function($scope, RecipeService, ProductService, $location, $routeParams) {
	
	var _id = $routeParams.id ? $routeParams.id : null;

	$scope.products = [];
	$scope.recipe = {};
	$scope.isLoading = false;

	ProductService.getProducts(function(response){
		$scope.products = response;
	}, function(){
		alert('error');
	});

	RecipeService.getRecipe({ recipeId: _id }, function(response){
		if(response.products && response.products.length){
			var products = [];
			var product = {};
			for(var i = 0; i < response.products.length; i++){
				product = response.products[i].product;
				product.product = response.products[i]._id;
				product.productWeight = response.products[i].productWeight;
				products.push(product);
			}
			var recipe = response;
			recipe.products = products;
			$scope.recipe = recipe;
		} else {
			$scope.recipe = response;
		}

	}, function(){
		alert('error');
	})

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

	$scope.saveRecipe = function(){
		var originProducts = $scope.recipe.products;
		var products = [];
		for(var i = 0; i < originProducts.length; i++){
			var product = {};
			product.product = originProducts[i]._id;
			product.productWeight = originProducts[i].productWeight;
			products.push(product);
		}
		var recipe = angular.copy($scope.recipe);
		recipe.products = products;
		RecipeService.editRecipe({ recipeId: _id }, recipe, function(){
			alert('success');
		}, function(){
			alert('error');
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