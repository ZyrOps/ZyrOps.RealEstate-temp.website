(() => {
  if (!('serviceWorker' in navigator) || window.location.protocol === 'file:') {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
})();
