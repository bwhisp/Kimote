var appCtrl = angular.module('appCtrl', ['ngMaterial']);
var vol = 50;

appCtrl.controller('RemoteCtrl', function($scope,$http) {

	/*	Test : on va mettre les infos de connexion au Kodi en dur ici	*/
	username = "kodi";
	password = "admin";
	ip = "127.0.0.1";
	port = "8080";

	window.base_url = 'http://' + username + ':' + password + '@' + ip + ':' + port;
	/*	Fin du bidouillage pour le test	*/

	$scope.sound = vol;

	$scope.setVol = function(){
		vol = $scope.sound;
		method = 'Application.';
		method = method + 'SetVolume';	
		params = ',"params":{"volume":'	+$scope.sound+ '}';
		sendRequest($http, method,params);
	}

	$scope.request = function request(input) {
		method = 'Input.';
		params = '';

		if (input === 'left') {
			method = method + 'Left';
		}
		else if (input === 'right') {
			method = method + 'Right';
		}
		else if (input === 'up') {
			method = method + 'Up';
		}
		else if (input === 'down') {
			method = method + 'Down';
		}
		else if (input === 'select') {
			method = method + 'Select';
		}
		else if (input === 'home') {
			method = method + 'Home';
		}
		else if (input === 'back') {
			method = method + 'Back';
		}
		else if (input === 'shutdown') {
			method = 'Application.';
			method = method + 'Quit'; //OnQuit = quitter Kodi, System.Shutdown = éteindre le système
		}
		else if (input === 'connect') {
			method = '';
		}
		else if(input === 'mute') {
			
	    	method = 'Application.';
	    	method = method + 'SetMute'; 
			params = ',"params":{"mute":true}';
			sendRequest($http, method,params);
/* 			url = 'http://kodi:coucou@192.168.0.48:8080/jsonrpc?request={"jsonrpc":"2.0","method":"Application.SetMute","params":{"mute":false},"id":1}';
			$http.jsonp(url); */

	    }
		
		else if(input === 'unmute') {
	    	method = 'Application.';
	    	method = method + 'SetMute'; 
			params = ',"params":{"mute":false}';
	    }
		
		else if(input === 'volumeUp') {
	    	method = 'Application.';

	    	method = method + 'SetVolume';
	    	if(vol <= 100)
	    		vol = vol + 1;
			params = ',"params":{"volume":'	+vol+ '}';
			sendRequest($http, method,params);
	    }		
		
	    else if(input === 'volumeDown'){
	    	method = 'Application.';
	    	method = method + 'SetVolume';
	    	if(vol >= 0)
	    		vol = vol - 1;
			params = ',"params":{"volume":'	+vol+ '}';
			sendRequest($http, method,params);
	    }

/* 		   else if(input === 'pause'){
	    	method = 'Player.';
	    	method = method + 'PlayPause';
			params =  ',"params":{"playerid":0}';
			sendRequest($http, method,params);
	    }

		   else if(input === 'play'){
	    	method = 'Application.';
	    	method = method + '';
	    	params = '';
			sendRequest($http, method,params);
	    }	 */	
		
	    sendRequest($http, method,params);
	};

	function sendRequest($http, method) {
		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '" '+ params +'}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}}).error(function() {
			alert("Vous n'êtes pas connecté");
		});
	}
});

appCtrl.controller('MoviesCtrl', function($scope,$http,$location) {
});

appCtrl.controller('MusicCtrl', function($scope) {
});

appCtrl.controller('PicsCtrl', function($scope) {
});

appCtrl.controller('SettingsCtrl', function($scope, Logger) {
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