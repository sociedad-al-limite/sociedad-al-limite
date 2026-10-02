// Service worker de notificaciones de última hora de Sociedad al Límite.
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(self.registration.showNotification(data.title || "🔴 ÚLTIMA HORA", {
    body: data.body || "Sociedad al Límite acaba de publicar una nueva noticia.",
    icon: "/icon-192.png", badge: "/icon-192.png", data: { url: data.url || "/" }
  }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
