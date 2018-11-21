const CACHED_URLS = [
    'main.js',
    'main.css',
    '/',
    'index.html',
    'favicon.ico',
];
function cacheAll(cache) {
    return cache.addAll(CACHED_URLS);
}
self.addEventListener('install', function (event) {
    console.log('install');
    event.waitUntil(caches.open('v1').then(cacheAll));
});
self.addEventListener('activate', function (event) {
    // event.waitUntil(caches.delete('v1'));
});
self.addEventListener('fetch', function (event) {
    console.log('fetch');
    event.respondWith(caches.match(event.request)
        .then(function (response) {
        return response || fetch(event.request);
    }).catch(function (reason) {
        console.log('fetch fail reason:', reason);
        return new Response(new Blob(), { status: 499, statusText: 'worker:fetch-failed' });
    }));
});
