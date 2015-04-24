app.controller('FilesCtrl', function($scope, $http, $ionicLoading) {

	var path = "";
	$scope.title = "Sources";

	$scope.getStart = function() {
		// $scope.files = {};

		method = "Files.GetSources";
		params = '{"media":"files"}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + ',"id":2}';
		complete_url = window.base_url + param_url;

        $ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
            $scope.files = data.result.sources;
			$scope.title = "Fichiers";
            $ionicLoading.hide();
		})
		.error(function(data, status, headers, config) {
            $ionicLoading.hide();
            alert("Impossible de récupérer les sources");
		});
	}

	$scope.getDir = function(dir) {
		method = "Files.GetDirectory";
		params = '{"directory":"'+dir+'","media":"files"}}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","id":1,"method":"' + method + '", "params":' + params + ',"id":1}';
		complete_url = window.base_url + param_url;

        $ionicLoading.show();
		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
            $ionicLoading.hide();
            
            if ( !('result' in data)) {
	            // La destination est trop proche de / : accès interdit. Revenir au début
	            $scope.getStart();
            } else {
				$scope.files = data.result.files;
				path = dir;
				$scope.title = path;
			}
		})
		.error(function(data, status, headers, config) {
            $ionicLoading.hide();
		});
	}

	$scope.getFile = function(fileObj) {
		var file = fileObj.file;
		if (fileObj.filetype == "file") {
			if (getFileType(file) == 1 ) { // audio file
				play(file);
			} else {
				console.log("we can't play it");
			}

		} else {
			$scope.getDir(file);
		}

	}

	// Reconstruit le chemin du parent puis lance getDirectory
	$scope.getParent = function() {
		var reg = new RegExp("/", "g");
		var tmp = path.split(reg);
		var dir = "";
		for (var i = 1; i < tmp.length -2; i++) {
			dir = dir+'/'+tmp[i];
		}
		$scope.getDir(dir+"/");
	}

	var getFileType = function (file) {
		// Liste des extensions supportées par Kodi
		var media = ["3gp","aif","aiff","aac","amr","flac","m3u","m4a","mid","midi","mp2","mp3","ogg","oga","wav","wma",
					"avi","mp4","mkv","mpeg",
					"bmp","jpg","jpeg","gif","png","tif","tiff","ico"];

		// Extraction de l'extension
		var reg = /\.[0-9a-z]{1,5}$/i;
		var ext = (file.match(reg))[0];
		ext = ext.substring(1);
		
		if (media.indexOf(ext) > 0) {
			return 1;
		}
		
		return 0;
	}

	var play = function(file) {
		method = "Player.Open";
		params = '{"item":{"file":"' + file + '"}}';

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
		})
		.error(function(data, status, headers, config) {
			alert("Impossible de lire le titre");
		});
	};


});