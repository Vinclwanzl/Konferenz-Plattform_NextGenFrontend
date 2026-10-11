# FrontendNow

FrontendNow is a Nuxt 4 and Vue 3 conference program for the FrontendNow event.

## Requirements

Install a current Node.js release supported by Nuxt 4 and npm.

## Run locally

'''bash
cd Rule_Of_Fun
npm install
npm run dev
'''

Nuxt prints the local URL when the development server starts.

## Build

'''bash
npm run build
'''

## Routes

- '/' - Conference sessions and filters
- '/speakers' - Speakers
- '/user-program' - Saved sessions

## Source structure

- 'src/app.vue' - Nuxt application entry
- 'src/pages/' - File-based routes
- 'src/components/base/' - Reusable UI components
- 'src/components/features/' - Conference features
- 'src/components/layout/' - Shared page layout
- 'src/composables/' - Shared reactive state and logic
- 'src/assets/conference-data.json' - Conference dataset
