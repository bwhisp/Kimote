app.factory('Requester', function($http, Manager, Sounder) {
	var requester = {};

	requester.requestInput = function (input) {
		method = 'Input.';
		params = '{}';

		switch (input) {
			case "left":
				method = method + 'Left';
				break;
			case "right" :
				method = method + 'Right';
				break;
			case "up" :
				method = method + 'Up';
				break;
			case "down" :
				method = method + 'Down';
				break;
			case "select" :
				method = method + 'Select';
				break;
			case "home" :
				method = method + 'Home';
				break;
			case "back" :
				method = method + 'Back';
				break;
			case "playPic" :
				Manager.SetPlay(1);
				break;
			case "play" :
				Manager.SetPlay(0);
				break;
			case "pausePic" :
				Manager.SetPause(1);
				break;
			case "pause" :
				Manager.SetPause(0);
				break;
			case "stop" :
				method = method + 'ExecuteAction';
				params = '{"action":"stop"}';
				break;
			case "next" :
				method = method + 'ExecuteAction';
				params = '{"action":"skipnext"}';
				break;
			case "previous" :
				method = method + 'ExecuteAction';
				params = '{"action":"skipprevious"}';
				break;
			case "fastforward" :
				method = method + 'ExecuteAction';
				params = '{"action":"fastforward"}';
				break;
			case "rewind" :
				method = method + 'ExecuteAction';
				params = '{"action":"rewind"}';
				break;
			case "zoom+" :
				method = method + 'ExecuteAction';
				params = '{"action":"zoomin"}';
				break;
			case "zoom-" :
				method = method + 'ExecuteAction';
				params = '{"action":"zoomout"}';
				break;
			default :
				break;
		}

		requester.sendRequest($http, method, params);
	};

    requester.requestApplication = function (input, volume) {
		method = 'Application.';
		params = '{}';

		switch (input) {
			case "shutdown" :
				method = method + 'Quit';
				break;
			case "mute" :
				Sounder.SetMute();
				break;
			case "unmute" :
				Sounder.SetUnMute();
				break;
			case "volumeUp" :
				Sounder.VolUp(volume);
				break;
			case "volumeDown" :
				Sounder.VolDown(volume);
				break;
			default :
				break;
		}

		requester.sendRequest($http, method, params);
	};

	requester.requestGUI = function (input) {
		method = 'GUI.';

		switch (input) {
			case "fullscreen" :
				method = method + 'SetFullscreen';
				params = '{"fullscreen":true}';
				break;
			case "pictures" :
				window.location = "#/tab/pics";
				method = method + "ActivateWindow"
				params = '{"window" : "pictures"}';
				break;

			default :
				break;
		}

		requester.sendRequest($http, method, params);
	};

	requester.requestPlayer = function (input){
		method = 'Player.';

		switch (input) {
			case "zoom" :
				method = method + 'Zoom';
				params = '{"playerid":0,"zoom":"in"}';
				break;

			default :
				break;
		}

		requester.sendRequest($http,method,params);
	};

	requester.sendRequest = function($http, method, params) {
		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '","params": '+ params +', "id": 1}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.error(function() {
			alert("Vous n'êtes pas connecté");
		});
	};

	return requester;
});