var cacheName = "Color Game v1";

var filesToCache = [
    "./ColorGuess.html",
    "./ColorGuess.css",
    "./ColorGuess.js",
    "./ColorGameInstructions.html",
    "./ColorGameInstructions.css",
];

self.addEventListener("install", function(e){
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log("[Service Worker] Caching app shell");
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request)
            .then(res => {
                if(res){
                    return res;
                }
                return fetch(event.request);
            })
        );
});