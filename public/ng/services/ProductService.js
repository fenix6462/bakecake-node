angular.module('bakecake').factory('ProductService', ['$resource', function ($resource) {
    var baseUrl = '/api/products'
    return $resource("", {}, {
        getProducts: {
            method: "GET",
            url: baseUrl,
            isArray: true
        },
        getProduct: {
            method: "GET",
            url: baseUrl + '/:productId',
            isArray: false
        },
        editProduct: {
            method: "PUT",
            url: baseUrl + '/:productId',
            isArray: false
        },
        deleteProduct: {
            method: "DELETE",
            url: baseUrl + '/:productId',
            isArray: false
        },
        addProduct: {
            method: "POST",
            url: baseUrl,
            isArray: false
        }
    });
}]);