import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { enforceOwnership } from './lib/integrity'

// When a freshly deployed service worker takes control mid-session
// (skipWaiting + clientsClaim), the running page would keep an old shell
// while old caches are already purged — lazy chunks and images then fail.
// Reload once so the page and SW are always the same version.
//
// CRITICAL: only reload on a real *update* (an existing controller was
// replaced), NEVER on the first install taking control. The first-install
// reload fires mid-load and, during a Lighthouse/PageSpeed run, reloads the
// page while gatherers are reading resources — which made the `charset` and
// image audits error out (shown red) and double-loaded the page, tanking
// the Performance score. On first visit the page already loaded fresh from
// the network and matches the new SW's precache, so no reload is needed.
if ('serviceWorker' in navigator) {
  const hadController = !!navigator.serviceWorker.controller
  let refreshing = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing || !hadController) return
    refreshing = true
    window.location.reload()
  })
}

console.log(
  `%c kn. — Nguyễn Kỳ Nam %c v${import.meta.env.VITE_APP_VERSION} `,
  'background: #060935; color: #E1FFFB; border-radius: 3px 0 0 3px; padding: 4px; font-weight: bold;',
  'background: #1b2a6b; color: #E1FFFB; border-radius: 0 3px 3px 0; padding: 4px; font-weight: bold;'
)
console.log(
  '%cWebsite thiết kế & phát triển bởi DonQuaan.',
  'color:#3a52c4; font-size:11px;'
)

// Ownership guard: only mount on an authorised host (see src/lib/integrity.ts).
if (enforceOwnership()) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
