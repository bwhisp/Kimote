var appCtrl = angular.module('appCtrl', ['ngMaterial']);

appCtrl.controller('RemoteCtrl', function($scope,$http) {
	$scope.menu = 'remote';
	
	$scope.sound = 50;
	$scope.volUp = function () {
		$scope.sound += 1;
	};
	$scope.volDown = function () {
		$scope.sound -= 1;
	};

	$scope.request = function request(input) {
		method = 'Input.';

		if (input === 'left') {
			method = method + 'Left';
		}
		else if (input === 'right') {
			method = method + 'Right';
		}
		else if (input === 'up') {
			method = method + 'Up';
		}
		else if (input === 'down') {
			method = method + 'Down';
		}
		else if (input === 'select') {
			method = method + 'Select';
		}
		else if (input === 'home') {
			method = method + 'Home';
		}
		else if (input === 'back') {
			method = method + 'Back';
		}
		else if (input === 'shutdown') {
			method = 'Application.';
			method = method + 'Quit'; //OnQuit = quitter Kodi, System.Shutdown = éteindre le système
		}
		else if(input == 'setmute') {
			method = 'Application.';
			method = method + 'SetMute';
		}
		else if(input == 'setvolume'){
			method = 'Application';
			method = method + 'SetVolume';
			$scope.sound = 0;
		}

		sendRequest($http, method);
	};

	function sendRequest($http, method) {
		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "id":1}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}});

		/*.error(function() {
			alert('Impossible de se connecter');
		});*/
	}
});

appCtrl.controller('MoviesCtrl', function($scope,$http) {
	$scope.menu = 'movies';

	$scope.showMovies = function() {
		method = "VideoLibrary.GetMovies";
		params = '{"filter":{"field":"playcount","operator":"is","value":"0"},"limits":{"start":0,"end":75},"properties":["art","rating","thumbnail","playcount","file"],"sort": {"order":"ascending","method":"label","ignorearticle":true}},"id":"libMovies"';

		sendRequest($http, method, params);
	};

	function sendRequest($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}}).success(function(data, status, headers, config) {
			$scope.movie = data.result.movies[0].label;
			console.log($scope.movie);
		}).error(function(data, status, headers, config) {
			console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
		});
	}
});

appCtrl.controller('MusicCtrl', function($scope) {
	$scope.menu = 'music';
});

appCtrl.controller('PicsCtrl', function($scope) {
	$scope.menu = 'pics';
});

appCtrl.controller('SettingsCtrl', function($scope, $http) {
	$scope.menu = 'settings';

	$scope.IPMODEL = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

	$scope.login = function() {
		ip = $scope.ip;
		port = $scope.port.toString();
		username = $scope.user;
		password = $scope.pass;

		base_url = 'http://' + username + ':' + password + '@' + ip + ':' + port;
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"JSONRPC.Ping"}&callback=JSON_CALLBACK';

		$http.jsonp(base_url+ping_url)
			.success(function(data, status){
				window.location = "#/remote";
			})
			.error(function(data, status){
				alert("Error"+status);
			});
	};
});

appCtrl.controller('AboutCtrl', function($scope, $mdDialog) {
	$scope.showAbout = showAbout;

	function showAbout() {
		about = $mdDialog.alert({
			title: "À propos",
			content: "Projet S8 groupe 8 - ENSEIRB-MATMECA 2015",
			ok: 'OK'
		});
		$mdDialog.show(about);
	}
});