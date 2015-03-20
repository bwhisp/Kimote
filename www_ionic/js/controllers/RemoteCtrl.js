app.controller('RemoteCtrl', function($scope, $http, $stateParams, $location, Sounder, Manager, Runtime, Requester) {

	$scope.model = {};

	$scope.model.runtime;
	$scope.model.temps;

	$scope.getRuntime = function () {
		$scope.model.runtime=Runtime.GetRuntime().moment2;
		$scope.model.temps=Runtime.GetRuntime().temps;
		console.log("model.temps")
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
		
    $scope.muted = Sounder.getMuted();
	$scope.volume = Sounder.getVolume();
	$scope.sound = Sounder.getVolume();

	$scope.paused = Manager.getPaused();
	$scope.played = Manager.getPlayed();

	$scope.setVol = function () {
		Sounder.SetVol($scope.model.sound);
		$scope.model.sound = Sounder.getVolume();
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

		$scope.played = Manager.getPlayed();
		$scope.paused = Manager.getPaused();
		$scope.muted = Sounder.getMuted();
		$scope.volume = Sounder.getVolume();
	};

});
