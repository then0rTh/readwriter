if ('serviceWorker' in navigator) {
    alert('installing serviceWorker...');
    navigator.serviceWorker.register('worker.js')
        .then(function (reg) {
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function (error) {
        console.log('Registration failed with ' + error);
    });
} else {
    alert('no serviceWorker');
}
