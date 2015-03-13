document.addEventListener('deviceready', function (){

}, false);

var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngAnimate', 'appCtrl']);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/remote', {
			templateUrl: 'views/remote.html',
			controller: 'RemoteCtrl'
		})
		.when('/movies', {
			templateUrl: 'views/movies.html',
			controller: 'MoviesCtrl'
		})
		.when('/music', {
			templateUrl: 'views/music.html',
			controller: 'MusicCtrl'
		})
		.when('/pics', {
			templateUrl: 'views/pics.html',
			controller: 'PicsCtrl'
		})
		.when('/settings', {
			templateUrl: 'views/settings.html',
			controller: 'SettingsCtrl'
		})
		.otherwise({
			redirectTo: '/remote'
		});
}]);