document.addEventListener('deviceready', function (){

}, false);

var app = angular.module('app', ['ngRoute', 'ngMaterial', 'appCtrl']);

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

app.factory('Logger', function($http) {
	var logger = {};

	var connected = false;
	var errCon = false;
	var bouton = "Connecter";

	logger.logout = function () {
		window.base_url = "";
		connected = false;
		errCon = false;
		bouton = "Connecter";
		alert("plop");
	};

	logger.login = function (username, password, ip, port) {
		window.base_url = 'http://' + username + ':' + password + '@' + ip + ':' + port;
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"JSONRPC.Ping"}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url+ping_url)
			.success(function(data, status){
				connected = true;
				errCon = false;
				bouton = "Déconnecter";
				window.location = "#/remote";
			})
			.error(function(data, status){
				connected = false;
				errCon = true;
				bouton = "Connecter";
				alert("Error"+status);
			});
	};

	logger.getConn = function () {
		return connected;
	};

	logger.getErr = function () {
		return errCon;
	};

	logger.getBouton = function () {
		return bouton;
	}

	return logger;
});

