app.controller('MoviesCtrl', function($scope, $http, $stateParams, $location, $ionicLoading, $sce, Loader) {

	// Get movie label from previous view for display
	$scope.movie_label = $stateParams.movieLabel;

	// Get and display movies list
	// $broadcast top stop pull to refresh
	$scope.showMovies = function() {
		Loader.getMovies(function(data) {
			$scope.movies = data.result.movies;
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	// Play movie on Kodi and redirect to remote view
	$scope.playMovieOnKodi = function(file) {
		method = "Player.Open";
		params = '{"item":{"file":"' + file + '"}}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
			.success(function(data, status, headers, config) {
			})
			.error(function(data, status, headers, config) {
				alert("Cannot play this movie");
			});
	};

	// Get movie path for streaming
	// with Videogular plugin
	$scope.getStreamInfo = function(file, poster) {
		// Get movie path 
		var moviePath = encodeURIComponent(file);
		var streamUrl = window.base_url + '/vfs/' + moviePath;

		// Get movie fanart to display on video player
		poster = poster.replace("image://","");
		var posterUriDecoded = decodeURIComponent(poster);

		// Configuration for Videogular
		// Get streamUrl as source and posterUri
		$scope.config = {
			sources: [{
				src: $sce.trustAsResourceUrl(streamUrl),
				type: "video/mp4"
			}],
			theme: "lib/videogular-themes-default/videogular.min.css",
			plugins: {
				poster: posterUriDecoded
			}
		};

		return $scope.config;
	};

	// Show search input on top of list
	// ngClick on search button
	$scope.showSearch = false;
	$scope.searchBox = function() {
		$scope.showSearch = !$scope.showSearch;
	};

	// Convert movie.runtime in hours
	$scope.Math = window.Math;
	$scope.toHours = function(duration) {
		var hours = Math.floor(duration/3600);
		var minutes = Math.floor((duration - (hours*3600))/60);

		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		var time = hours + 'h' + minutes;

		return time;
	};

	// Get thumbnail image to display in movie-detail
	$scope.getThumbnail = function(thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","");
		var thumbnailUriDecoded = decodeURIComponent(thumbnailUri);

		return thumbnailUriDecoded;
	};
});
