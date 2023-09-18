if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/uv.sw-handler.js', { scope: __uv$config.prefix })
}