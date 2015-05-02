app.factory('Runtime', function($http) {
	
	var infos = {
		moment2: 0,
		temps: 0,
		totaltime: 0,
		playeractive: "undefined",
		shuffled: false
	};

	var runtime = {};
	var moment;

	runtime.SetRuntime = function (moment) {
		ping_url = '/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1 }&callback=JSON_CALLBACK';
		var ping_url2;

		$http.jsonp(window.base_url + ping_url)
			.success(function(data, status) {
				ping_url2 = '/jsonrpc?request={"jsonrpc":"2.0","id":1,"method":"Player.Seek","params":{"playerid":' + data.result[0].playerid + ',"value":' + moment + '}}&callback=JSON_CALLBACK';

				$http.jsonp(window.base_url + ping_url2)
					.success(function(data, status){})
					.error(function(data, status){});
			})
			.error(function(data, status){});
	};

	runtime.getDetails = function (id, callback){
		var playerDetails = {};
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"Player.GetItem","params":{"playerid":'+ id +',"properties":["title","artist","thumbnail","album", "year"]},"id":4}&callback=JSON_CALLBACK';
		$http.jsonp(window.base_url + ping_url)
			.success(function(data, status) {
				callback(data);
			})
			.error(function(data, status){});
	};

	runtime.GetRuntime = function () {
		ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method": "Player.GetActivePlayers","id":1}&callback=JSON_CALLBACK';
		var ping_url2;

		$http.jsonp(window.base_url + ping_url)
			.success(function(data, status) {

				if (data.result.length !== 0) {
					infos.playeractive = data.result[0].playerid;
					ping_url2 = '/jsonrpc?request={"jsonrpc":"2.0","id":1,"method":"Player.GetProperties","params":{"playerid":' + data.result[0].playerid + ',"properties":["percentage","time","totaltime", "repeat","shuffled","speed","subtitleenabled"] }}&callback=JSON_CALLBACK';

					$http.jsonp(window.base_url + ping_url2)
						.success(function(data, status) {

							infos.moment2 = data.result.percentage;
							infos.temps = data.result.time;
							infos.totaltime = data.result.totaltime;
							infos.shuffled = data.result.shuffled;
							infos.repeat = data.result.repeat;
							infos.speed = data.result.speed;
							infos.subtitles = data.result.subtitleenabled;

							runtime.getDetails(infos.playeractive, function(data) {
								var playerDetails = {};

								if (infos.playeractive === 0) {
									
									playerDetails.album = data.result.item.album;
									playerDetails.title = data.result.item.title;
									playerDetails.artist = data.result.item.artist;
									playerDetails.thumbnail= data.result.item.thumbnail;
									playerDetails.year = "";

								} else if (infos.playeractive === 1) {

									playerDetails.title = data.result.item.title;
									playerDetails.thumbnail= data.result.item.thumbnail;
									playerDetails.year = data.result.item.year;
									playerDetails.album = "";
									playerDetails.artist = "";

								}

								infos.getDetails = playerDetails;
							});
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