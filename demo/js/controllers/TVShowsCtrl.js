app.controller('TVShowsCtrl', function($scope, $http, $location, $stateParams, $ionicLoading) {
    $scope.series_id = $stateParams.seriesId;
    $scope.series_label = $stateParams.seriesLabel;

    $scope.season_id = $stateParams.seasonId;

    $scope.episode_id = $stateParams.episodeId;
    $scope.episode_label = $stateParams.episodeLabel;

    //préparation de la requête http pour afficher la liste des séries
	$scope.showSeries = function() {
		method = "VideoLibrary.GetTVShows";
		params = '{"limits": { "start" : 0, "end": 100}, "properties": ["art", "genre", "plot", "title", "originaltitle", "year", "rating", "thumbnail", "playcount", "file","season"], "sort": { "order": "ascending", "method": "label" }}, "id": "libTvShows"';

		getSeries($http, method, params);
	};

	//récupération des séries
	function getSeries($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

        $ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
            $ionicLoading.hide();
			$scope.tvshows = data.result.tvshows;
		})
		.error(function(data, status, headers, config) {
            $ionicLoading.hide();
            alert("Impossible de récupérer les séries TV");
		});
	}

    //préparation de la requête http pour afficher la liste des saisons d'une série
	$scope.showSeasons = function(tvshowid) {
		method = "VideoLibrary.GetSeasons";
		params = '{"tvshowid":' + tvshowid + ',"limits": { "start" : 0, "end": 100}, "properties": ["season","showtitle","thumbnail","episode","tvshowid"], "sort": { "order": "ascending", "method": "label" }}, "id": "libTvShows"';

		getSeasons($http, method, params);
	};

	function getSeasons($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

        $ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
            $ionicLoading.hide();
			$scope.seasons = data.result.seasons;
		})
		.error(function(data, status, headers, config) {
            $ionicLoading.hide();
            alert("Impossible de récupérer les saisons");
		});
	}

    //préparation de la requête http pour afficher la liste des épisodes d'une saison
	$scope.showEpisodes = function (tvshowid,seasonid) {
		method = "VideoLibrary.GetEpisodes";
		params = '{"tvshowid":' + tvshowid + ',"season":' + seasonid + ',"limits": { "start" : 0, "end": 100}, "properties": ["title","runtime","season","episode","tvshowid","file"], "sort": { "order": "ascending", "method": "label" } }, "id": "libTvShows"';

		getEpisodes($http, method, params);
	};

	function getEpisodes($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

        $ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
            $ionicLoading.hide();
			$scope.episodes = data.result.episodes;
		})
		.error(function(data, status, headers, config) {
            $ionicLoading.hide();
            alert("Impossible de récupérer les épisodes");
		});
	}

    $scope.showEpisodeDetails = function(episodeid) {
        method = "VideoLibrary.GetEpisodeDetails";
        params = '{"episodeid":' + episodeid + ', "properties": ["title","runtime","rating","plot","season","episode","tvshowid","file","showtitle","thumbnail","fanart"]}, "id": "libTvShows"';

        getEpisodeDetails($http, method, params);
    };

    function getEpisodeDetails($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

        $ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
            $ionicLoading.hide();
			$scope.episodedetails = data.result.episodedetails;
		})
		.error(function(data, status, headers, config) {
            $ionicLoading.hide();
            alert("Impossible de récupérer l'épisode");
		});
	}

    //lancer l'épisode cliqué
	$scope.playEpisode = function(file) {

		method = "Player.Open";
		params = '{"item":{"file":"' + file + '"}}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			console.log("episode ok");
			//$location.path("/remote"); // fixer le tab actif
		})
		.error(function(data, status, headers, config) {
			alert("Impossible de lire l'épisode");
		});
	};

    $scope.Math = window.Math;

	//conversion de la durée d'un épisode
	$scope.toHours = function(duration) {
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

    //récupération du thumbnail de la série
	$scope.getThumbnailSeries = function(thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","").replace("jpg/","jpg");
		$scope.thumbnailUriDecoded = decodeURIComponent(thumbnailUri);

		return $scope.thumbnailUriDecoded;
	};

    //récupération du thumbnail d'une saison
	$scope.getThumbnailSeason = function(thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","").replace("jpg/","jpg");
		$scope.thumbnailUriDecoded = decodeURIComponent(thumbnailUri);

		return $scope.thumbnailUriDecoded;
	};
});
