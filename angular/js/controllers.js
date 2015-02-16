var appCtrl = angular.module('appCtrl', []);

appCtrl.controller('RemoteCtrl', function($scope,$http) {

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
	        method = method + 'Quit';
	    }
		else if (input === 'connect') {
			method = '';
		}

	    sendRequest($http, method);
	}

	function sendRequest($http, method) {
	
		param_url = 'http://kodi:coucou@192.168.23.4:8080/jsonrpc?request={"jsonrpc": "2.0", "method": "' + method + '"}';

		$http.jsonp(param_url);

	}
	
});