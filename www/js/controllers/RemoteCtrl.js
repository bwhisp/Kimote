app.controller('RemoteCtrl', function($scope,$http, $stateParams, $location, $ionicPopup, $timeout, Sounder, Manager, Runtime, Requester, Logger) {

    $scope.model = {};

	$scope.getSync = function() {
		var playerInfos = Runtime.GetRuntime();

		if (playerInfos.shuffled === true)
			$scope.shuffledImg = true;
		else
			$scope.shuffledImg = false;

		if (playerInfos.speed === 0)
			$scope.played = false;
		else
			$scope.played = true;

		if (playerInfos.repeat === "off")
			$scope.repeatImg = 0;
		else if (playerInfos.repeat === "one")
			$scope.repeatImg = 1;
		else
			$scope.repeatImg = 2;

		if (Logger.getConn() === true) {
			Requester.GetApplicationProperties(function(data) {
				$scope.muted = data.result.muted;
			});
		}
	};

	setInterval($scope.getSync, 200);

	$scope.getRuntime = function () {
		var infos = Runtime.GetRuntime();
		$scope.model.runtime = infos.moment2;
		$scope.model.temps = infos.temps;
		$scope.model.totaltime = infos.totaltime;
		$scope.model.playeractive = infos.playeractive;
		$scope.model.getDetails = infos.getDetails;
	};

	setInterval($scope.getRuntime, 500);

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

	$scope.playerisActive = function(id) {
		if (id !== "undefined")
			return false;
		else
			return true;
	};

	$scope.whichPlayer = function(id) {
		if (id === 0)
			return true;
		else if(id === 1)
			return false;
	};

	$scope.requestMute = function() {
		method = "Application.SetMute";
		params = '{"mute":"toggle"}';
		Requester.sendRequest($http, method, params);
	};

	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Volume',
			template: '<input type="range" name="volume" ng-model="model.sound" min="0" max="100" ng-change="setVol()">',
			scope: $scope
		});

		alertPopup;
	};

	$scope.requestPlayer = function(input) {
		switch(input) {
			case "shuffle":
				method = 'Player.SetShuffle';
				params = '"shuffle":' + !Runtime.GetRuntime().shuffled;
				break;

			case "repeat":
				method = 'Player.SetRepeat';
				if (Runtime.GetRuntime().repeat === "off")
					params = '"repeat": "one"';
				else if(Runtime.GetRuntime().repeat === "one")
					params = '"repeat" : "all"';
				else
					params = '"repeat" : "off"';
				break;

			case "subtitles":
				method = 'Player.SetSubtitle';
				if (Runtime.GetRuntime().subtitles === true)
					params = '"subtitle": "off"';
				else if (Runtime.GetRuntime().subtitles === false)
					params = '"subtitle" : "on"';
				break;
			
			default:
				method = "";
				params = "";
				break;
		}

		Requester.sendRequestWithParamsForPlayer($http, method, params);
	};

	$scope.requestOSD = function () {
		method = "Input.ShowOSD";
		params = "{}";
		Requester.sendRequest($http, method, params);
	};
	
	$scope.getThumbnail = function(thumbnailUri, id) {
		if (id === 1) {
			thumbnailUri = thumbnailUri.replace("image://","");
			$scope.thumbnailUriDecoded = decodeURIComponent(thumbnailUri);
			
			return $scope.thumbnailUriDecoded;

		} else if (id === 0) {
			/*thumbnailUri = thumbnailUri.replace("image://","").replace("jpg/","jpg");
			$scope.thumbnailUriDecoded = decodeURIComponent(thumbnailUri);
			return $scope.thumbnailUriDecoded;*/

			thumbnailUri = thumbnailUri.replace("image://","");
			thumbnailURIencoded = encodeURIComponent(thumbnailUri);
			$scope.thumbnailUriComplete = window.base_url + '/image/image://' + thumbnailURIencoded;

			return $scope.thumbnailUriComplete;
		}
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
    };
});