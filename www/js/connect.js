/* connect.js
 *
 * Connexion à Kodi en passant une requête en paramètre de l'url.
 * Données en JSON. JSONP utilisé pour du cross-domain (connexion sur
 * autre machine du réseau).
 * 
 * Issues : Uncaught SyntaxError : Kodi renvoie du JSON au lieu du JSONP
 *          attendu
 * 
 */

// Récupère les paramètres de param.json (pas utilisé dans connect.js)
//$.getJSON("js/param.json", function (data) {  
//    console.log("JSON Data: " + data);
//    $.each(data, function (key, val) {
//        console.log(key + ":" + val);
//    });
//});

//var ip = document.getElementById("ip").value;

//
var ip;
var port;
var url;

// Connexion à partir du formulaire login
function login () {
    ip = document.forms["login"].elements["ip"].value; 
    port = document.forms["login"].elements["port"].value;
    //this.ip = form.ip.value;
    //this.port = form.port.value;
    
    url = 'http://' + ip + ':' + port;
    
}

var method = 'Input.Left'; // Test avec Input.Left (déplacement gauche)
param_url = '/jsonrpc?request={"jsonrpc": "2.0", "method": "' + method + '", "id": 1}';

$.ajax({
    type: "GET", // Impossible de POST avec jsonp
    crossDomain: true,
    url: url,
    username: "kodi",
    password: "pass",
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "jsonp",
    cache: true,
    jsonp: false,
    jsonpCallback: " "
});

