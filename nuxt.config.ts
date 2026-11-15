import conferenceData from './src/assets/conference-data.json'

export default defineNuxtConfig({
  srcDir: 'src/',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // NEW: the PWA module
  modules: ['@vite-pwa/nuxt'],

  // NEW: the PWA configuration
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'FrontendNow',
      short_name: 'FrontendNow',
      description: 'Zwei Tage Web-Frontend, ohne Buzzword-Bingo',
      lang: 'de',
      display: 'standalone',
      start_url: '/',
      theme_color: '#<your accent-brand value, purple-600>',
      background_color: '#<your surface-default value, off-white>',
      icons: [
        { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,txt,woff2,json,webmanifest}']
    },
    client: {
      installPrompt: true
    }
  },

  css: ['~/../tokens/tokens.css'],
  // SSG: alle dynamischen Routen werden beim Build vorgerendert
  // (siehe docs/schritt2/01-rendering-strategie-adr.md).
  nitro: {
    prerender: {
      routes: [
        '/',
        '/speakers',
        ...conferenceData.speakers.map((speaker) => `/speakers/${speaker.id}`),
        ...conferenceData.sessions.map((session) => `/sessions/${session.id}`)
      ]
    }
  }
})