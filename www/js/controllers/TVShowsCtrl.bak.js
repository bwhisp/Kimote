app.controller('TVShowsCtrl', function($scope, $http, $location, $stateParams, $ionicLoading, $sce, Loader) {
    $scope.series_id = $stateParams.seriesId;
    $scope.series_label = $stateParams.seriesLabel;

    $scope.season_id = $stateParams.seasonId;

    $scope.episode_id = $stateParams.episodeId;
    $scope.episode_label = $stateParams.episodeLabel;

    //préparation de la requête http pour afficher la liste des séries
	$scope.showSeries = function() {
		$scope.tvshows = Loader.getSeries();
	};

    //préparation de la requête http pour afficher la liste des saisons d'une série
	$scope.showSeasons = function(tvshowid) {
		$scope.seasons = Loader.getSeasons(tvshowid);
	};

    //préparation de la requête http pour afficher la liste des épisodes d'une saison
	$scope.showEpisodes = function (tvshowid, seasonid) {
		$scope.episodes = getEpisodes(tvshowid, seasonid);
	};

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

            $scope.getStreamInfo($scope.episodedetails.file);
		})
		.error(function(data, status, headers, config) {
            $ionicLoading.hide();
            alert("Impossible de récupérer l'épisode");
		});
	}

    $scope.getStreamInfo = function(file) {

        $scope.episodePath = encodeURIComponent(file);
        $scope.streamUrl = window.base_url + '/vfs/' + $scope.episodePath;

        $scope.config = {
            sources: [{
                src: $sce.trustAsResourceUrl($scope.streamUrl),
                type: "video/mp4"
            }],
            theme: "lib/videogular-themes-default/videogular.min.css",
        };

        return $scope.config;
    };


    //lancer l'épisode cliqué
	$scope.playEpisodeOnKodi = function(file) {

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
