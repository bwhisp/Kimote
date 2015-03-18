//var vol = 50;

app.controller('RemoteCtrl', function($scope,$http, Sounder, Manager) {
	

	$scope.muted = Sounder.getMuted();
	$scope.volume = Sounder.getVolume();
	$scope.sound = Sounder.getVolume();	
	
	$scope.paused=Manager.getPaused();
	$scope.played=Manager.getPlayed();
	
	$scope.setVol = function () {
		Sounder.SetVol($scope.sound);
		$scope.sound = Sounder.getVolume();
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
		else if (input === 'play') {
			
			Manager.SetPlay();
			$scope.played=Manager.getPlayed();
			$scope.paused=Manager.getPaused();
			
		}
		else if (input === 'pause') {
			Manager.SetPause();
			$scope.played=Manager.getPlayed();
			$scope.paused=Manager.getPaused();
		}
		
		sendRequest($http,method);
		
		if (input === 'stop') {
			method = method + 'ExecuteAction';
			params = '{"action":"stop"}';
		}
		else if (input === 'next') {
			method = method + 'ExecuteAction';
			params = '{"action":"skipnext"}';
		}
		else if (input === 'previous') {
			method = method + 'ExecuteAction';
			params = '{"action":"skipprevious"}';
		}
		else if (input === 'fastforward') {
			method = method + 'ExecuteAction';
			params = '{"action":"fastforward"}';
		}
		else if (input === 'rewind') {
			method = method + 'ExecuteAction';
			params = '{"action":"rewind"}';
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
			Sounder.SetMute();
			$scope.muted = Sounder.getMuted();	
		}
		else if (input === 'unmute') {
			Sounder.SetUnMute();
			$scope.muted = Sounder.getMuted();
		}
		else if (input === 'volumeUp') {
			Sounder.VolUp($scope.volume);
			$scope.volume = Sounder.getVolume();
		}
		else if (input === 'volumeDown') {
			Sounder.VolDown($scope.volume);
			$scope.volume = Sounder.getVolume();
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