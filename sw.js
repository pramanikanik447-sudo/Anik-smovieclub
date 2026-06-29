self.addEventListener('push', function(event) {
  let data = { title: 'New Movie Added! 🎬', body: 'Check out the latest movie on CinemaClub!' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'New Movie Added! 🎬', body: event.data.text() };
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/favicon.ico',
    badge: data.icon || '/favicon.ico',
    data: {
      url: data.url || self.location.origin
    },
    actions: [
      { action: 'open_url', title: 'Open App' }
    ],
    vibrate: [100, 50, 100]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || self.location.origin;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
