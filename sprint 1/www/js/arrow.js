function arrow (direction) {
    
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
    else if (direction === 'select') {
        method = method + 'Select';
    }
    else if (direction === 'home') {
        method = method + 'Home';
    }
    else if (direction === 'back') {
        method = method + 'Back';
    }
    
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
        /*beforeSend: function(xhr) { 
            xhr.setRequestHeader("Authorization", "Basic " + btoa(window.username + ":" + window.password)); 
        }*/
    });

}