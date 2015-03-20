app.controller('MoviesCtrl', function($scope, $http, $stateParams, $location, $ionicLoading) {

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
            console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
		});
	}

    //joue le film et redirection vers remote
	$scope.playMovie = function(file) {

		method = "Player.Open";
		params = '{"item":{"file":"' + file + '"}}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$location.path("/remote"); // fixer le tab actif
			filmed = false;
		})
		.error(function(data, status, headers, config) {
			alert("Impossible de lire le film");
		});
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
