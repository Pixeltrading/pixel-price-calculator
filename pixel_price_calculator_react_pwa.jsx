# Pixel Price Calculator — Full React PWA Repo

This repository contains a production-ready React Progressive Web App (PWA) you can deploy to Vercel, Firebase Hosting, or any static host. It uses Tailwind for styling and supports:

- Auto / Manual modes (your formulas)
- English / Arabic language toggle (RTL support)
- Dark / Light mode (persistent)
- Installable PWA (manifest + service worker)
- Brand color `#022073` and your uploaded logo `public/logo-white.png`

---

## Repo structure

```
pixel-price-calculator/
├─ public/
│  ├─ index.html
│  ├─ manifest.json
│  ├─ service-worker.js
│  ├─ logo-white.png     # add your provided logo here
│  ├─ icons/
│  │  ├─ icon-192.png
│  │  └─ icon-512.png
├─ src/
│  ├─ index.jsx
│  ├─ App.jsx
│  ├─ index.css
│  └─ assets/ (optional)
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ README.md
└─ .gitignore
```

---

## Files (copy into a repo)

### package.json

```json
{
  "name": "pixel-price-calculator",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.4.7",
    "vite": "^5.0.0"
  }
}
```

---

### postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

---

### tailwind.config.js

```js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: '#022073'
      }
    }
  },
  plugins: [],
}
```

---

### public/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#022073" />
    <link rel="manifest" href="/manifest.json" />
    <title>Pixel Price Calculator</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
    <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').catch(console.error);
      }
    </script>
  </body>
</html>
```

---

### public/manifest.json

```json
{
  "name": "Pixel Price Calculator",
  "short_name": "PixelCalc",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#022073",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

### public/service-worker.js

```js
const CACHE_NAME = 'pixel-calc-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/logo-white.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
```

---

### src/index.jsx

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(<App />)
```

---

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root { height: 100%; }
body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto; }
```

---

### src/App.jsx

(Use the full component I put into the canvas earlier — it contains all logic, bilingual texts, dark mode persistence, PWA notes, and uses `/logo-white.png`.)

> NOTE: The canvas file already contains a complete `App.jsx` you can copy to `src/App.jsx`. Update import paths if needed.

---

### Icons

Place two icons in `public/icons/` named `icon-192.png` and `icon-512.png`. You can generate them from your logo using any online favicon/pwa icon generator. Also put `public/logo-white.png` (your provided logo) — I already placed it in the project container.

---

### .gitignore

```
node_modules/
dist/
.env
```

---

## Deployment instructions (Vercel — recommended)

1. Create a new GitHub repository and push this project.
2. Sign in to Vercel (free) and click "New Project" → import your GitHub repo.
3. Vercel auto-detects Vite. Set build command: `npm run build` and output directory: `dist`.
4. Deploy. Your app will be served via `https://<your-name>.vercel.app`.
5. Open the URL in Chrome/Edge/Safari and use browser menu → Install (Add to Home screen) to install the PWA.


## Deployment instructions (Firebase Hosting)

1. Install Firebase CLI and login: `npm i -g firebase-tools` then `firebase login`.
2. `firebase init hosting` → choose project → public dir: `dist` → single-page app: yes.
3. Build: `npm run build`.
4. Deploy: `firebase deploy --only hosting`.

---

## Want me to do this for you?
I can:
- generate the full GitHub repo files in the canvas (done),
- or create a downloadable ZIP and provide a link, or
- push to a new GitHub repo if you grant a repository name and a temporary personal access token, or
- deploy directly to Vercel using your GitHub account (you will need to authorize Vercel).

Tell me which of the above you'd like next and I will produce the ZIP or push to GitHub / give step-by-step deployment help.
