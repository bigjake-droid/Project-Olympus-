// script.js - Vindex Core Logic

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Vindex ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.log('Vindex ServiceWorker registration failed: ', err);
      });
  });
}

// Future logic for app functionality goes here
console.log("Vindex Frontline Systems Online.");