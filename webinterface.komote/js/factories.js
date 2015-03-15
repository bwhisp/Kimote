app.factory('Sounder', function($http) {
	var sounder = {};

	var muted = false;
	var errMute = false;
	var errUnmute = false;
	var volume = 50;


	sounder.SetMute = function () {
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetMute", "params":{"mute":true}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url+ping_url)
			.success(function(data, status){
				muted = true;
				window.location = "#/settings";
				window.location = "#/remote";
			})
			.error(function(data, status){
				errMute = true;
			});
	};

	sounder.SetUnMute = function () {
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetMute", "params":{"mute":false}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url+ping_url)
			.success(function(data, status){
				muted = false;
				window.location = "#/settings";
				window.location = "#/remote";
			})
			.error(function(data, status){
				errUnMute = true;
			});
	};


	sounder.VolUp = function (vol) {
		if (vol < 100)
			vol = vol + 1;

		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetVolume", "params":{"volume":' + vol + '}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url+ping_url)
			.success(function(data, status){
				volume = vol;
				window.location = "#/settings";
				window.location = "#/remote";
			})
			.error(function(data, status){
			});
	}

	sounder.VolDown = function (vol) {
		if (vol < 100)
			vol = vol - 1;
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetVolume", "params":{"volume":' + vol + '}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url+ping_url)
			.success(function(data, status){
				volume = vol;
				window.location = "#/settings";
				window.location = "#/remote";
			})
			.error(function(data, status){
			});
	}

	sounder.SetVol = function (sound) {


		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetVolume", "params":{"volume":' + sound + '}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url+ping_url)
			.success(function(data, status){
				volume = sound;
				window.location = "#/settings";
				window.location = "#/remote";
			})
			.error(function(data, status){
			});

	}

	sounder.getMuted = function () {
		return muted;
	};

	sounder.getVolume = function () {
		return volume;
	};

	return sounder;
});

app.factory('Manager', function($http) {
	var manager = {};

	var played = true;
	var paused = false;
	var errPlay = false;
	var errPause = false;

	manager.SetPlay = function () {
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.ExecuteAction", "params":{"action":"play"}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url+ping_url)
			.success(function(data, status){
				paused = false;
				played= true;
				window.location = "#/settings";
				window.location = "#/remote";
			})
			.error(function(data, status){
				errPlay = true;
			});
	};

	manager.SetPause = function () {
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.ExecuteAction", "params":{"action":"pause"}}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url+ping_url)
			.success(function(data, status){
				played=false;
				paused=true;
				window.location = "#/settings";
				window.location = "#/remote";
			})
			.error(function(data, status){
				errPause = true;
			});
	};

	manager.getPaused = function () {
		return paused;
	};

	manager.getPlayed = function () {
		return played;
	};

	return manager;
});
