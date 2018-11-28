document.getElementById('status').innerHTML = 'status';
document.getElementById('output-el').innerHTML = 'output-el';
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

document.getElementById('status').innerHTML = 'nfc' in navigator ? 'found' : 'not found';
navigator.nfc.watch((message) => {
  const el = document.getElementById('status');
  if (message.records[0].recordType == 'empty') {
      el.innerHTML = 'empty';
    // navigator.nfc.push({
    //   url: "/custom/path",
    //   records: [{ recordType: "text", data: 'Hello World' }]
    // });
  } else {
    el.innerHTML = 'Read message written by ' + message.url;
    processMessage(message);
  }
}).then(() => {
    document.getElementById('status').innerHTML = "Added a watch.";
    alert("Added a watch.");
}).catch((error) => {
    document.getElementById('status').innerHTML = "Adding watch failed: " + error.name;
    alert("Adding watch failed: " + error.name);
});

function processMessage(message) {
    const el = document.getElementById('output-el');
    for (let record of message.records) {
        switch (record.recordType) {
            case "text":
                el.innerHTML = 'Data is text: ' + record.data;
                break;
            case "url":
                el.innerHTML = 'Data is URL: ' + record.data;
                break;
            case "json":
                el.innerHTML = 'JSON data: ' + record.data.myProperty.toString();
                break;
        }
    }
}
