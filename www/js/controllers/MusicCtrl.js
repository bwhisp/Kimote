app.controller('MusicCtrl', function($scope, $http, $stateParams, $location, $ionicLoading, $sce, Loader) {

	// Get artist, album and song labels and ids to display
	// on each view and filter to get the correct albums and
	// songs for a selected artist
	$scope.artist_label = $stateParams.artistLabel;
	$scope.artist_id = $stateParams.artistId;

	$scope.album_label = $stateParams.albumLabel;
	$scope.album_id = $stateParams.albumId;

	$scope.song_label = $stateParams.songLabel;
	$scope.song_id = $stateParams.songId;

	// Get artists to display in list
	$scope.showArtists = function() {
		Loader.getArtists(function(data) {
			$scope.artists = data.result.artists;
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	// Get albums of selected artist based on id
	$scope.showAlbums = function(artistid) {
		Loader.getAlbums(artistid, function(data) {
			$scope.albums = data.result.albums;
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	// Get songs of selected album based on id
	$scope.showSongs = function(albumid) {
		Loader.getSongs(albumid, function(data) {
			$scope.songs = data.result.songs;
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	// Get song details based on id
	$scope.showSongDetails = function(songid) {
		Loader.getSongDetails(songid, function(data) {
			$scope.songdetails = data.result.songdetails;
			$scope.getStreamInfoMusic($scope.songdetails.file);
		});
	};

	// Play song on Kodi and redirect to remote view
	$scope.playSong = function(file) {
		method = "Player.Open";
		params = '{"item":{"file":"' + file + '"}}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
		})
		.error(function(data, status, headers, config) {
			alert("Cannot play this track");
		});
	};

	// Get song path for streaming
	// with Videogular plugin
	$scope.getStreamInfoMusic = function(file) {
		var trackPath = encodeURIComponent(file);
		var streamUrl = window.base_url + '/vfs/' + trackPath;

		$scope.config = {
			sources: [{
				src: $sce.trustAsResourceUrl(streamUrl),
				type: "audio/mpeg"
			}],
			theme: "lib/videogular-themes-default/videogular.min.css",
		};

		return $scope.config;
	};

	// Show search input on top of list
	// ngClick on search button
	$scope.showSearch = false;
	$scope.searchBox = function() {
		$scope.showSearch = !$scope.showSearch;
	};

	// Convert song.duration to minutes
	$scope.Math = window.Math;
	$scope.toMinutes = function(duration) {
		var minutes = Math.floor((duration/60));
		var seconds = duration - (minutes*60);

		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		var time = minutes + ':' + seconds;
		return time;
	};

	// Get artist thumbnail to display on list
	$scope.getThumbnailArtist = function(thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","").replace("jpg/","jpg");
		var thumbnailUriDecoded = decodeURIComponent(thumbnailUri);

		return thumbnailUriDecoded;
	};

	// Get album thumbnail, encoded differently from artist thumbnails
	$scope.getThumbnailAlbum = function(thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","");
		var thumbnailURIencoded = encodeURIComponent(thumbnailUri);
		var thumbnailUriComplete = window.base_url + '/image/image://' + thumbnailURIencoded;

		return thumbnailUriComplete;
	};
});
