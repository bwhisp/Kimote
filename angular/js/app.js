document.addEventListener('deviceready', function (){

}, false);

var app = angular.module('app', ['ngRoute', 'ngAnimate']);

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

app.controller('RemoteCtrl', function($scope) {
	$scope.menu = 'remote';
});

app.controller('MoviesCtrl', function($scope) {
	$scope.menu = 'movies';
});

app.controller('MusicCtrl', function($scope) {
	$scope.menu = 'music';
});

app.controller('PicsCtrl', function($scope) {
	$scope.menu = 'pics';
});

app.controller('SettingsCtrl', function($scope) {
	$scope.menu = 'settings';
});

