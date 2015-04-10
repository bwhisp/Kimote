app.factory('Logger', function($http) {
	var logger = {};

	var connected = false;
	var errCon = false;
	var bouton = "Connecter";

	logger.logout = function() {
		window.base_url = "";
		connected = false;
		errCon = false;
		bouton = "Connecter";
		alert("Déconnecté");
	};

	logger.login = function(username, password, ip, port) {
		window.base_url = 'http://' + username + ':' + password + '@' + ip + ':' + port;
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"JSONRPC.Ping"}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url + ping_url)
		.success(function(data, status) {
			connected = true;
			errCon = false;
			bouton = "Déconnecter";
			window.location = "#/remote";
		})
		.error(function(data, status) {
			connected = false;
			errCon = true;
			bouton = "Connecter";
			alert("Error " + status);
			console.log(window.base_url);
		});
	};

	logger.getConn = function() {
		return connected;
	};

	logger.getErr = function() {
		return errCon;
	};

	logger.getBouton = function() {
		return bouton;
	};

	return logger;
});

app.factory('Sounder', function($http) {
	var sounder = {};

	var muted = true;
	var errMute = false;
	var errUnmute = false;
	var volume = 50;

	/*sounder.SetMute = function() {
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetMute", "params":{"mute":true}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url + ping_url)
		.success(function(data, status) {
			muted = true;
		})
		.error(function(data, status) {
			errMute = true;
		});
	};

	/*sounder.SetUnMute = function() {
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetMute", "params":{"mute":false}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url + ping_url)
		.success(function(data, status) {
			muted = false;
		})
		.error(function(data, status) {
			errUnMute = true;
		});
	};*/

	sounder.VolUp = function(vol) {
		if (vol < 100)
			vol = vol + 1;

		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetVolume", "params":{"volume":' + vol + '}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url + ping_url)
		.success(function(data, status) {
			volume = vol;
			window.location = "#/settings";
			window.location = "#/remote";
		})
		.error(function(data, status) {
		});
	}

	sounder.VolDown = function(vol) {
		if (vol < 100)
			vol = vol - 1;

		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetVolume", "params":{"volume":' + vol + '}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url+ping_url)
		.success(function(data, status) {
			volume = vol;
			window.location = "#/settings";
			window.location = "#/remote";
		})
		.error(function(data, status) {
		});
	}

	sounder.SetVol = function (sound) {

		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetVolume", "params":{"volume":' + sound + '}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url+ping_url)
		.success(function(data, status) {
			volume = sound;
			window.location = "#/settings";
			window.location = "#/remote";
		})
		.error(function(data, status) {
		});
	}

	sounder.getMuted = function() {
		return muted;
	};

	sounder.getVolume = function() {
			return volume;
	};

	return sounder;
});

app.factory('Manager', function($http) {
	var manager = {};

	var played = false;
	var paused = true;
	var errPlay = false;
	var errPause = false;

	manager.SetPlay = function(isPics) {
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.ExecuteAction", "params":{"action":"play"}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url + ping_url)
		.success(function(data, status) {
			paused = false;
			played = true;
			if (!isPics) {
				window.location = "#/settings";
				window.location = "#/remote";
			}
		})
		.error(function(data, status) {
			errPlay = true;
		});
	};

	manager.SetPause = function(isPics) {
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.ExecuteAction", "params":{"action":"pause"}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url + ping_url)
		.success(function(data, status) {
			played = false;
			paused = true;
			if (!isPics) {
				window.location = "#/settings";
				window.location = "#/remote";
			}
		})
		.error(function(data, status) {
			errPause = true;
		});
	};

	manager.getPaused = function() {
		return paused;
	};

	manager.getPlayed = function() {
		return played;
	};

	return manager;
});

app.factory('Runtime', function($http) {
	var runtime = {};
	var infos = {};
	var moment;

	infos.moment2 = 0;
	infos.temps = 0;
	infos.totaltime = 0;
	infos.playeractive = "undefined";

	runtime.SetRuntime = function (moment) {

		ping_url = '/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1 }&callback=JSON_CALLBACK';
		var ping_url2;

		$http.jsonp(window.base_url+ping_url)
		.success(function(data, status) {
			ping_url2 = '/jsonrpc?request={"jsonrpc":"2.0","id":1,"method":"Player.Seek","params":{"playerid":' + data.result[0].playerid + ',"value":' + moment + '}}&callback=JSON_CALLBACK';

			$http.jsonp(window.base_url+ping_url2)
			.success(function(data, status){})
			.error(function(data, status){});
		})
		.error(function(data, status){});
	};

	runtime.GetRuntime = function () {

		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method": "Player.GetActivePlayers","id":1}&callback=JSON_CALLBACK';
		var ping_url2;

		$http.jsonp(window.base_url + ping_url)
		.success(function(data, status) {

			if (data.result.length != 0) {
				infos.playeractive = data.result[0].playerid;
				ping_url2 = '/jsonrpc?request={"jsonrpc":"2.0","id":1,"method":"Player.GetProperties","params":{"playerid":' + data.result[0].playerid + ',"properties":["percentage","time","totaltime"] }}&callback=JSON_CALLBACK';

				$http.jsonp(window.base_url + ping_url2)
				.success(function(data, status){
					infos.moment2 = data.result.percentage;
					infos.temps = data.result.time;
					infos.totaltime = data.result.totaltime;
				})
				.error(function(data, status){});
			}
			else {
				infos.playeractive = "undefined";
			}
		})
		.error(function(data, status){});

		return infos;
	};

	return runtime;
});

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
