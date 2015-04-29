app.controller('SideMenuCtrl', function($scope, $cookieStore, $ionicModal, $ionicSideMenuDelegate, $ionicPopup, Logger, Sounder, $ionicLoading, Requester) {

	/*************** sound button ******************/

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

	/* modal view for about.html */
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

	/* modal view for login.html */
	$ionicModal.fromTemplateUrl('views/login.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	/* Open modal view */
	$scope.openLogin = function() {
		$scope.modal.show();
	};

	/* Close modal view */
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};

	/* Open menu */
	$scope.showMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};

	/* modal view for autologin.html */
	$ionicModal.fromTemplateUrl('views/autologin.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalAuto = modal;
	});

	$scope.openAuto = function() {
		$scope.modalAuto.show();
	};

	$scope.closeAuto = function() {
		$scope.modalAuto.hide();
	};

	/* Functions for login */

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

	/* Functions for autologin */

	$scope.hideAuto = false;

	$scope.scanAuto = function() {
		$scope.hideAuto = false;
		ZeroConf.list("_http._tcp.local.", 5000, function(users) {
			$scope.users = users.service;
		}, function(users) {
			alert("No Media Center discovered");
		});
	};

	$scope.loadingScanAuto = function() {
		$ionicLoading.show({
			duration: 5000
		});
	};

	$scope.hideChoices = function(user) {
		$scope.hideAuto = !$scope.hideAuto;
		$scope.loginData.ip = user.addresses[0];
		$scope.loginData.port = user.port;
		$scope.loginData.username2 = user.name;
	};

	$scope.showChoices = function(user){
		$scope.hideAuto = !$scope.hideAuto;
	};
});
