import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          injectRegister: 'auto',
          manifest: {
            name: "MedAssist",
            short_name: "MedAssist",
            start_url: "/",
            display: "standalone",
            background_color: "#FAFAFA",
            theme_color: "#1B4F8A",
            icons: [
              {
                src: "/pwa-192x192.png",
                sizes: "192x192",
                type: "image/png"
              },
              {
                src: "/pwa-512x512.png",
                sizes: "512x512",
                type: "image/png"
              }
            ]
          },
          workbox: {
            cacheId: 'medassist-cache-v1',
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,json}'],
            runtimeCaching: [
              {
                urlPattern: ({ request }) => request.mode === 'navigate',
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'medassist-navigation-cache',
                  expiration: {
                    maxEntries: 50,
                  }
                }
              },
              {
                urlPattern: ({ request }) => ['style', 'script', 'image', 'font'].includes(request.destination),
                handler: 'CacheFirst',
                options: {
                  cacheName: 'medassist-assets-cache',
                  expiration: {
                    maxEntries: 120,
                    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                  }
                }
              }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
