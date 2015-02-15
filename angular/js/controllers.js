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
	        method = method + 'Quit'; //OnQuit = quitter Kodi, System.Shutdown = éteindre le système
	    }

	    sendRequest($http, method);
	}

	function sendRequest($http, method) {
		param_url = '/jsonrpc?request={"jsonrpc": "2.0", "method": "' + method + '"}';
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
	$scope.errCon = false;

	$scope.IPMODEL = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

	$scope.ip = "127.0.0.1";
	$scope.port = 8080;
	$scope.user = "kodi";
	$scope.pass = "admin";

	var connectSuccess = function (data, status) {
		$scope.errCon = false;
		alert(data.results[0]);
		//deferred.resolve();
	}

	var connectError = function (data, status) {
		$scope.errCon = true;
		deferred.reject(data);
		alert("Fail");
	}

	$scope.login = function($http, $q) {
		var deferred = $q.defer();
    	ip = $scope.ip;
	    port = $scope.port;
    	username = $scope.user;
    	password = $scope.pass;
	
		//$http.get(base_url).success(connectSuccess).error(connectError)
    	//$location.path(base_url);
		base_url = 'http://' + username + ':' + password + '@' + ip + ':' + port; // base_url
    	test_url = '/jsonrpc?request={ "jsonrpc": "2.0", "method": "JSONRPC.Ping", "id": 1 }';
		$http.jsonp(base_url+test_url).success(connectSuccess(deferred)).error(connectError(deferred));
	}


});