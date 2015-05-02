app.factory('Sounder', function($http) {
	var sounder = {};

	var muted = true;
	var errMute = false;
	var errUnmute = false;
	var volume = 50;

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
	};

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
	};

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
	};

	sounder.getMuted = function() {
		return muted;
	};

	sounder.getVolume = function() {
		return volume;
	};

	return sounder;
});