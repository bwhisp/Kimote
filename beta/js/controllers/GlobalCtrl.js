app.controller('GlobalCtrl', function($rootScope,$scope) {
	$rootScope.global = {
		search: ''
	};

	$scope.showSearch = true;
});