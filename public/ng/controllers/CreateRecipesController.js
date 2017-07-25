angular.module('bakecake').controller('CreateRecipesController', function($scope, RecipeService, ProductService, $location) {
	
	$scope.products = [];
	$scope.isLoading = false;	

	$scope.newRecipe = {
		photos: []
	};

	ProductService.getProducts(function(response){
		$scope.products = response;
	}, function(){
		alert('error');
	});

	$scope.createRecipe = function(){
		$scope.isLoading = true;
		RecipeService.addRecipe($scope.newRecipe, function(){
			$scope.isLoading = false;
			debugger;
			$location.path('/przepisy');
		}, function(){
			alert('error');
			$scope.isLoading = false;
		})
	}

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
			['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote','bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear','justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']
		]
	}

	$scope.createRecipe = function(){
		$scope.isLoading = true;
		RecipeService.addRecipe($scope.newRecipe, function(){
			$scope.isLoading = false;
			$location.path('/recipes');
		}, function(){
			alert('error');
			$scope.isLoading = false;
		})
	}
});