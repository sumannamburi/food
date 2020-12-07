var APP_PREFIX = 'food_'     
var VERSION = 'version_01'              
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                           
  '/food/',                    
  '/food/index.html',
  '/food/data/food.json',
  '/food/sw.js',
  '/food/js/jquery.dataTables.min.js',
  '/food/js/dataTables.responsive.min.js',
  '/food/css/responsive.dataTables.min.css',
  '/food/css/jquery.dataTables.min.css',
  '/food/css/rowReorder.dataTables.min.css',
  '/food/css/dataTables.jqueryui.min.css',
  '/food/js/jquery-3.5.1.min.js',
  '/food/favicon.png',
  '/food/images/icons/Header.png',
  '/food/images/sort_both.png',
  '/food/images/sort_asc.png',
  '/food/manifest.json',
  '/food/images/icons/android-launchericon-192-192.png',
  '/food/images/icons/apple-touch-icon-ipad-76x76-precomposed.png',
  '/food/images/icons/apple-touch-icon-ipad-retina-152x152-precomposed.png',
  '/food/images/icons/apple-touch-icon-iphone-60x60-precomposed.png',
  '/food/images/icons/apple-touch-icon-iphone-retina-120x120-precomposed.png'
  


     // add path to those files here
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})