var vol = 50;

app.controller('RemoteCtrl', function($scope,$http, Sounder) {
	
	$scope.sound = vol;
	$scope.muted = Sounder.getMuted();
	
	$scope.setVol = function () {
		vol = $scope.sound;
		method = 'Application.';
		method = method + 'SetVolume';
		params = '{"volume":' + $scope.sound + '}';
		
		sendRequestWithParams($http, method, params);
	};

	$scope.SetMute = function () {
		//window.base_url = 'http://' + username + ':' + password + '@' + ip + ':' + port;
//ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetMute", "params":{"mute":true}}&callback=JSON_CALLBACK';

		//$http.jsonp(window.base_url+ping_url);
		Sounder.SetMute();
		$scope.muted = Sounder.getMuted();
		
	}
	
	$scope.SetUnMute = function () {
		//window.base_url = 'http://' + username + ':' + password + '@' + ip + ':' + port;
		//ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetMute", "params":{"mute":false}}&callback=JSON_CALLBACK';

		//$http.jsonp(window.base_url+ping_url);
		Sounder.SetUnMute();
		$scope.muted = Sounder.getMuted();
	}
	
	$scope.requestInput = function requestInput(input) {
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

		sendRequest($http, method);
	};

	$scope.requestApplication = function requestApplication(input) {
		method = 'Application.';

		if (input === 'shutdown') {
			method = method + 'Quit';
			params = '{}';
		sendRequestWithParams($http, method, params);			
		}
		else if (input === 'mute') {
			$scope.SetMute();
		}
		else if (input === 'unmute') {
			$scope.SetUnMute();
		}
		else if (input === 'volumeUp') {
			method = method + 'SetVolume';
			
			if (vol < 100)
				vol = vol + 1;

			params = '{"volume":' + vol + '}';
		sendRequestWithParams($http, method, params);			
		}
		else if (input === 'volumeDown') {
			method = method + 'SetVolume';

			if (vol > 0)
				vol = vol - 1;

			params = '{"volume":' + vol + '}';
		sendRequestWithParams($http, method, params);			
		}

		else if(input === 'pause'){
	    	method = "Player.PlayPause";
			params =  ',"params":{"playerid":0}';
			sendRequestWithParams($http, method,params);
	    }

		};

	function sendRequest($http, method) {
		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "id": 1}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}}).error(function() {
			alert("Vous n'êtes pas connecté");
		});
	}

	function sendRequestWithParams($http, method, params) {
		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '","params": '+ params +', "id": 1}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.error(function() {
			alert("Vous n'êtes pas connecté");
		});
	}
});