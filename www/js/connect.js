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

var ip;
var port;
var username;
var password;
var base_url;

// Connexion à partir du formulaire login
function login () {
    ip = document.forms["login"].elements["ip"].value; 
    port = document.forms["login"].elements["port"].value;
    username = document.forms["login"].elements["username"].value;
    password = document.forms["login"].elements["password"].value;
    
    base_url = 'http://' + ip + ':' + port;
}