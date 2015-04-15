app.controller('SideMenuCtrl', function($scope, $cookieStore, $ionicModal, $ionicSideMenuDelegate, $ionicPopup, Logger, Sounder) {

	/*************** bouton son ******************/

	$scope.soundbar = {};
	$scope.sound = Sounder.getVolume();

	$scope.setVol = function () {
		Sounder.SetVol($scope.soundbar.sound);
		$scope.soundbar.sound = Sounder.getVolume();
	};

	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Volume',
			template: '<input type="range" name="volume" ng-model="soundbar.sound" min="0" max="100" ng-change="setVol()">',
			scope: $scope
		});

		alertPopup.then(function(res) {
			console.log('In alertPopup.then');
		});
	};

	/*********************************************/

	/* Vue modal pour about.html */
	$ionicModal.fromTemplateUrl('views/about.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalAbout = modal;
	});

	$scope.openAbout = function() {
		$scope.modalAbout.show();
	};

	$scope.closeAbout = function() {
		$scope.modalAbout.hide();
	};

	/* Vue modal pour la connexion*/
	$ionicModal.fromTemplateUrl('views/login.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	/* Ouvre le modal */
	$scope.openLogin = function() {
		$scope.modal.show();
	};

	/* Ferme le modal */
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};

	/* Ouvre le menu */
	$scope.showMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};

	/* Fonctions login */

	$scope.loginData = {};
	$scope.IPMODEL = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

	$scope.bouton = Logger.getBouton();
	$scope.connected = Logger.getConn();
	$scope.errCon = Logger.getErr();
	$scope.loginData.StoreID = true;

	$scope.doLogin = function () {
		Logger.login($scope.loginData.username, $scope.loginData.password, $scope.loginData.ip, $scope.loginData.port);

		$scope.bouton = Logger.getBouton();
		$scope.connected = Logger.getConn();
		$scope.errCon = Logger.getErr();

		if ($scope.loginData.StoreID) {
			$cookieStore.put('ip',$scope.loginData.ip);
			$cookieStore.put('port',$scope.loginData.port.toString());
			$cookieStore.put('username',$scope.loginData.username);
			$cookieStore.put('password',$scope.loginData.password);
			console.log($scope.loginData.StoreID);
		}

		$scope.closeLogin();
	};

	$scope.logout = function () {
		Logger.logout();

		$scope.bouton = Logger.getBouton();
		$scope.connected = Logger.getConn();
		$scope.errCon = Logger.getErr();
	};

	$scope.removeID = function () {
		$scope.loginData.ip = $cookieStore.remove('ip');
		$scope.loginData.port = $cookieStore.remove('port');
		$scope.loginData.username = $cookieStore.remove('username');
		$scope.loginData.password = $cookieStore.remove('password');
	};

	$scope.loginData.ip = $cookieStore.get('ip');
	$scope.loginData.port = parseInt($cookieStore.get('port'));
	$scope.loginData.username = $cookieStore.get('username');
	$scope.loginData.password = $cookieStore.get('password');
});
