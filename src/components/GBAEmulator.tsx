import React, { useRef, useState, useEffect } from 'react';
import { useEmulator } from '../hooks/useEmulator';
import type { mGBAEmulator } from '@thenick775/mgba-wasm';
import LoadingSpinner from './LoadingSpinner';

const GBAEmulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [romLoaded, setRomLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const { emulator, isLoading, error } = useEmulator(canvas);

  // 当 canvasRef.current 可用时，设置 canvas 状态
  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current);
    }
  }, []);

  // 保存最后加载的 ROM 文件的引用
  const lastLoadedFile = useRef<File | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !emulator) return;
    
    // 保存文件引用以便稍后重置
    lastLoadedFile.current = file;

    try {
      console.log('Loading ROM file:', file.name);
      
      // 使用 uploadRom 方法加载 ROM
      emulator.uploadRom(file, () => {
        console.log('ROM uploaded successfully');
        
        // 启动游戏
        emulator.resumeGame();
        emulator.resumeAudio();
        
        setRomLoaded(true);
        setIsPaused(false);
      });
    } catch (error) {
      console.error('Error loading ROM:', error);
      alert('Failed to load ROM file: ' + String(error));
    }
  };

  const togglePause = () => {
    if (!emulator || !romLoaded) return;
    
    if (isPaused) {
      console.log('Resuming game...');
      emulator.resumeGame();
      emulator.resumeAudio();
    } else {
      console.log('Pausing game...');
      emulator.pauseGame();
      emulator.pauseAudio();
    }
    
    setIsPaused(!isPaused);
  };

  const reset = () => {
    if (!emulator || !romLoaded) return;
    
    console.log('Resetting game...');
    
    // mGBA 没有直接提供 reset 方法，所以我们需要先停止游戏，然后重新加载
    emulator.quitGame();
    
    // 重新加载最后一个 ROM 文件
    if (lastLoadedFile.current) {
      emulator.uploadRom(lastLoadedFile.current, () => {
        console.log('ROM reloaded successfully');
        emulator.resumeGame();
        emulator.resumeAudio();
        setIsPaused(false);
      });
    }
  };

  // Set up keyboard controls
  useEffect(() => {
    if (!emulator || !romLoaded) return;

    const keyMap: Record<string, number> = {
      'ArrowUp': emulator.KEY_UP,
      'ArrowDown': emulator.KEY_DOWN,
      'ArrowLeft': emulator.KEY_LEFT,
      'ArrowRight': emulator.KEY_RIGHT,
      'z': emulator.KEY_A,
      'x': emulator.KEY_B,
      'a': emulator.KEY_L,
      's': emulator.KEY_R,
      'Enter': emulator.KEY_START,
      'Backspace': emulator.KEY_SELECT
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = keyMap[e.key];
      if (key !== undefined) {
        emulator.keyDown(key);
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = keyMap[e.key];
      if (key !== undefined) {
        emulator.keyUp(key);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [emulator, romLoaded]);

  return (
    <div className="emulator-container">
      <h1>GBA4Browser</h1>
      <p>A web-based Game Boy Advance emulator</p>
      
      {error && <p className="error">{error}</p>}
      {isLoading ? <LoadingSpinner /> : null}
      
      <canvas 
        ref={canvasRef} 
        className="gba-canvas" 
        width={240} 
        height={160}
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
    </div>
  );
};

export default GBAEmulator; 