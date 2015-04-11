app.controller('MusicCtrl', function($scope, $http, $stateParams, $location, $ionicLoading, Loader) {

    $scope.artist_label = $stateParams.artistLabel;
    $scope.artist_id = $stateParams.artistId;

    $scope.album_label = $stateParams.albumLabel;
    $scope.album_id = $stateParams.albumId;

    $scope.showArtists = function() {
		$scope.artists = Loader.getArtists();
	};

    $scope.showAlbums = function(artistid) {
		$scope.albums = Loader.getAlbums(artistid);
	};

    $scope.showSongs = function(albumid) {
    	$scope.songs = Loader.getSongs(albumid);
	};

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
			alert("Impossible de lire le titre");
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

});