/* Hiến máu Bạch Mai – PWA 29.5: không lưu cache dữ liệu nghiệp vụ. */
const CACHE_NAME='hienmau-static-29.5';
const STATIC_ASSETS=['./manifest.json','./icon-192-v5.3.png','./icon-512-v5.3.png','./apple-touch-icon-v5.3.png','./favicon-v5.3.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(STATIC_ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('gm-static-')||k.startsWith('hienmau-static-')).filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return;
  if(req.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/')){
    event.respondWith(fetch(req,{cache:'no-store'}));return;
  }
  if(!STATIC_ASSETS.some(path=>url.pathname.endsWith(path.slice(2))))return;
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));
});

// Nhận thông báo nền từ dịch vụ Web Push / FCM khi trình duyệt chuyển đến service worker.
self.addEventListener('push', event => {
  if(!event.data)return;
  let payload;
  try{payload=event.data.json();}catch(e){payload={data:{body:event.data.text()}};}
  const detail=payload.data||{},notification=payload.notification||{};
  const title=detail.title||notification.title||'Hiến máu Bạch Mai';
  const body=detail.body||notification.body||'Có cập nhật mới.';
  event.waitUntil(self.registration.showNotification(title,{
    body:body,tag:detail.registrationId||'hienmau',icon:'./icon-192-v5.3.png',badge:'./icon-192-v5.3.png',
    data:{url:detail.url||'./?mode=staff'}
  }));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  let url=new URL('./?mode=staff',self.registration.scope);
  try{const requested=new URL(event.notification.data?.url||url.href,self.registration.scope);if(requested.origin===self.location.origin)url=requested;}catch(e){}
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients=>{
    for(const client of clients){if(client.url.startsWith(self.location.origin)){client.navigate(url.href);return client.focus();}}
    return self.clients.openWindow(url.href);
  }));
});
