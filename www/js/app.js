document.addEventListener('deviceready', function() {
	if (navigator.notification) {
		window.alert = function (message) {
			navigator.notification.alert(message,null,"Kimote",'OK');
		};
	}
}, false);

var app = angular.module('app', [
	'ionic',
	'ngCookies',
	'ngSanitize',
	'angular-duration-format',
	'com.2fdevs.videogular',
	'com.2fdevs.videogular.plugins.controls',
	'com.2fdevs.videogular.plugins.overlayplay',
	'com.2fdevs.videogular.plugins.buffering',
	'com.2fdevs.videogular.plugins.poster',
	'com.2fdevs.videogular.plugins.dash'
]);

app.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});

app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	// tabs
	.state('tabs', {
		url: "/tab",
		abstract: true,
		templateUrl: "views/tabs.html"
	})

	//about
	.state('about', {
		url: "/about",
		views: {
			'about': {
				templateUrl: "views/about.html"
			}
		}
	})

	//tab remote
	.state('tabs.remote', {
		url: "/remote",
		views: {
			'remote-tab': {
				templateUrl: "views/remote.html",
				controller: 'RemoteCtrl'
			}
		}
	})

	//tab movies
	.state('tabs.movies', {
		url: "/movies",
		views: {
			'movies-tab': {
				templateUrl: "views/movies/movies.html",
				controller: 'MoviesCtrl'
			}
		}
	})
	.state('tabs.movie-details', {
		url: "/movies/:movieLabel",
		views: {
			"movies-tab": {
				templateUrl: "views/movies/movie-detail.html",
				controller: 'MoviesCtrl'
			}
		}
	})

	//tab tvshows
	.state('tabs.tvshows', {
	url: "/tvshows",
		views: {
			'tvshows-tab': {
				templateUrl: "views/tvshows/tvshows.html",
				controller: "TVShowsCtrl"
			}
		}
	})
	.state('tabs.tvshow-detail', {
		url:'/tvshows/:seriesLabel/:seriesId',
		views: {
			'tvshows-tab': {
				templateUrl: 'views/tvshows/tvshow-detail.html',
				controller: 'TVShowsCtrl'
			}
		}
	})
	.state('tabs.season-detail', {
		url:'/season-detail/:seriesId/:seasonId',
		views: {
			'tvshows-tab': {
				templateUrl: 'views/tvshows/season-detail.html',
				controller: 'TVShowsCtrl'
			}
		}
	})
	.state('tabs.episode-detail', {
		url:'/episode-detail/:episodeLabel/:episodeId',
		views: {
			'tvshows-tab': {
				templateUrl: 'views/tvshows/episode-detail.html',
				controller: 'TVShowsCtrl'
			}
		}
	})

	//tab music
	.state('tabs.music', {
		url: "/music",
		views: {
			'music-tab': {
				templateUrl: "views/music/music.html",
				controller: "MusicCtrl"
			}
		}
	})
	.state('tabs.music-albums', {
		url: '/albums/:artistLabel/:artistId',
		views: {
			'music-tab': {
				templateUrl: 'views/music/music-albums.html',
				controller: 'MusicCtrl'
			}
		}
	})
	.state('tabs.music-songs', {
		url: '/songs/:albumLabel/:albumId',
		views: {
			'music-tab': {
				templateUrl: 'views/music/music-songs.html',
				controller: 'MusicCtrl'
			}
		}
	})
	.state('tabs.track-detail', {
		url: '/track-detail/:songId/:songLabel',
		views: {
			'music-tab': {
				templateUrl: 'views/music/track-detail.html',
				controller: 'MusicCtrl'
			}
		}
	})

	//tab files
	.state('tabs.files', {
		url : '/files',
		views : {
			'files-tab' : {
				templateUrl : 'views/files.html',
				controller : 'FilesCtrl'
			}
		}
	})

	//tab pictures
	.state('tabs.pics', {
		url : '/pics',
		views : {
			'pics-tab': {
				templateUrl: 'views/pics.html',
				controller: 'PicsCtrl'
			}
		}
	});

	$urlRouterProvider.otherwise("/tab/remote");
});
