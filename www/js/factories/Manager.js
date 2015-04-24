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