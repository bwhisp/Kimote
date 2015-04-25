basket.clear();
basket.require(
	/*	Loading libraries	*/
	{url:'lib/ionic/js/ionic.bundle.js'},
	{url:'lib/angular-cookies/angular-cookies.min.js'},
	{url:'lib/videogular/videogular.min.js'},
	{url:'lib/videogular-controls/vg-controls.min.js'},
	{url:'lib/videogular-overlay-play/vg-overlay-play.min.js'},
	{url:'lib/videogular-poster/vg-poster.min.js'},
	{url:'lib/videogular-buffering/vg-buffering.min.js'},
	{url:'lib/videogular-dash/vg-dash.min.js'},

	/*	Loading app.js	*/
	{url:'js/app.js'},

	/*	Loading controllers	*/
	{url:'js/controllers/SideMenuCtrl.js'},
	{url:'js/controllers/RemoteCtrl.js'},
	{url:'js/controllers/MoviesCtrl.js'},
	{url:'js/controllers/MusicCtrl.js'},
	{url:'js/controllers/TVShowsCtrl.js'},
	{url:'js/controllers/PicsCtrl.js'},
	{url:'js/controllers/FilesCtrl.js'},

	/*	Loading factories	*/
	{url:'js/factories/Logger.js'},
	{url:'js/factories/Sounder.js'},
	{url:'js/factories/Manager.js'},
	{url:'js/factories/Runtime.js'},
	{url:'js/factories/Loader.js'},
	{url:'js/factories/Requester.js'}
);