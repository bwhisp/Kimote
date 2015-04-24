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