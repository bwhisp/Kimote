	app.factory('Logger', function($http) {
		var logger = {};

		var connected = false;
		var errCon = false;
		var bouton = "Connecter";

		logger.logout = function () {
			window.base_url = "";
			connected = false;
			errCon = false;
			bouton = "Connecter";
			alert("Déconnecté");
		};

		logger.login = function (username, password, ip, port) {
			window.base_url = 'http://' + username + ':' + password + '@' + ip + ':' + port;
			ping_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"JSONRPC.Ping"}&callback=JSON_CALLBACK';

			$http.jsonp(window.base_url+ping_url)
				.success(function(data, status){
					connected = true;
					errCon = false;
					bouton = "Déconnecter";
					window.location = "#/remote";
				})
				.error(function(data, status){
					connected = false;
					errCon = true;
					bouton = "Connecter";
					alert("Error"+status);
				});
		};

		logger.getConn = function () {
			return connected;
		};

		logger.getErr = function () {
			return errCon;
		};

		logger.getBouton = function () {
			return bouton;
		};

		return logger;
	});

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




	app.factory('Runtime', function($http) {
		var runtime = {};

		var moment;
		var moment2;


		
		
			
		

		
		
		runtime.SetRuntime = function (moment) {
		
				
			ping_url = '/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1 }&callback=JSON_CALLBACK';
			var ping_url2;
			$http.jsonp(window.base_url+ping_url)
				.success(function(data, status){
					ping_url2 = '/jsonrpc?request={"jsonrpc":"2.0","id":1,"method":"Player.Seek","params":{"playerid":'+data.result[0].playerid+',"value":' + moment+'}}&callback=JSON_CALLBACK';
	$http.jsonp(window.base_url+ping_url2)
					.success(function(data, status){
								
					})
					.error(function(data, status){
				
					});
								
				})
				.error(function(data, status){
				
				});	

			

		
		};
		
		
		
		runtime.GetRuntime = function () {
				
				
			ping_url = '/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1 }&callback=JSON_CALLBACK';
			var ping_url2;
			$http.jsonp(window.base_url+ping_url)
				.success(function(data, status){
					ping_url2 = '/jsonrpc?request={"jsonrpc":"2.0","id":1,"method":"Player.GetProperties","params":{"playerid":'+data.result[0].playerid+',"properties":["percentage", "time" ] }}&callback=JSON_CALLBACK';
	$http.jsonp(window.base_url+ping_url2)
					.success(function(data, status){
						
						moment2=data.result.percentage;
					
						console.log("estce bon" + moment2);
									
					})
					.error(function(data, status){
				
					});
								
				})
				.error(function(data, status){
				});
	return moment2;	
		};



		return runtime;
	});
