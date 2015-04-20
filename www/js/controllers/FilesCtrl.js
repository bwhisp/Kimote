app.controller('FilesCtrl', function($scope, $http, $ionicLoading, Loader) {

	$scope.path = "/files";
/*
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
	};*/

	$scope.setLoader= function () {
	alert("toto");

		Loader.getArtists(function (data){
			$scope.data.artists= data.result.artists;
		
	});


	Loader.getAlbums(function (data){
			$scope.data.albums= data.result.albums;
			alert(albums);
	
	});
		Loader.getSongs(function (data){
			$scope.data.songs= data.result.song;
			alert(songs);
	
	});

			Loader.getMovies(function (data){
			$scope.data.movies= data.result.Movies;
			alert(movies);
	
	});

	Loader.getSeries(function (data){
			$scope.data.series= data.result.series;
			alert(series);
	
	});


	Loader.getSeasons(function (data){
			$scope.data.seasons= data.result.seasons;
			alert(seasons);
	
	});


		Loader.getEpisodes(function (data){
			$scope.data.episodes= data.result.episodes;
			alert(episodes);
	
	});


};


});