import mGBA, { type mGBAEmulator } from '@thenick775/mgba-wasm';
import { useEffect, useState } from 'react';

// 确保 WebAssembly 模块加载的路径是正确的
// 由于我们已经将 wasm 文件复制到了 public 目录，Vite 会自动处理这个路径
const wasmBinaryFile = '/mgba.wasm';

export const useEmulator = (canvas: HTMLCanvasElement | null) => {
  const [emulator, setEmulator] = useState<mGBAEmulator | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Canvas element:', canvas);
    
    // 检查是否设置了正确的 CORS 头
    const checkCrossOriginIsolation = () => {
      if (typeof window !== 'undefined') {
        const isCrossOriginIsolated = window.crossOriginIsolated;
        console.log('Is cross-origin isolated:', isCrossOriginIsolated);
        
        if (!isCrossOriginIsolated) {
          console.warn('Cross-origin isolation is not enabled. WebAssembly threading might not work properly.');
          console.warn('Make sure your server sets the following headers:');
          console.warn('Cross-Origin-Opener-Policy: same-origin');
          console.warn('Cross-Origin-Embedder-Policy: require-corp');
        }
        
        return isCrossOriginIsolated;
      }
      return false;
    };
    
    checkCrossOriginIsolation();
    
    const initialize = async () => {
      if (canvas) {
        try {
          setIsLoading(true);
          console.log('Initializing mGBA...');
          
          // 使用自定义配置初始化 mGBA
          const Module = await mGBA({ 
            canvas, 
            locateFile: (path: string, prefix: string) => {
              if (path.endsWith('.wasm')) {
                console.log('Loading WebAssembly from:', wasmBinaryFile);
                return wasmBinaryFile;
              }
              return prefix + path;
            } 
          });

          const mGBAVersion =
            Module.version.projectName + ' ' + Module.version.projectVersion;
          console.log('Emulator version:', mGBAVersion);

          console.log('Initializing file system...');
          await Module.FSInit();
          console.log('File system initialized successfully');
          
          setEmulator(Module);
          console.log('Emulator initialized successfully');
        } catch (err) {
          console.error('Failed to initialize emulator:', err);
          setError('Failed to initialize emulator: ' + String(err));
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log('Canvas is null, waiting for it to be available...');
      }
    };

    initialize();

    // Cleanup function
    return () => {
      if (emulator) {
        // Stop emulation if it's running
        if (emulator.isRunning()) {
          emulator.stop();
        }
      }
    };
  }, [canvas]);

  return { emulator, isLoading, error };
}; 