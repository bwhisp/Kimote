//var vol = 50;

app.controller('RemoteCtrl', function($scope,$http, Sounder) {
	
	$scope.sound = Sounder.getVolume();
	
	$scope.muted = Sounder.getMuted();
	$scope.volume = Sounder.getVolume();
	
	$scope.setVol = function () {
		Sounder.SetVol($scope.sound);
		$scope.sound = Sounder.getVolume();
	};

	$scope.SetMute = function () {
		Sounder.SetMute();
		$scope.muted = Sounder.getMuted();
		
	}
	
	$scope.SetUnMute = function () {
		Sounder.SetUnMute();
		$scope.muted = Sounder.getMuted();
	}
	
	$scope.VolUp = function () {
		Sounder.VolUp($scope.volume);
		$scope.volume = Sounder.getVolume();
	}
	
	$scope.VolDown = function () {
		Sounder.VolDown($scope.volume);
		$scope.volume = Sounder.getVolume();	
	}	
	
	$scope.requestInput = function requestInput(input) {
		method = 'Input.';

		if (input === 'left') {
			method = method + 'Left';
			params = '{}';
		}
		else if (input === 'right') {
			method = method + 'Right';
			params = '{}';
		}
		else if (input === 'up') {
			method = method + 'Up';
			params = '{}';
		}
		else if (input === 'down') {
			method = method + 'Down';
			params = '{}';
		}
		else if (input === 'select') {
			method = method + 'Select';
			params = '{}';
		}
		else if (input === 'home') {
			method = method + 'Home';
			params = '{}';
		}
		else if (input === 'back') {
			method = method + 'Back';
			params = '{}';
		}
		else if (input === 'play') {
			method = method + 'ExecuteAction';
			params = '{"action":"play"}';
		}
		else if (input === 'pause') {
			method = method + 'ExecuteAction';
			params = '{"action":"pause"}';
		}
		else if (input === 'stop') {
			method = method + 'ExecuteAction';
			params = '{"action":"stop"}';
		}

		sendRequestWithParams($http, method, params);
	};

	$scope.requestApplication = function requestApplication(input) {
		method = 'Application.';

		if (input === 'shutdown') {
			method = method + 'Quit';
			params = '{}';
		}
		else if (input === 'mute') {
			$scope.SetMute();
		}
		else if (input === 'unmute') {
			$scope.SetUnMute();
		}
		else if (input === 'volumeUp') {
<<<<<<< HEAD
			$scope.VolUp();
		}
		else if (input === 'volumeDown') {
			$scope.VolDown();	
=======
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
>>>>>>> 0bbfcf488a7d2579bd053b2b3668d9d9463d9fe9
		}


		sendRequestWithParams($http, method, params);
	};

	$scope.requestGUI = function requestGUI(input) {
		
		method = 'GUI.';

		if (input === 'fullscreen') {
			method = method + 'SetFullscreen';
			params = '{"fullscreen":true}';
		}

		sendRequestWithParams($http, method, params);
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