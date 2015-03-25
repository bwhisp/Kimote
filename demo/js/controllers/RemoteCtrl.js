app.controller('RemoteCtrl', function($scope,$http, $stateParams, $location, Sounder, Manager, Runtime, Requester) {

    $scope.model = {};
    $scope.paused = Manager.getPaused();
    $scope.played = Manager.getPlayed();

    $scope.model.runtime;
    $scope.getRuntime = function () {
        $scope.model.runtime=Runtime.GetRuntime();
    };

    setInterval($scope.getRuntime,500);
    $scope.setRuntime = function () {
        Runtime.SetRuntime($scope.model.runtime);
    };

    $scope.muted = Sounder.getMuted();
    $scope.volume = Sounder.getVolume();
    $scope.sound = Sounder.getVolume();

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

        $scope.muted = Sounder.getMuted();
        $scope.volume = Sounder.getVolume();
    };
});
