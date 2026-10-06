// Verlof-Tracker service worker
const CACHE='verlof-tracker-v3';
const SHELL=['./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{
  // never fail the install because one file hiccups
  e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(SHELL.map(u=>c.add(u)))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.origin===location.origin){
    // network first so updates arrive; cache when offline
    e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});return r})
      .catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
    return;
  }
  if(url.host.endsWith('googleapis.com')||url.host.endsWith('gstatic.com')){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});return res})));
  }
});
