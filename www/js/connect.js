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
$.getJSON("js/param.json", function(data) {  
    console.log("JSON Data: " + data);
    $.each(data, function(key, val) {
        console.log(key + ":" + val);
    });
});

var ip = '172.16.90.221';
var port = '8080';
var method = 'Input.Left'; // Test avec Input.Left (déplacement gauche)

var url = 'http://' + ip + ':' + port + '/jsonrpc?request={"jsonrpc": "2.0", "method": "' + method + '", "id": 1}';

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

