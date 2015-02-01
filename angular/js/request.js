function request (input) {
    
    method = 'Input.';
    
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
        method = method + 'Quit'; //OnQuit = quitter Kodi, Shutdown = éteindre le système
    }

    sendRequest(method);
    
}

function sendRequest (method) {

    param_url = '/jsonrpc?request={"jsonrpc": "2.0", "method": "' + method + '", "id": 1}';

    complete_url = window.base_url + param_url;

    $.ajax({
        type: "GET", // Impossible de POST avec jsonp
        crossDomain: true,
        url: complete_url,
        username: window.username,
        password: window.password,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        cache: true,
        jsonp: false,
        jsonpCallback: " "
    });
}