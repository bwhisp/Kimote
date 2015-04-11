app.controller('FilesCtrl', function($scope, $http, $ionicLoading) {

	$scope.path = "";

	$scope.getDir = function(dir) {
		method = "Files.GetDirectory";
		params = '{"directory":"'+dir+'","limits":{"start":1,"end":2000}},"sort":{"method":"file"}}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$ionicLoading.hide();
			$scope.files = data;
			console.log(data);
			$scope.path = $scope.path + dir;
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
			alert("Impossible de récupérer les fichiers");
		});
	};

	$scope.getFile = function(file) {
		if (file.filetype == "directory") {
			getDir(file);
		} else if (file.filetype == "file") {
			switch (file.type) {
				case "movie" :
					console.log("It's a movie");
					break;
				case "episode" :
					console.log("It's a TV Show");
					break;
				case "song" :
					console.log("Get that music played !");
					break;
				case "picture" :
					console.log("Display this picture !!");
					break;
				default :
					console.log("File");
					break;
			}
		}
	};
});
app.controller('MoviesCtrl', function($scope, $http, $stateParams, $location, $ionicLoading, $sce, Loader) {

    $scope.movie_label = $stateParams.movieLabel;

    //préparation de la requête http pour afficher la liste des films
	$scope.showMovies = function() {
		$scope.movies = Loader.getMovies();
		console.log($scope.movies.size())
		console.log($scope.movies[0].label);
	};

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

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + ',"id":1}';
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
			alert("Impossible de récupérer les artistes");
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
			alert("Impossible de récupérer les albums");
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
			alert("Impossible de récupérer les titres");
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
			alert("Impossible de récupérer l'épisode");
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

app.controller('PicsCtrl', function($scope, $http, Requester) {

	$scope.request = function (input) {
		switch (input) {
			case "zoom+" :
				Requester.requestInput(input);
				break;
			case "zoom-" :
				Requester.requestInput(input);
				break;
			case "pictures" :
				Requester.requestGUI(input);
				break;

			default :
				Requester.requestInput(input);
				break;
		}
	};
});

app.controller('RemoteCtrl', function($scope,$http, $stateParams, $location, $ionicPopup, $timeout, Sounder, Manager, Runtime, Requester) {

	$scope.model = {};
	$scope.paused = Manager.getPaused();
	$scope.played = Manager.getPlayed();

	$scope.model.runtime;
	$scope.model.temps;
	$scope.model.totaltime;
	$scope.model.playeractive;

	$scope.getRuntime = function () {
		$scope.model.runtime = Runtime.GetRuntime().moment2;
		$scope.model.temps = Runtime.GetRuntime().temps;
		$scope.model.totaltime = Runtime.GetRuntime().totaltime;
		$scope.model.playeractive = Runtime.GetRuntime().playeractive;
	};

	setInterval($scope.getRuntime,500);

	$scope.setRuntime = function () {
		Runtime.SetRuntime($scope.model.runtime);
	};

	$scope.toMinutes = function(temps) {
		var seconds = temps.seconds;
		var minutes = temps.minutes;
		var hours = temps.hours;

		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (hours < 10) {
			hours = "0" + hours;
		}

		var time = hours + ':' + minutes + ':' + seconds;

		return time;
	};

	$scope.playerisActive = function(id) {
		if (id != "undefined")
			return false;
		else
			return true;
	};

	$scope.muted = Sounder.getMuted();
	$scope.volume = Sounder.getVolume();
	$scope.sound = Sounder.getVolume();

	$scope.setVol = function () {
		Sounder.SetVol($scope.model.sound);
		$scope.model.sound = Sounder.getVolume();
	};

	$scope.requestMute = function (muted) {
		method = "Application.SetMute";
		params = '{"mute":' + muted + '}';
		$scope.muted = !muted;

		Requester.sendRequest($http, method, params);
	};

	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Volume',
			template: '<input type="range" name="volume" ng-model="model.sound" min="0" max="100" ng-change="setVol()">',
			scope: $scope
		});

		alertPopup.then(function(res) {
			console.log('In alertPopup.then');
		});
	};

	$scope.request = function (input) {
		switch (input) {

			case "fullscreen" :
				Requester.requestGUI(input);
				break;
			case "shutdown" :
				Requester.requestApplication(input, 0);
				break;
			case "mute" :
				Requester.requestApplication(input, 0);
				break;
			case "unmute" :
				Requester.requestApplication(input, 0);
				break;
			case "volumeUp" :
				Requester.requestApplication(input, $scope.volume);
				break;
			case "volumeDown" :
				Requester.requestApplication(input, $scope.volume);
				break;

			default :
				Requester.requestInput(input);
				break;
		}

		$scope.muted = Sounder.getMuted();
		$scope.volume = Sounder.getVolume();
	};
});

