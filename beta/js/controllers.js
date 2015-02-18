var appCtrl = angular.module('appCtrl', []);

appCtrl.controller('RemoteCtrl', function($scope,$http) {

	$scope.request = function request(input) {
		method = 'Input.';
		params = '';
		
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
		else if(input === 'mute') {
	    	method = 'Application.';
	    	method = method + 'SetMute'; 
			params = ',"params":{"mute":true}';
	    }
		
		else if(input === 'unmute') {
	    	method = 'Application.';
	    	method = method + 'SetMute'; 
			params = ',"params":{"mute":false}';
	    }
		else if(input === 'volumeUp') {
	    	method = 'Application.';
	    	method = method + 'SetVolume'; 
			params = ',"params":{"volume":' + '-' + 100 + '}';
	    }		
		
	    else if(input === 'SetVolume'){
	    	method = 'Application';
	    	method = method + 'SetVolume' + '"params":{"volume":' + 100 + '},"permission":"ControlPlayback"';
	    }

	    sendRequest($http, method);
	}

	function sendRequest($http, method) {
	
		param_url = 'http://kodi:coucou@192.168.20.160:8080/jsonrpc?request={"jsonrpc": "2.0", "method": "' + method + '" '+ params +' }';

		$http.jsonp(param_url);

	}
	
});