app.controller('RemoteCtrl', function($scope,$http, $stateParams, $location, Sounder, Manager, Runtime, Requester) {

    $scope.model = {};
    $scope.paused = Manager.getPaused();
    $scope.played = Manager.getPlayed();

    $scope.model.runtime;
    $scope.model.temps;
    $scope.model.totaltime;
    $scope.model.playeractive;

    $scope.getRuntime = function () {
        $scope.model.runtime = Runtime.GetRuntime().moment2;
        $scope.model.temps = Runtime.GetRuntime().temps;
        $scope.model.totaltime = Runtime.GetRuntime().totaltime;
        $scope.model.playeractive = Runtime.GetRuntime().playeractive;
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
