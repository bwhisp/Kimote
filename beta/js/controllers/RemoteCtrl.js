var vol = 50;

app.controller('RemoteCtrl', function($scope,$http) {
	
	$scope.sound = vol;

	$scope.setVol = function () {
		vol = $scope.sound;
		method = 'Application.';
		method = method + 'SetVolume';
		params = '{"volume":' + $scope.sound + '}';
		
		sendRequestWithParams($http, method, params);
	};

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
		}
		else if (input === 'mute') {
			method = method + 'SetMute';
			params = '{"mute":true}';
		}
		else if (input === 'unmute') {
			method = method + 'SetMute';
			params = '{"mute":false}';
		}
		else if (input === 'volumeUp') {
			method = method + 'SetVolume';
			
			if (vol < 100)
				vol = vol + 1;

			params = '{"volume":' + vol + '}';
		}
		else if (input === 'volumeDown') {
			method = method + 'SetVolume';

			if (vol > 0)
				vol = vol - 1;

			params = '{"volume":' + vol + '}';
		}

		else if (input === 'fullscreen') {
			method = 'GUI.SetFullscreen';
			params = '{"fullscreen":true}';
		}

		sendRequestWithParams($http, method, params);
	};


	/*$scope.requestPlayer = function requestPlayer(input) {
		method = 'Player.';

		if (input === 'pause') {
			method = method + 'PlayPause';
			params = ',"params":{"playerid":0}';
		}

		sendRequestWithParams($http, method, params);
	};*/


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