app.controller('SideMenuCtrl', function($scope, $cookieStore, $ionicModal, $ionicSideMenuDelegate, $ionicPopup, Logger, Sounder) {

	/*************** bouton son ******************/

	$scope.soundbar = {};
	$scope.sound = Sounder.getVolume();

	$scope.setVol = function () {
		Sounder.SetVol($scope.soundbar.sound);
		$scope.soundbar.sound = Sounder.getVolume();
	};

	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Volume',
			template: '<input type="range" name="volume" ng-model="soundbar.sound" min="0" max="100" ng-change="setVol()">',
			scope: $scope
		});

		alertPopup.then(function(res) {
			console.log('In alertPopup.then');
		});
	};

	/*********************************************/

	/* Vue modal pour about.html */
	$ionicModal.fromTemplateUrl('views/about.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalAbout = modal;
	});

	$scope.openAbout = function() {
		$scope.modalAbout.show();
	};

	$scope.closeAbout = function() {
		$scope.modalAbout.hide();
	};

	/* Vue modal pour la connexion*/
	$ionicModal.fromTemplateUrl('views/login.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	/* Ouvre le modal */
	$scope.openLogin = function() {
		$scope.modal.show();
	};

	/* Ferme le modal */
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};

	/* Ouvre le menu */
	$scope.showMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};

	/* Fonctions login */

	$scope.loginData = {};
	$scope.IPMODEL = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

	$scope.bouton = Logger.getBouton();
	$scope.connected = Logger.getConn();
	$scope.errCon = Logger.getErr();
	$scope.loginData.StoreID = true;

	$scope.doLogin = function () {
		Logger.login($scope.loginData.username, $scope.loginData.password, $scope.loginData.ip, $scope.loginData.port);

		$scope.bouton = Logger.getBouton();
		$scope.connected = Logger.getConn();
		$scope.errCon = Logger.getErr();

		if ($scope.loginData.StoreID) {
			$cookieStore.put('ip',$scope.loginData.ip);
			$cookieStore.put('port',$scope.loginData.port.toString());
			$cookieStore.put('username',$scope.loginData.username);
			$cookieStore.put('password',$scope.loginData.password);
			console.log($scope.loginData.StoreID);
		}

		$scope.closeLogin();
	};

	$scope.logout = function () {
		Logger.logout();

		$scope.bouton = Logger.getBouton();
		$scope.connected = Logger.getConn();
		$scope.errCon = Logger.getErr();
	};

	$scope.removeID = function () {
		$scope.loginData.ip = $cookieStore.remove('ip');
		$scope.loginData.port = $cookieStore.remove('port');
		$scope.loginData.username = $cookieStore.remove('username');
		$scope.loginData.password = $cookieStore.remove('password');
	};

	$scope.loginData.ip = $cookieStore.get('ip');
	$scope.loginData.port = parseInt($cookieStore.get('port'));
	$scope.loginData.username = $cookieStore.get('username');
	$scope.loginData.password = $cookieStore.get('password');
});

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

app.controller('TVShowsCtrl', function($scope, $http, $location, $stateParams, $ionicLoading, $sce) {
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
