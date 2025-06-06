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
  const safeCall = <T>(method: keyof mGBAEmulator, ...args: any[]): T | undefined => {
    if (typeof module[method] === 'function') {
      try {
        return (module[method] as Function)(...args) as T;
      } catch (err) {
        console.error(`Error calling ${String(method)}:`, err);
        return undefined;
      }
    }
    console.warn(`Method ${String(method)} not found on mGBA module`);
    return undefined;
  };

  return {
    // 加载 ROM
    loadRom: (file: File, callback?: () => void) => {
      safeCall('uploadRom', file, callback);
    },

    // 开始游戏
    start: () => {
      safeCall('resumeMainLoop');
      safeCall('resumeGame');
      safeCall('resumeAudio');
    },

    // 暂停游戏
    pause: () => {
      safeCall('pauseMainLoop');
      safeCall('pauseGame');
      safeCall('pauseAudio');
    },

    // 重置游戏
    reset: () => {
      safeCall('quickReload');
    },

    // 退出游戏
    quit: () => {
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
      safeCall('screenshot');
    },

    // 设置音量
    setVolume: (volume: number) => {
      safeCall('setVolume', volume);
    },

    // 获取音量
    getVolume: () => {
      return safeCall<number>('getVolume') || 0;
    },

    // 设置快进倍率
    setFastForward: (multiplier: number) => {
      safeCall('setFastForwardMultiplier', multiplier);
    },

    // 获取快进倍率
    getFastForward: () => {
      return safeCall<number>('getFastForwardMultiplier') || 1;
    },

    // 原始模块
    module
  };
};

export type MgbaWrapper = ReturnType<typeof createMgbaWrapper>; 