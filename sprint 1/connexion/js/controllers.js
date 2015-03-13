var appCtrl = angular.module('appCtrl', ['ngMaterial','ngCookies']);

appCtrl.controller('RemoteCtrl', function($scope,$http) {
});

appCtrl.controller('MoviesCtrl', function($scope,$http,$location) {
});

appCtrl.controller('MusicCtrl', function($scope) {
});

appCtrl.controller('PicsCtrl', function($scope) {
});

appCtrl.controller('SettingsCtrl', function($scope, $cookieStore, Logger) {
	$scope.IPMODEL = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

	$scope.bouton = Logger.getBouton();
	$scope.connected = Logger.getConn();
	$scope.errCon = Logger.getErr();

	$scope.login = function() {
		Logger.login($scope.user, $scope.pass, $scope.ip, $scope.port);
		
		$scope.bouton = Logger.getBouton();
		$scope.connected = Logger.getConn();
		$scope.errCon = Logger.getErr();

		if($scope.StoreID){
			$cookieStore.put('ip',$scope.ip);
			$cookieStore.put('port',$scope.port.toString());
			$cookieStore.put('user',$scope.user);
			$cookieStore.put('pass',$scope.pass);
			console.log($scope.StoreID);
		}

	};

	$scope.logout = function () {
		Logger.logout();

		$scope.bouton = Logger.getBouton();
		$scope.connected = Logger.getConn();
		$scope.errCon = Logger.getErr();
	};

	$scope.removeID = function() {
		$scope.ip= $cookieStore.remove('ip');
		$scope.port=$cookieStore.remove('port');
		$scope.user=$cookieStore.remove('user');
		$scope.pass=$cookieStore.remove('pass');
	}

	$scope.ip = $cookieStore.get('ip');
	$scope.port = parseInt($cookieStore.get('port'));
	$scope.user = $cookieStore.get('user');
	$scope.pass = $cookieStore.get('pass');
});

appCtrl.controller('AboutCtrl', function($scope, $mdDialog) {
	$scope.showAbout = showAbout;

	function showAbout() {
		about = $mdDialog.alert({
			title: "À propos",
			content: "Projet S8 groupe 8 - ENSEIRB-MATMECA 2015",
			ok: 'OK'
		});
		$mdDialog.show(about);
	}
});