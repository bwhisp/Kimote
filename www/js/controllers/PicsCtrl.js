app.controller('PicsCtrl', function($scope, $http, Requester) {

	$scope.request = function (input) {
		switch (input) {
			case "zoom+" :
				Requester.requestInput(input);
				break;
			case "zoom-" :
				Requester.requestInput(input);
				break;
			case "pictures" :
				Requester.requestGUI(input);
				break;

			default :
				Requester.requestInput(input);
				break;
		}
	};
});
