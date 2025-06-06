import type { mGBAEmulator } from '@thenick775/mgba-wasm';

// GBA 按键映射
export const GBA_KEYS = {
  A: 0,
  B: 1,
  SELECT: 2,
  START: 3,
  RIGHT: 4,
  LEFT: 5,
  UP: 6,
  DOWN: 7,
  R: 8,
  L: 9
};

// 键盘映射到 GBA 按键
export const KEY_BINDINGS = {
  'z': GBA_KEYS.A,
  'x': GBA_KEYS.B,
  'Backspace': GBA_KEYS.SELECT,
  'Enter': GBA_KEYS.START,
  'ArrowRight': GBA_KEYS.RIGHT,
  'ArrowLeft': GBA_KEYS.LEFT,
  'ArrowUp': GBA_KEYS.UP,
  'ArrowDown': GBA_KEYS.DOWN,
  's': GBA_KEYS.R,
  'a': GBA_KEYS.L
};

// 包装 mGBA 模块，提供更简单的接口
export const createMgbaWrapper = (module: mGBAEmulator) => {
  // 确保方法存在
  const safeCall = <T>(method: string, ...args: any[]): T | undefined => {
    if (typeof (module as any)[method] === 'function') {
      try {
        return ((module as any)[method] as Function)(...args) as T;
      } catch (err) {
        console.error(`Error calling ${method}:`, err);
        return undefined;
      }
    }
    console.warn(`Method ${method} not found on mGBA module`);
    return undefined;
  };

  // 初始化核心设置
  const initCoreSettings = () => {
    try {
      // 检查是否有 setCoreSettings 方法
      if (typeof (module as any).setCoreSettings === 'function') {
        console.log('Setting core settings...');
        
        // 设置核心设置
        (module as any).setCoreSettings({
          skipBios: true,
          useBios: false,
          sampleRate: 44100,
          audioSync: true,
          videoSync: true,
          volume: 100,
          mute: false,
          frameskip: 0,
          fpsTarget: 60
        });
        
        console.log('Core settings applied');
      }
    } catch (err) {
      console.error('Error setting core settings:', err);
    }
  };

  // 尝试初始化核心设置
  initCoreSettings();

  return {
    // 加载 ROM
    loadRom: (file: File, callback?: () => void) => {
      console.log('Loading ROM:', file.name);
      safeCall('uploadRom', file, callback);
    },

    // 开始游戏
    start: () => {
      console.log('Starting emulation...');
      safeCall('resumeMainLoop');
      safeCall('resumeGame');
      safeCall('resumeAudio');
    },

    // 暂停游戏
    pause: () => {
      console.log('Pausing emulation...');
      safeCall('pauseMainLoop');
      safeCall('pauseGame');
      safeCall('pauseAudio');
    },

    // 重置游戏
    reset: () => {
      console.log('Resetting game...');
      safeCall('quickReload');
    },

    // 退出游戏
    quit: () => {
      console.log('Quitting game...');
      safeCall('quitGame');
    },

    // 按下按钮
    buttonPress: (key: number) => {
      safeCall('buttonPress', key);
    },

    // 释放按钮
    buttonUnpress: (key: number) => {
      safeCall('buttonUnpress', key);
    },

    // 截图
    screenshot: () => {
      console.log('Taking screenshot...');
      return safeCall<boolean>('screenshot') || false;
    },

    // 设置音量
    setVolume: (volume: number) => {
      console.log('Setting volume to:', volume);
      safeCall('setVolume', volume);
    },

    // 获取音量
    getVolume: () => {
      return safeCall<number>('getVolume') || 0;
    },

    // 设置快进倍率
    setFastForward: (multiplier: number) => {
      console.log('Setting fast forward multiplier to:', multiplier);
      safeCall('setFastForwardMultiplier', multiplier);
    },

    // 获取快进倍率
    getFastForward: () => {
      return safeCall<number>('getFastForwardMultiplier') || 1;
    },

    // 设置 canvas 尺寸
    setCanvasSize: (width: number, height: number) => {
      console.log('Setting canvas size to:', width, 'x', height);
      safeCall('setCanvasSize', width, height);
    },

    // 绑定按键
    bindKey: (key: string, gbaKey: number) => {
      console.log('Binding key:', key, 'to GBA key:', gbaKey);
      safeCall('bindKey', key, gbaKey);
    },

    // 原始模块
    module
  };
};

export type MgbaWrapper = ReturnType<typeof createMgbaWrapper>; 