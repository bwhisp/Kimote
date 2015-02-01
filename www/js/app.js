document.addEventListener('deviceready', function (){

}, false);

var app = angular.module('app', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', function ($routeProvider, $controllerProvider) {

	$routeProvider
		.when('/remote', {
			templateUrl: 'views/remote.html'
		})
		.when('/settings', {
			templateUrl: 'views/settings.html'
		})
		.otherwise({
			redirectTo: '/remote'
		});
}]);
