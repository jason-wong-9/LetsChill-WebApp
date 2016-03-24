angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {

		})

	$locationProvider.html5Mode = true;
});