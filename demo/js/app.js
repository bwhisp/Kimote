document.addEventListener('deviceready', function() {
    if (navigator.notification) {
        window.alert = function (message) {
            navigator.notification.alert(message,null,"Komote",'OK');
        };
    }
}, false);

var app = angular.module('app', ['ionic','ngCookies']);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    // tabs
    .state('tabs', {
        url: "/tab",
        abstract: true,
        templateUrl: "views/tabs.html"
    })

    //about
    .state('tabs.about', {
        url: "/about",
        views: {
            'about-tab': {
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
                templateUrl: "views/movies.html",
                controller: 'MoviesCtrl'
            }
        }
    })
    .state('tabs.movie-details', {
        url: "/movies/:movieLabel",
        views: {
            "movies-tab": {
                templateUrl: "views/movie-detail.html",
                controller: 'MoviesCtrl'
            }
        }
    })

    //tab tvshows
    .state('tabs.tvshows', {
        url: "/tvshows",
        views: {
            'tvshows-tab': {
                templateUrl: "views/tvshows.html",
                controller: "TVShowsCtrl"
            }
        }
    })
    .state('tabs.tvshow-detail', {
        url:'/tvshows/:seriesLabel/:seriesId',
        views: {
            'tvshows-tab': {
                templateUrl: 'views/tvshow-detail.html',
                controller: 'TVShowsCtrl'
            }
        }
    })
    .state('tabs.season-detail', {
        url:'/season-detail/:seriesId/:seasonId',
        views: {
            'tvshows-tab': {
                templateUrl: 'views/season-detail.html',
                controller: 'TVShowsCtrl'
            }
        }
    })
    .state('tabs.episode-detail', {
        url:'/episode-detail/:episodeLabel/:episodeId',
        views: {
            'tvshows-tab': {
                templateUrl: 'views/episode-detail.html',
                controller: 'TVShowsCtrl'
            }
        }
    })

    //tab music
    .state('tabs.music', {
        url: "/music",
        views: {
            'music-tab': {
                templateUrl: "views/music.html",
                controller: "MusicCtrl"
            }
        }
    })
    .state('tabs.music-albums', {
        url: '/albums/:artistLabel/:artistId',
        views: {
            'music-tab': {
                templateUrl: 'views/music-albums.html',
                controller: 'MusicCtrl'
            }
        }
    })
    .state('tabs.music-songs', {
        url: '/songs/:albumLabel/:albumId',
        views: {
            'music-tab': {
                templateUrl: 'views/music-songs.html',
                controller: 'MusicCtrl'
            }
        }
    })

    .state('tabs.pics', {
        url : '/pics',
        views : {
            'pics-tab': {
                templateUrl: 'views/pics.html',
                controller: 'PicsCtrl'
            }
        }
    })

    $urlRouterProvider.otherwise("/tab/remote");

});
