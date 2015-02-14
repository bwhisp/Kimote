var appCtrl = angular.module('appCtrl', []);

appCtrl.controller('RemoteCtrl', function($scope,$http) {
	$scope.menu = 'remote';

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
			method = method + 'OnQuit'; //OnQuit = quitter Kodi, System.Shutdown = éteindre le système
		}

		sendRequest($http, method);
	};

	function sendRequest($http, method) {
		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '"}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url);

		/*.error(function() {
			alert('Impossible de se connecter');
		});*/
	}
});

appCtrl.controller('MoviesCtrl', function($scope) {
	$scope.menu = 'movies';
});

appCtrl.controller('MusicCtrl', function($scope) {
	$scope.menu = 'music';
});

appCtrl.controller('PicsCtrl', function($scope) {
	$scope.menu = 'pics';
});

appCtrl.controller('SettingsCtrl', function($scope) {
	$scope.menu = 'settings';

	$scope.IPMODEL = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

	$scope.login = function() {
		ip = $scope.ip;
		port = $scope.port.toString();
		username = $scope.user;
		password = $scope.pass;
	
		base_url = 'http://' + username + ':' + password + '@' + ip + ':' + port;
		//$location.path(base_url);
	}
});