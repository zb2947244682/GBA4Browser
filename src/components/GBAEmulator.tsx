import React, { useRef, useState, useEffect } from 'react';
import { useEmulator } from '../hooks/useEmulator';
import LoadingSpinner from './LoadingSpinner';
import { KEY_BINDINGS } from '../utils/mgbaWrapper';

// GBA 原始分辨率
const GBA_WIDTH = 240;
const GBA_HEIGHT = 160;

const GBAEmulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [romLoaded, setRomLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [romLoadError, setRomLoadError] = useState<string | null>(null);
  const { emulator, isLoading, error } = useEmulator(canvas);

  // 保存最后加载的 ROM 文件的引用
  const lastLoadedFile = useRef<File | null>(null);

  // 当 canvasRef.current 可用时，设置 canvas 状态
  useEffect(() => {
    if (canvasRef.current) {
      // 确保 canvas 元素使用原始尺寸
      canvasRef.current.width = GBA_WIDTH;
      canvasRef.current.height = GBA_HEIGHT;
      
      // 设置 canvas 状态
      setCanvas(canvasRef.current);
    }
  }, []);

  // 检查 canvas 是否正确设置
  useEffect(() => {
    if (canvas) {
      console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
      console.log('Canvas parent element:', canvas.parentElement);
      
      // 确保 canvas 可见
      canvas.style.border = '2px solid red';
      
      // 不要在 canvas 上绘制测试内容，让 mGBA 来控制它
      console.log('Canvas ready for mGBA rendering');
    }
  }, [canvas]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !emulator) return;
    
    // 重置错误状态
    setRomLoadError(null);
    
    // 保存文件引用以便稍后重置
    lastLoadedFile.current = file;

    try {
      console.log('Loading ROM file:', file.name);
      console.log('ROM file size:', file.size, 'bytes');
      
      // 检查文件大小是否合理
      if (file.size < 1024) {
        throw new Error('ROM 文件太小，可能不是有效的 GBA ROM');
      }
      
      if (file.size > 32 * 1024 * 1024) {
        throw new Error('ROM 文件太大，超过 32MB');
      }
      
      // 清除 canvas 上的测试内容
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      
      // 使用包装器加载 ROM
      emulator.loadRom(file, () => {
        console.log('ROM uploaded successfully');
        
        // 启动游戏
        try {
          console.log('Starting game...');
          
          // 确保 canvas 尺寸正确设置
          emulator.setCanvasSize(GBA_WIDTH, GBA_HEIGHT);
          
          emulator.start();
          setRomLoaded(true);
          setIsPaused(false);
          
          // 检查游戏是否真的在运行
          setTimeout(() => {
            console.log('Game should be running now');
            
            // 强制刷新一次画面
            forceRefresh();
          }, 1000);
        } catch (err) {
          console.error('Error starting game:', err);
          setRomLoadError('启动游戏失败: ' + String(err));
        }
      });
    } catch (error) {
      console.error('Error loading ROM:', error);
      setRomLoadError('加载 ROM 失败: ' + String(error));
    }
  };

  const togglePause = () => {
    if (!emulator || !romLoaded) return;
    
    try {
      if (isPaused) {
        console.log('Resuming game...');
        emulator.start();
      } else {
        console.log('Pausing game...');
        emulator.pause();
      }
      
      setIsPaused(!isPaused);
    } catch (err) {
      console.error('Error toggling pause state:', err);
    }
  };

  const reset = () => {
    if (!emulator || !romLoaded) return;
    
    try {
      console.log('Resetting game...');
      
      // 使用 reset 方法重置游戏
      emulator.reset();
      
      // 如果游戏处于暂停状态，恢复它
      if (isPaused) {
        emulator.start();
        setIsPaused(false);
      }
      
      // 强制刷新画面
      setTimeout(forceRefresh, 500);
    } catch (err) {
      console.error('Error resetting game:', err);
      
      // 如果 reset 不起作用，尝试重新加载 ROM
      if (lastLoadedFile.current) {
        emulator.quit();
        emulator.loadRom(lastLoadedFile.current, () => {
          console.log('ROM reloaded successfully');
          emulator.start();
          setIsPaused(false);
          
          // 强制刷新画面
          setTimeout(forceRefresh, 500);
        });
      }
    }
  };

  // 添加一个强制刷新画面的函数
  const forceRefresh = () => {
    if (!canvas || !emulator) return;
    
    try {
      console.log('Forcing screen refresh...');
      
      // 尝试截图来强制刷新画面
      emulator.screenshot();
      
      // 暂停并恢复以刷新画面
      emulator.pause();
      setTimeout(() => {
        emulator.start();
        console.log('Screen refresh completed');
      }, 100);
    } catch (err) {
      console.error('Error refreshing screen:', err);
    }
  };

  // Set up keyboard controls
  useEffect(() => {
    if (!emulator || !romLoaded) return;

    try {
      console.log('Setting up keyboard controls with keys:', Object.keys(KEY_BINDINGS));

      const handleKeyDown = (e: KeyboardEvent) => {
        const key = KEY_BINDINGS[e.key as keyof typeof KEY_BINDINGS];
        if (key !== undefined) {
          console.log(`Key down: ${e.key} -> ${key}`);
          emulator.buttonPress(key);
          e.preventDefault();
        }
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        const key = KEY_BINDINGS[e.key as keyof typeof KEY_BINDINGS];
        if (key !== undefined) {
          console.log(`Key up: ${e.key} -> ${key}`);
          emulator.buttonUnpress(key);
          e.preventDefault();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    } catch (err) {
      console.error('Error setting up keyboard controls:', err);
    }
  }, [emulator, romLoaded]);

  return (
    <div className="emulator-container">
      <h1>GBA4Browser</h1>
      <p>A web-based Game Boy Advance emulator</p>
      
      {error && <p className="error">{error}</p>}
      {romLoadError && <p className="error">{romLoadError}</p>}
      {isLoading ? <LoadingSpinner /> : null}
      
      <canvas 
        ref={canvasRef} 
        className="gba-canvas" 
        style={{ 
          width: '480px',  // 2x 缩放显示
          height: '320px', // 2x 缩放显示
          imageRendering: 'pixelated' 
        }}
      />
      
      <div className="controls">
        <div className="file-input">
          <input
            type="file"
            accept=".gba"
            onChange={handleFileUpload}
            disabled={isLoading || !emulator}
          />
        </div>
        
        <div className="buttons">
          <button 
            onClick={togglePause} 
            disabled={isLoading || !emulator || !romLoaded}
          >
            {isPaused ? '继续' : '暂停'}
          </button>
          <button 
            onClick={reset} 
            disabled={isLoading || !emulator || !romLoaded}
          >
            重置
          </button>
          <button 
            onClick={forceRefresh} 
            disabled={isLoading || !emulator || !romLoaded}
          >
            刷新画面
          </button>
        </div>
      </div>
      
      <div className="instructions">
        <h3>控制方式:</h3>
        <p>方向键: 上下左右</p>
        <p>A 键: Z</p>
        <p>B 键: X</p>
        <p>L 键: A</p>
        <p>R 键: S</p>
        <p>开始: Enter</p>
        <p>选择: Backspace</p>
      </div>
      
      {romLoaded && (
        <div className="debug-info">
          <h4>调试信息:</h4>
          <p>ROM 已加载: {romLoaded ? '是' : '否'}</p>
          <p>暂停状态: {isPaused ? '是' : '否'}</p>
          <p>当前文件: {lastLoadedFile.current?.name || '无'}</p>
          <p>音量: {emulator?.getVolume() || 0}</p>
          <p>快进倍率: {emulator?.getFastForward() || 1}</p>
        </div>
      )}
    </div>
  );
};

export default GBAEmulator; 