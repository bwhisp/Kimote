/*
 * @name GlobalCtrl
 * @requires $rootScope, $scope
 * @description - Controleur pour la recherche de films, séries et musique
 */

app.controller('GlobalCtrl', function($rootScope, $scope) {
	$rootScope.global = {
		search: ''
	};

	$scope.showSearch = true;
});
