// mGBA 配置助手
export const createMgbaConfig = (canvas, options = {}) => {
  if (!canvas) {
    throw new Error('Canvas element is required');
  }
  
  const defaultConfig = {
    // Canvas 相关设置
    canvas,
    
    // 定位 WebAssembly 二进制文件
    locateFile: (path) => {
      if (path.endsWith('.wasm')) {
        console.log(`Loading WebAssembly from: ${path}`);
        return '/mgba.wasm';
      }
      return path;
    },
    
    // 输出处理
    print: (text) => console.log(`mGBA stdout: ${text}`),
    printErr: (text) => console.error(`mGBA stderr: ${text}`),
    
    // 音频设置
    audioSampleRate: 44100,
    audioBufferSize: 1024,
    
    // 图像设置
    frameskip: 0,
    
    // 优化设置
    wasmMemory: new WebAssembly.Memory({ 
      initial: 16777216 / 65536, 
      maximum: 16777216 / 65536 
    }),
    
    // 启动设置
    preRun: [],
    postRun: [],
    
    // 文件系统设置
    fileSystemInitialize: true,
  };
  
  // 合并用户设置
  return {
    ...defaultConfig,
    ...options,
  };
};

// 核心设置助手
export const createCoreSettings = (customSettings = {}) => {
  const defaultSettings = {
    skipBios: true,
    useBios: false,
    sampleRate: 44100,
    audioSync: true,
    videoSync: true,
    volume: 100,
    mute: false,
    frameskip: 0, 
    fpsTarget: 60
  };
  
  return {
    ...defaultSettings,
    ...customSettings
  };
};

// 重新配置 Canvas 助手
export const setupCanvas = (canvas) => {
  if (!canvas) return;
  
  // 确保 Canvas 大小正确（GBA 原始分辨率）
  canvas.width = 240;
  canvas.height = 160;
  
  // 初始化画布以便用户知道它存在
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.fillStyle = '#FFF';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('等待 ROM 加载...', canvas.width / 2, canvas.height / 2);
  }
  
  // 设置样式
  canvas.style.imageRendering = 'pixelated';
};

export const waitUntil = (condition, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkCondition = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timed out waiting for condition'));
      } else {
        setTimeout(checkCondition, 100);
      }
    };
    
    checkCondition();
  });
}; 