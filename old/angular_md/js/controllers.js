var appCtrl = angular.module('appCtrl', ['ngMaterial']);

appCtrl.controller('RemoteCtrl', function($scope,$http) {
	
	$scope.sound = 50;
	$scope.volUp = function () {
		$scope.sound += 1;
	};
	$scope.volDown = function () {
		$scope.sound -= 1;
	};

	$scope.requestInput = function requestInput(input) {
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

		sendRequest($http, method);
	};

	$scope.requestApplication = function requestApplication(input) {
		method = 'Application.';

		if (input === 'shutdown') {
			method = method + 'Quit';
		}
		else if (input === 'setmute') {
			method = method + 'SetMute';
		}
		else if (input === 'setvolume') {
			method = method + 'SetVolume';
			$scope.sound = 0;
		}

		sendRequest($http, method);
	};

	function sendRequest($http, method) {
		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "id": 1}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}}).error(function() {
			alert("Vous n'êtes pas connecté");
		});
	}

	function sendRequestWithParams($http, method, params) {
		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '","params": '+ params +', "id": 1}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.error(function() {
			alert("Vous n'êtes pas connecté");
		});
	}
});

appCtrl.controller('MoviesCtrl', function($scope,$http,$location) {

	//Requête http pour afficher la liste des films
	//showMovies() définit la méthode et les paramètres
	$scope.showMovies = function() {
		method = "VideoLibrary.GetMovies";
		params = '{"limits":{"start":0,"end":75},"properties":["art","rating","thumbnail","playcount","file","year","genre","plot","runtime"],"sort": {"order":"ascending","method":"label","ignorearticle":true}},"id":"libMovies"';

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

	$scope.Math = window.Math;

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

appCtrl.controller('MusicCtrl', function($scope,$http,$location) {
	//Requête http pour afficher la liste des albums
	$scope.showAAlbums = function() {
		method = "AudioLibrary.GetAlbums";
		//params = '{"limits":{"start":0,"end":75},"properties":["artist","rating","thumbnail","playcount","style","year","genre"],"sort": {"order":"ascending","method":"label"}},"id":"libAAlbums"';
		params='{"limits":{"start":0,"end":50},"properties":["playcount","artist","genre","rating","thumbnail","year","mood","style"],"sort":{"order":"ascending","method":"album","ignorearticle":true}},"id":"libAlbums"}';

		getAAlbums($http, method, params);
	};

	//getMovies() effectue la requête
	function getAAlbums($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$scope.aalbums = data.result.albums;
		})
		.error(function(data, status, headers, config) {
			console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
		});
		console.log('AALBUMS' + $scope);
		getASongs($http,$scope.aalbums);
	}

	function getASongs($http,aalbums){
		method ="AudioLibrary.GetSongs";
		params ='{"limits":{"start":0,"end":9999},"properties":["file","artist","duration","album","albumid","track","playcount"],"sort":{"order":"ascending","method":"track","ignorearticle":true}},"id":"libSongs"}';
		
		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$scope.asongs = data.result.songs;
		})
		.error(function(data, status, headers, config) {
			console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
		});
	};

	function playSong(file){
		method = "Player.Open";
		params = '{"item":{"file":"' + file + '"}}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$location.path("/remote"); // fixer le tab actif
		})
		.error(function(data, status, headers, config) {
			alert("Impossible de lire la piste musicale");
		});
	};

	



	//conversion du champ runtime en heures
	$scope.toMinutes = function (duration) {
		//var sec_num = parseInt(duration, 10);
		var minutes = Math.floor((duration/60));
		var seconds = duration - (minutes*60);

		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		var time = minutes + 'm' + seconds;
		return time;
	};

	//téléchargement l'image de présentation du film
	$scope.getThumbnail = function (thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","");
		$scope.thumbnailUriDecoded = decodeURIComponent(thumbnailUri);
		
		return $scope.thumbnailUriDecoded;
	};

	$scope.selectedAAlbum = undefined;
	$scope.selectAAlbum = function (index) {
		if ($scope.selectedAAlbum !== index) {
			$scope.selectedAAlbum = index;
		}
		else {
			$scope.selectedAAlbum = undefined;
		}
	};












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

appCtrl.controller('GlobalCtrl', function($rootScope,$scope) {
	$rootScope.global = {
		search: ''
	};

	$scope.showSearch = true;
});