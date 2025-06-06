import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// 自定义插件：处理 WebAssembly 文件
function wasmSupport() {
  return {
    name: 'wasm-support',
    configureServer(server) {
      // 确保 WebAssembly 文件以正确的 MIME 类型提供
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.endsWith('.wasm')) {
          res.setHeader('Content-Type', 'application/wasm');
        }
        next();
      });
    },
    buildStart() {
      // 确保在开发模式下 WebAssembly 文件被复制到公共目录
      const sourcePath = path.resolve('node_modules/@thenick775/mgba-wasm/dist/mgba.wasm');
      const destPath = path.resolve('public/mgba.wasm');
      
      if (fs.existsSync(sourcePath) && !fs.existsSync(destPath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log('Copied WebAssembly file to public directory');
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasmSupport()
  ],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  optimizeDeps: {
    exclude: ['@thenick775/mgba-wasm'],
  },
  resolve: {
    alias: {
      '@thenick775/mgba-wasm': '@thenick775/mgba-wasm/dist/mgba.js',
    },
  },
  assetsInclude: ['**/*.wasm'],
}); 