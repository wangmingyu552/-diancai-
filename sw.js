const CACHE_NAME='pp-menu-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(clients.claim())});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.open(CACHE_NAME).then(c=>{
    return fetch(e.request).then(r=>{
      if(r.ok&&r.type==='basic')c.put(e.request,r.clone());
      return r;
    }).catch(()=>c.match(e.request));
  }));
});
