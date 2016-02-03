var myapp = angular.module('myapp', ['ngRoute', 'angular-loading-bar']);

myapp.controller('indexController', indexController);
myapp.controller('homeController', homeController);

var configFunction = function ($routeProvider, $httpProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/views/home/homePage.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

}
configFunction.$inject = ['$routeProvider', '$httpProvider'];

myapp.config(configFunction);