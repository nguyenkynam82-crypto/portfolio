import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

import packageJson from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: true },
      avif: { lossless: true }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'kn. — Nguyễn Kỳ Nam',
        short_name: 'kn.',
        description: 'Người trẻ kinh doanh thực chiến tại Cần Thơ — tư duy, giao tiếp tự tin và tự chủ tài chính từ sớm.',
        lang: 'vi',
        start_url: '/Kn/',
        scope: '/Kn/',
        display: 'standalone',
        background_color: '#E1FFFB',
        theme_color: '#060935',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        // Precache only the lightweight app shell. Music (~50MB), certificates
        // and PDFs were previously precached, forcing a 53MB background
        // download on every first visit — they are runtime-cached instead.
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2}'],
        globIgnores: ['logo.svg'],
        // Never serve index.html for direct requests to real files (pdf, images, audio)
        navigateFallbackDenylist: [/\.(?:pdf|png|jpe?g|webp|avif|gif|svg|mp3|mp4|txt|xml|webmanifest)$/i],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Music: cache each track the first time the user actually plays it
            urlPattern: /\/msc\/.*\.mp3$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'music-cache',
              rangeRequests: true,
              expiration: {
                maxEntries: 12,
                maxAgeSeconds: 60 * 60 * 24 * 90
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Self-hosted videos (marquee clips, project demos)
            urlPattern: /\.(?:mp4|webm)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'video-cache',
              rangeRequests: true,
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 90
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Images & documents (certificates, course covers, og image, pdf)
            urlPattern: /\.(?:png|jpe?g|webp|avif|gif|pdf)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'asset-cache',
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  base: '/Kn/',
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageJson.version)
  },
  build: {
    rollupOptions: {
      output: {
        // Copyright banner baked into every emitted chunk (legal `/*!` comment
        // is preserved through minification). Ownership notice in the dist JS.
        banner: '/*! © DonQuaan (Nguyễn Vũ Đông Quân) — Proprietary. All Rights Reserved. Unauthorised copying or re-hosting prohibited. */',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer-motion';
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            if (id.includes('lucide-react')) return 'vendor-icons';
            return 'vendor';
          }
        }
      }
    }
  }
})
