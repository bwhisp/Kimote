/*
 * @name MusicCtrl
 * @requires $scope, $http, $location, $routeParams
 * @description - Controleur pour les vues music.html, music-albums.html et music-songs.html
 */

app.controller('MusicCtrl', function($scope, $http, $location, $routeParams) {

	$scope.artist_label = $routeParams.artistLabel;

	$scope.showArtists = function() {
		method = "AudioLibrary.GetArtists";
		params =  '{"properties":["style","description","born","yearsactive","died","thumbnail","genre","fanart"],"limits":{"start":1,"end":2000}},"id":"libMusic"';

		getArtists($http, method, params);
	};

	function getArtists($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$scope.artists = data.result.artists;
		})
		.error(function(data, status, headers, config) {
			console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
		});
	}

	$scope.showAlbums = function() {
		method = "AudioLibrary.GetAlbums";
		params = '{"limits":{"start":0,"end":9999},"properties":["playcount","artist","genre","rating","thumbnail","year","mood","style"],"sort":{"order":"ascending","method":"album","ignorearticle":true}},"id":"libAlbums"}';

		getAlbums($http, method, params);
	};

	function getAlbums($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$scope.albums = data.result.albums;
		})
		.error(function(data, status, headers, config) {
			console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
		});
	}

	$scope.showSongs = function() {
		method = "AudioLibrary.GetSongs";
		params = '{"limits":{"start":0,"end":9999},"properties":["file","artist","duration","album","albumid","track","playcount"],"sort":{"order":"ascending","method":"track","ignorearticle":true}},"id":"libSongs"}';

		getSongs($http, method, params);
	};

	function getSongs($http, method, params) {
		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$scope.loader = true;
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$scope.loader = false;
			$scope.songs = data.result.songs;
		})
		.error(function(data, status, headers, config) {
			$scope.loader = false;
			console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
		});
	}

	$scope.playSong = function(file) {

		method = "Player.Open";
		params = '{"item":{"file":"' + file + '"}}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			console.log("musique ok");
			//$location.path("/remote"); // fixer le tab actif
		})
		.error(function(data, status, headers, config) {
			alert("Impossible de lire la piste musicale");
		});
	};

	$scope.toMinutes = function(duration) {

		var minutes = Math.floor((duration/60));
		var seconds = duration - (minutes*60);

		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		var time = minutes + ':' + seconds;
		return time;
	};

	$scope.getThumbnailArtist = function(thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","").replace("jpg/","jpg");
		$scope.thumbnailUriDecoded = decodeURIComponent(thumbnailUri);

		return $scope.thumbnailUriDecoded;
	};

	$scope.getThumbnailAlbum = function(thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","");
		thumbnailURIencoded = encodeURIComponent(thumbnailUri);
		$scope.thumbnailUriComplete = window.base_url + '/image/image://' + thumbnailURIencoded;

		return $scope.thumbnailUriComplete;
	};

	$scope.selectedAlbum = undefined;
	$scope.selectAlbum = function(index) {
		if ($scope.selectedAlbum !== index) {
			$scope.selectedAlbum = index;
		}
		else {
			$scope.selectedAlbum = undefined;
		}
	};
});
