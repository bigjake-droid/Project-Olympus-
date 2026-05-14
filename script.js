// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Vindex ServiceWorker registration successful.');
      })
      .catch(err => {
        console.log('Vindex ServiceWorker registration failed: ', err);
      });
  });
}