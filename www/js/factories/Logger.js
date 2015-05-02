app.factory('Logger', function($http) {
	var logger = {};

	var connected = false;
	var errCon = false;
	var bouton = "Connect";

	logger.logout = function() {
		window.base_url = "";
		connected = false;
		errCon = false;
		bouton = "Connect";
		alert("Disconnected");
	};

	logger.login = function(username, password, ip, port) {
		window.base_url = 'http://' + username + ':' + password + '@' + ip + ':' + port;
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"JSONRPC.Ping"}&callback=JSON_CALLBACK';

		$http.jsonp(window.base_url + ping_url)
		.success(function(data, status) {
			connected = true;
			errCon = false;
			bouton = "Disconnect";
			window.location = "#/remote";
		})
		.error(function(data, status) {
			connected = false;
			errCon = true;
			bouton = "Connect";
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