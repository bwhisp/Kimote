var ip;
var port;
var url;

// ip et port a récupérer avec connect.js
function arrow (direction) {
    //ip = document.forms["login"].elements["ip"].value; 
    //port = document.forms["login"].elements["port"].value;
    
    ip = "192.168.22.167";
    port = "8080";
    
    url = 'http://' + ip + ':' + port;
    
    var method = 'Input.';
    if (direction === 'left') {
        method = method + 'Left';
    }
    else if (direction === 'right') {
        method = method + 'Right';
    }
    else if (direction === 'up') {
        method = method + 'Up';
    }
    else if (direction === 'down') {
        method = method + 'Down';
    }
    
    param_url = '/jsonrpc?request={"jsonrpc": "2.0", "method": "' + method + '", "id": 1}';
    
    complete_url = url + param_url;

    $.ajax({
        type: "GET", // Impossible de POST avec jsonp
        crossDomain: true,
        url: complete_url,
        username: "kodi",
        password: "pass",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        cache: true,
        jsonp: false,
        jsonpCallback: " "
    });

}