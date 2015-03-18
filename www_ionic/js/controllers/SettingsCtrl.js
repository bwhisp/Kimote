app.controller('SettingsCtrl', function($scope, $cookieStore, Logger) {

	$scope.model = {};
	$scope.IPMODEL = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

	$scope.bouton = Logger.getBouton();
	$scope.connected = Logger.getConn();
	$scope.errCon = Logger.getErr();

	$scope.login = function () {
		Logger.login($scope.model.user, $scope.model.pass, $scope.model.ip, $scope.model.port);

		$scope.bouton = Logger.getBouton();
		$scope.connected = Logger.getConn();
		$scope.errCon = Logger.getErr();

		if ($scope.model.StoreID) {
			$cookieStore.put('ip',$scope.model.ip);
			$cookieStore.put('port',$scope.model.port.toString());
			$cookieStore.put('user',$scope.model.user);
			$cookieStore.put('pass',$scope.model.pass);
			console.log($scope.model.StoreID);
		}
	};

	$scope.logout = function () {
		Logger.logout();

		$scope.bouton = Logger.getBouton();
		$scope.connected = Logger.getConn();
		$scope.errCon = Logger.getErr();
	};

	$scope.removeID = function () {
		$scope.model.ip = $cookieStore.remove('ip');
		$scope.model.port = $cookieStore.remove('port');
		$scope.model.user = $cookieStore.remove('user');
		$scope.model.pass = $cookieStore.remove('pass');
	};

	$scope.model.ip = $cookieStore.get('ip');
	$scope.model.port = parseInt($cookieStore.get('port'));
    $scope.model.user = $cookieStore.get('user');
	$scope.model.pass = $cookieStore.get('pass');
});
