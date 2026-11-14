export default defineNuxtPlugin(() => {
  if (!('serviceWorker' in navigator)) {
    return
  }

  navigator.serviceWorker.register('/sw.js').catch((error) => {
    console.error('Service worker registration failed:', error)
  })
})
