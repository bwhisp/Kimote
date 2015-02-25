var appCtrl = angular.module('appCtrl', ['ngMaterial']);

appCtrl.controller('RemoteCtrl', function($scope,$http) {
	
	$scope.sound = 50;
	$scope.volUp = function () {
		$scope.sound += 1;
	};
	$scope.volDown = function () {
		$scope.sound -= 1;
	};

	$scope.request = function request(input) {
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
		else if (input === 'shutdown') {
			method = 'Application.';
			method = method + 'Quit'; //OnQuit = quitter Kodi, System.Shutdown = éteindre le système
		}
		else if(input == 'setmute') {
			method = 'Application.';
			method = method + 'SetMute';
		}
		else if(input == 'setvolume'){
			method = 'Application';
			method = method + 'SetVolume';
			$scope.sound = 0;
		}

		sendRequest($http, method);
	};

	function sendRequest($http, method) {
		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "id":1}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}}).error(function() {
			alert("Vous n'êtes pas connecté");
		});
	}
});

appCtrl.controller('MoviesCtrl', function($scope,$http,$location) {

	//Requête http pour afficher la liste des films
	//showMovies() définit la méthode et les paramètres
	$scope.showMovies = function() {
		method = "VideoLibrary.GetMovies";
		params = '{"filter":{"field":"playcount","operator":"is","value":"0"},"limits":{"start":0,"end":75},"properties":["art","rating","thumbnail","playcount","file","year","genre","plot","runtime"],"sort": {"order":"ascending","method":"label","ignorearticle":true}},"id":"libMovies"';

		getMovies($http, method, params);
	};

	//getMovies() effectue la requête
	function getMovies($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$scope.movies = data.result.movies;
		})
		.error(function(data, status, headers, config) {
			console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
		});
	}

	//conversion du champ runtime en heures
	$scope.toHours = function (duration) {
		//var sec_num = parseInt(duration, 10);
		var hours = Math.floor(duration/3600);
		var minutes = Math.floor((duration - (hours*3600))/60);
		//var seconds = duration - (hours*3600) - (minutes*60);

		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		var time = hours + 'h' + minutes;
		return time;
	};

	//téléchargement l'image de présentation du film
	$scope.getThumbnail = function (thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","");
		$scope.thumbnailUriDecoded = decodeURIComponent(thumbnailUri);
		
		return $scope.thumbnailUriDecoded;
	};

	$scope.selectedMovie = undefined;
	$scope.selectMovie = function (index) {
		if ($scope.selectedMovie !== index) {
			$scope.selectedMovie = index;
		}
		else {
			$scope.selectedMovie = undefined;
		}
	};

	$scope.playMovie = function (file) {
		method = "Player.Open";
		params = '{"item":{"file":"' + file + '"}}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$location.path("/remote"); // fixer le tab actif
		})
		.error(function(data, status, headers, config) {
			alert("Impossible de lire le film");
		});
	};
});

appCtrl.controller('MusicCtrl', function($scope) {
});

appCtrl.controller('PicsCtrl', function($scope) {
});

appCtrl.controller('SettingsCtrl', function($scope, Logger) {
	$scope.IPMODEL = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

	$scope.bouton = Logger.getBouton();
	$scope.connected = Logger.getConn();
	$scope.errCon = Logger.getErr();

	$scope.login = function() {
		Logger.login($scope.user, $scope.pass, $scope.ip, $scope.port);
		
		$scope.bouton = Logger.getBouton();
		$scope.connected = Logger.getConn();
		$scope.errCon = Logger.getErr();
	};

	$scope.logout = function () {
		Logger.logout();

		$scope.bouton = Logger.getBouton();
		$scope.connected = Logger.getConn();
		$scope.errCon = Logger.getErr();
	};
});

appCtrl.controller('AboutCtrl', function($scope, $mdDialog) {
	$scope.showAbout = showAbout;

	function showAbout() {
		about = $mdDialog.alert({
			title: "À propos",
			content: "Projet S8 groupe 8 - ENSEIRB-MATMECA 2015",
			ok: 'OK'
		});
		$mdDialog.show(about);
	}
});