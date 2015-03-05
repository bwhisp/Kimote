app.controller('MusicCtrl', function($scope,$http,$location) {
	$scope.showArtists = function() {
		method = "AudioLibrary.GetArtists";
		params = '{"properties":["style","description","born","yearsactive","died","thumbnail","genre","fanart"],"limits":{"start":1,"end":2000}},"id":"libMusic"';

		getArtists($http, method, params);
	};

	function getArtists($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$scope.artists = data.result.artists;
		})
		.error(function(data, status, headers, config) {
			console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
		});
	}

	$scope.showAlbums = function() {
		method = "AudioLibrary.GetAlbums";
		params = '{"limits":{"start":0,"end":50},"properties":["playcount","artist","genre","rating","thumbnail","year","mood","style"],"sort":{"order":"ascending","method":"album","ignorearticle":true}},"id":"libAlbums"}';

		getAlbums($http, method, params);
	};

	function getAlbums($http, method, params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$scope.albums = data.result.albums;
		})
		.error(function(data, status, headers, config) {
			console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
		});
	}

	$scope.getThumbnail = function (thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","").replace("jpg/","jpg");
		$scope.thumbnailUriDecoded = decodeURIComponent(thumbnailUri);
		
		return $scope.thumbnailUriDecoded;
	};

	$scope.selectedAlbum = undefined;
	$scope.selectAlbum = function (index) {
		if ($scope.selectedAlbum !== index) {
			$scope.selectedAlbum = index;
		}
		else {
			$scope.selectedAlbum = undefined;
		}
	};
});