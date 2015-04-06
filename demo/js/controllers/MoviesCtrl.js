app.controller('MoviesCtrl', function($scope, $http, $stateParams, $location, $ionicLoading, $sce) {

    $scope.movie_label = $stateParams.movieLabel;

    //préparation de la requête http pour afficher la liste des films
	$scope.showMovies = function() {
		method = "VideoLibrary.GetMovies";
		params = '{"limits":{"start":0,"end":9999},"properties":["art","rating","thumbnail","playcount","file","year","genre","plot","runtime"],"sort": {"order":"ascending","method":"label","ignorearticle":true}},"id":"libMovies"';

		getMovies($http, method, params);
	};

    //récupération des films
    function getMovies($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

        $ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
            $ionicLoading.hide();
			$scope.movies = data.result.movies;
		})
		.error(function(data, status, headers, config) {
            $ionicLoading.hide();
            alert("Impossible de récupérer les films");
		});
	}

    //lire le film sur Kodi et redirection vers remote
	$scope.playMovieOnKodi = function(file) {

		method = "Player.Open";
		params = '{"item":{"file":"' + file + '"}}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
		})
		.error(function(data, status, headers, config) {
			alert("Impossible de lire le film");
		});
	};

    $scope.getStreamInfo = function(file, poster) {
        $scope.moviePath = encodeURIComponent(file);
        $scope.streamUrl = window.base_url + '/vfs/' + $scope.moviePath;

        poster = poster.replace("image://","");
		$scope.posterUriDecoded = decodeURIComponent(poster);

        console.log("streamUrl : " + $scope.streamUrl);

        $scope.config = {
            sources: [{
                src: $sce.trustAsResourceUrl($scope.streamUrl),
                type: "video/mp4"
            }],
            theme: "lib/videogular-themes-default/videogular.min.css",
            plugins: {
                poster: $scope.posterUriDecoded
            }
        };

        return $scope.config;
    };

    //conversion du champ movie.runtime en heures
	$scope.toHours = function(duration) {
		var hours = Math.floor(duration/3600);
		var minutes = Math.floor((duration - (hours*3600))/60);

		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		var time = hours + 'h' + minutes;

		return time;
	};

    //téléchargement l'image de présentation du film
	$scope.getThumbnail = function(thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","");
		$scope.thumbnailUriDecoded = decodeURIComponent(thumbnailUri);

		return $scope.thumbnailUriDecoded;
	};

    $scope.Math = window.Math;
});
