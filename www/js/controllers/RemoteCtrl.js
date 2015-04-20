app.controller('RemoteCtrl', function($scope,$http, $stateParams, $location, $ionicPopup, $timeout, Sounder, Manager, Runtime, Requester) {

    $scope.model = {};
    
    $scope.model.runtime;
    $scope.model.temps;
    $scope.model.totaltime;
    $scope.model.playeractive;


    $scope.getRuntime = function () {
    	var infos = Runtime.GetRuntime();
        $scope.model.runtime = infos.moment2;
        $scope.model.temps = infos.temps;
        $scope.model.totaltime = infos.totaltime;
        $scope.model.playeractive = infos.playeractive;
        $scope.shuffled = infos.shuffled;	
        if(infos.speed==0)
        	$scope.played = false;
        else 
        	$scope.played = true;
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

	$scope.requestPlayer = function(input) {

		switch(input){
			case "shuffle" :
			method = 'Player.SetShuffle';
			params = '"shuffle":' + !Runtime.GetRuntime().shuffled;
			break;

			case "repeat" :
			method = 'Player.SetRepeat';
			if(Runtime.GetRuntime().repeat == "off")
			params = '"repeat": "one"';
			else if(Runtime.GetRuntime().repeat == "one")
				params = '"repeat" : "all"';
				else 
					params = '"repeat" : "off"';
			break;
			
			default :
			method="";
			params="";
			break;

		}

		Requester.sendRequestWithParamsForPlayer($http, method, params);
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
