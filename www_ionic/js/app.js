// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

// Notifications natives
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
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});

app.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "views/tabs.html"
    })

    // Each tab has its own nav history stack:
    .state('tab.remote', {
        url: '/remote',
        views: {
            'remote': {
                templateUrl: 'views/remote.html',
                controller: 'RemoteCtrl'
            }
        }
    })

    .state('tab.movies', {
        url: '/movies',
        views: {
            'movies': {
                templateUrl: 'views/movies.html',
                controller: 'MoviesCtrl'
            }
        }
    })
    .state('tab.movie-detail', {
        url: '/movies/:movieLabel',
        views: {
            'movies': {
                templateUrl: 'views/movie-detail.html',
                controller: 'MoviesCtrl'
            }
        }
    })

    .state('tab.tvshows', {
        url: '/tvshows',
        views: {
            'tvshows': {
                templateUrl: 'views/tvshows.html',
                controller: 'SeriesCtrl'
            }
        }
    })
    .state('tab.tvshow-detail', {
        url:'/tvshows/:seriesLabel/:seriesId',
        views: {
            'tvshows': {
                templateUrl: 'views/tvshow-detail.html',
                controller: 'SeriesCtrl'
            }
        }
    })
    .state('tab.season-detail', {
        url:'/season-detail/:seriesId/:seasonId',
        views: {
            'tvshows': {
                templateUrl: 'views/season-detail.html',
                controller: 'SeriesCtrl'
            }
        }
    })
    .state('tab.episode-detail', {
        url:'/episode-detail/:episodeLabel/:episodeId',
        views: {
            'tvshows': {
                templateUrl: 'views/episode-detail.html',
                controller: 'SeriesCtrl'
            }
        }
    })

    .state('tab.music', {
        url:'/music',
        views: {
            'music': {
                templateUrl: 'views/music.html',
                controller: 'MusicCtrl'
            }
        }
    })
    .state('tab.music-albums', {
        url: '/albums/:artistLabel/:artistId',
        views: {
            'music': {
                templateUrl: 'views/music-albums.html',
                controller: 'MusicCtrl'
            }
        }
    })
    .state('tab.music-songs', {
        url: '/songs/:albumLabel/:albumId',
        views: {
            'music': {
                templateUrl: 'views/music-songs.html',
                controller: 'MusicCtrl'
            }
        }
    })
    .state('tab.pics', {
        url : '/pics',
        views : {
            'pics': {
                templateUrl: 'views/pics.html',
                controller: 'PicsCtrl'
            }
        }
    })
    .state('tab.settings', {
        url: '/settings',
        views: {
            'settings': {
                templateUrl: 'views/settings.html',
                controller: 'SettingsCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/remote');

});
