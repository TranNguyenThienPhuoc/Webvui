import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: '.',
    publicDir: 'public',
    // Serve /images/* from project root ./images (Vite only serves public/ by default)
    plugins: [
      {
        name: 'serve-images',
        configureServer(server) {
          server.middlewares.use('/images', (req, res, next) => {
            const url = (req.url?.split('?')[0] || '/').replace(/^\//, '');
            const imagesDir = path.resolve(process.cwd(), 'images');
            const filePath = path.resolve(imagesDir, decodeURIComponent(url));
            if (!filePath.startsWith(imagesDir)) {
              return next();
            }
            fs.stat(filePath, (err, stat) => {
              if (err || !stat?.isFile()) return next();
              const stream = fs.createReadStream(filePath);
              const ext = path.extname(filePath).toLowerCase();
              const types = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp' };
              res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
              stream.pipe(res);
            });
          });
        }
      }
    ],
    define: {
      'process.env.FIREBASE_CONFIG': JSON.stringify({
        apiKey: env.VITE_FIREBASE_API_KEY,
        authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: env.VITE_FIREBASE_APP_ID,
        measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
      })
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          birthday: resolve(__dirname, 'html/main.html')
        }
      }
    },
    server: {
      open: 'html/main.html'
    }
  };
});
