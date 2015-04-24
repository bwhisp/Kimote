app.controller('MusicCtrl', function($scope, $http, $stateParams, $location, $ionicLoading, $sce) {

	$scope.artist_label = $stateParams.artistLabel;
	$scope.artist_id = $stateParams.artistId;

	$scope.album_label = $stateParams.albumLabel;
	$scope.album_id = $stateParams.albumId;

	$scope.song_label = $stateParams.songLabel;
	$scope.song_id = $stateParams.songId;

	$scope.showArtists = function() {
		method = "AudioLibrary.GetArtists";
		params =  '{"properties":["style","description","born","yearsactive","died","thumbnail","genre","fanart"],"limits":{"start":1,"end":2000}},"id":"libMusic"';

		getArtists($http, method, params);
	};

	function getArtists($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$ionicLoading.hide();
			$scope.artists = data.result.artists;
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
			alert("Error fetching music");
		});
	}

	$scope.showAlbums = function(artistid) {
		method = "AudioLibrary.GetAlbums";
		params = '{"limits":{"start":0,"end":9999},"properties":["playcount","artist","genre","rating","thumbnail","year","mood","style"],"sort":{"order":"ascending","method":"album","ignorearticle":true},"filter":{"artistid":' + artistid + '}},"id":"libAlbums"}';

		getAlbums($http, method, params);
	};

	function getAlbums($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$ionicLoading.hide();
			$scope.albums = data.result.albums;
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
			alert("Error fetching albums");
		});
	}

	$scope.showSongs = function(albumid) {
		method = "AudioLibrary.GetSongs";
		params = '{"limits":{"start":0,"end":9999},"properties":["file","artist","duration","album","albumid","track","playcount"],"sort":{"order":"ascending","method":"track","ignorearticle":true},"filter":{"albumid":' + albumid + '}},"id":"libSongs"}';

		getSongs($http, method, params);
	};

	function getSongs($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$ionicLoading.hide();
			$scope.songs = data.result.songs;
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
			alert("Error fetching tracks");
		});
	}

	$scope.showSongDetails = function(songid) {
		method = "AudioLibrary.GetSongDetails";
		params = '{"songid":' + songid + ', "properties": ["title","artist","genre","duration","album","thumbnail","file"]}, "id": "libSongs"';

		getSongDetails($http, method, params);
	};

	function getSongDetails($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$ionicLoading.hide();
			$scope.songdetails = data.result.songdetails;

			$scope.getStreamInfoMusic($scope.songdetails.file);
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
			alert("Error fetching this track");
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
		})
		.error(function(data, status, headers, config) {
			alert("Cannot play this track");
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

	$scope.getStreamInfoMusic = function(file) {
		$scope.trackPath = encodeURIComponent(file);
		$scope.streamUrl = window.base_url + '/vfs/' + $scope.trackPath;

		console.log("streamUrl : " + $scope.streamUrl);

		$scope.config = {
			sources: [{
				src: $sce.trustAsResourceUrl($scope.streamUrl),
				type: "audio/mpeg"
			}],
			theme: "lib/videogular-themes-default/videogular.min.css",
		};

		return $scope.config;
	};
});
