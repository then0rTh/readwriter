window.addEventListener('load', () => {
    document.getElementById('status').innerHTML = 'status:<br>';
    document.getElementById('output-el').innerHTML = 'output-el:<br>';
});

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('worker.js')
        .then(function (reg) {
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function (error) {
            console.log('Registration failed with ' + error);
        });
    } else {
        alert('no serviceWorker');
    }
});

window.addEventListener('load', () => {
    document.getElementById('status').innerHTML += '<br>nfc' in navigator ? 'found' : 'not found';
    navigator.nfc.watch((message) => {
        // alert('message');
        document.getElementById('output-el').innerHTML += '<br>' + JSON.dump(message);
        // if (message.records[0].recordType == 'empty') {
        //     document.getElementById('status').innerHTML += '<br>empty';
        // } else {
        //     document.getElementById('status').innerHTML += '<br>Read message written by ' + message.url;
        //     processMessage(message);
        // }
    }, {mode: 'any'}).then(() => {
        document.getElementById('status').innerHTML += "<br>Added a watch.";
    }).catch((error) => {
        document.getElementById('status').innerHTML += "<br>Adding watch failed: " + error.name;
        alert("Adding watch failed: " + error.name);
    });
});

function processMessage(message) {
    const el = document.getElementById('output-el');
    for (let record of message.records) {
        switch (record.recordType) {
            case "text":
                el.innerHTML += '<br>Data is text: ' + record.data;
                break;
            case "url":
                el.innerHTML += '<br>Data is URL: ' + record.data;
                break;
            case "json":
                el.innerHTML += '<br>JSON data: ' + record.data.myProperty.toString();
                break;
        }
    }
}
