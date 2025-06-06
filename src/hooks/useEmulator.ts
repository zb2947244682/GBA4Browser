import mGBA from '@thenick775/mgba-wasm';
import { useEffect, useState } from 'react';
import { createMgbaWrapper, type MgbaWrapper } from '../utils/mgbaWrapper';

// 确保 WebAssembly 模块加载的路径是正确的
// 由于我们已经将 wasm 文件复制到了 public 目录，Vite 会自动处理这个路径
const wasmBinaryFile = '/mgba.wasm';

// 安全地检查方法是否存在
const safeCall = (obj: any, method: string, ...args: any[]) => {
  if (obj && typeof obj[method] === 'function') {
    return obj[method](...args);
  }
  console.warn(`Method ${method} not found on object`);
  return undefined;
};

// 扩展 mGBA 配置接口
interface MGBAConfig {
  canvas: HTMLCanvasElement;
  locateFile?: (path: string, prefix?: string) => string;
  onRuntimeInitialized?: () => void;
  print?: (text: string) => void;
  printErr?: (text: string) => void;
  audioSampleRate: number;
  audioBufferSize: number;
  frameskip: number;
  // 直接传递 GL 上下文到模块
  GL?: WebGLRenderingContext;
}

export const useEmulator = (canvas: HTMLCanvasElement | null) => {
  const [emulator, setEmulator] = useState<MgbaWrapper | null>(null);
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
          
          // 预先创建 WebGL 上下文
          let gl: WebGLRenderingContext | null = null;
          try {
            gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
            if (gl) {
              console.log('WebGL context created successfully');
            } else {
              console.warn('Failed to create WebGL context, falling back to 2D');
            }
          } catch (err) {
            console.error('Error creating WebGL context:', err);
          }
          
          // 使用自定义配置初始化 mGBA
          const config = {
            canvas,
            locateFile: (path: string, prefix?: string) => {
              if (path.endsWith('.wasm')) {
                console.log('Loading WebAssembly from:', wasmBinaryFile);
                return wasmBinaryFile;
              }
              return prefix ? prefix + path : path;
            },
            // 添加更多调试信息
            onRuntimeInitialized: () => {
              console.log('Runtime initialized');
            },
            print: (text: string) => {
              console.log('mGBA stdout:', text);
            },
            printErr: (text: string) => {
              console.error('mGBA stderr:', text);
            },
            // 添加音频配置
            audioSampleRate: 44100,
            audioBufferSize: 1024,
            // 添加视频配置
            frameskip: 0,
            // 将预先创建的 WebGL 上下文传递给模块
            GL: gl || undefined
          };
          
          const Module = await mGBA(config);
          
          // 确保创建正确的上下文
          if (typeof (Module as any).createContext === 'function') {
            try {
              console.log('Creating context with Module.createContext');
              (Module as any).createContext(canvas, true, true);
            } catch (err) {
              console.error('Error creating context:', err);
            }
          }

          // 安全地访问 Module.version
          let mGBAVersion = 'Unknown';
          if (Module.version && typeof Module.version === 'object') {
            const versionObj = Module.version as any;
            if (versionObj.projectName && versionObj.projectVersion) {
              mGBAVersion = `${versionObj.projectName} ${versionObj.projectVersion}`;
            }
          }
          console.log('Emulator version:', mGBAVersion);

          console.log('Initializing file system...');
          if (typeof Module.FSInit === 'function') {
            await Module.FSInit();
            console.log('File system initialized successfully');
          } else {
            console.log('FSInit method not available, skipping file system initialization');
          }
          
          // 检查模块上可用的方法
          console.log('Available methods on Module:', Object.keys(Module).filter(
            key => typeof (Module as any)[key] === 'function'
          ));
          
          // 创建包装器
          const wrapper = createMgbaWrapper(Module);
          
          // 设置音量
          wrapper.setVolume(100);
          
          setEmulator(wrapper);
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
        console.log('Stopping emulation on cleanup');
        emulator.pause();
        emulator.quit();
      }
    };
  }, [canvas]);

  return { emulator, isLoading, error };
}; 