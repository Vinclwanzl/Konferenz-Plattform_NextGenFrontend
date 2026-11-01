import conferenceData from './src/assets/conference-data.json'

export default defineNuxtConfig({
    srcDir: 'src/',
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
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