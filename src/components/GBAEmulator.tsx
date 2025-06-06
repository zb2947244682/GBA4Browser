import React, { useEffect, useRef, useState } from 'react';
import mGBA from '@thenick775/mgba-wasm';
// @ts-ignore
import { createMgbaConfig, createCoreSettings, setupCanvas } from '../../public/mgba-config.js';

// Key mappings
const KEY_BINDINGS: Record<string, number> = {
  'z': 0,          // A
  'x': 1,          // B
  'Backspace': 2,  // SELECT
  'Enter': 3,      // START
  'ArrowRight': 4, // RIGHT
  'ArrowLeft': 5,  // LEFT
  'ArrowUp': 6,    // UP
  'ArrowDown': 7,  // DOWN
  's': 8,          // R
  'a': 9           // L
};

// mGBA module configuration interface
interface MGBAConfig {
  canvas: HTMLCanvasElement;
  locateFile?: (path: string, prefix?: string) => string;
  print?: (text: string) => void;
  printErr?: (text: string) => void;
  audioSampleRate?: number;
  audioBufferSize?: number;
  frameskip?: number;
  [key: string]: any;
}

const GBAEmulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Store a reference to the mGBA module
  const mgbaRef = useRef<any>(null);
  
  // Initialize the emulator
  useEffect(() => {
    if (!canvasRef.current || isInitialized) return;
    
    const initEmulator = async () => {
      try {
        console.log('Initializing mGBA...');
        setIsLoading(true);
        setErrorMessage(null);
        
        const canvas = canvasRef.current!;
        
        // Setup canvas first
        setupCanvas(canvas);
        
        // Create configuration with our helper
        const config = createMgbaConfig(canvas);
        
        // Try loading the module
        try {
          // Use dynamic import for mgba.js
          const mGBAModule = await import('../../public/mgba.js');
          const module = await mGBAModule.default(config);
          mgbaRef.current = module;
        } catch (error) {
          console.error('Failed to load mGBA module dynamically:', error);
          
          // Fallback to regular import
          const module = await mGBA(config);
          mgbaRef.current = module;
        }
        
        // Initialize file system
        if (typeof mgbaRef.current.FSInit === 'function') {
          await mgbaRef.current.FSInit();
          console.log('File system initialized');
        }
        
        // Apply core settings
        if (typeof mgbaRef.current.setCoreSettings === 'function') {
          const coreSettings = createCoreSettings();
          mgbaRef.current.setCoreSettings(coreSettings);
          console.log('Core settings applied');
        }

        // Try explicitly creating context
        if (typeof mgbaRef.current.createContext === 'function') {
          try {
            mgbaRef.current.createContext(canvas, true);
            console.log('Context created explicitly');
          } catch (e) {
            console.warn('Could not create context explicitly:', e);
          }
        }
        
        // Set up key bindings
        setupKeyBindings();
        
        setIsInitialized(true);
        console.log('mGBA initialized successfully');
      } catch (error) {
        console.error('Failed to initialize mGBA:', error);
        setErrorMessage(`初始化失败: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    initEmulator();
  }, [canvasRef.current, isInitialized]);
  
  // Setup keyboard controls
  const setupKeyBindings = () => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = KEY_BINDINGS[e.key];
      if (key !== undefined && mgbaRef.current && isGameLoaded) {
        mgbaRef.current.buttonPress(key);
        e.preventDefault();
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = KEY_BINDINGS[e.key];
      if (key !== undefined && mgbaRef.current && isGameLoaded) {
        mgbaRef.current.buttonUnpress(key);
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  };
  
  // Load ROM handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !mgbaRef.current) return;
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      console.log(`Loading ROM: ${file.name} (${file.size} bytes)`);
      
      // Check file size
      if (file.size < 1024) {
        throw new Error('ROM file is too small');
      }
      
      if (file.size > 32 * 1024 * 1024) {
        throw new Error('ROM file is too large (max 32MB)');
      }
      
      // If a game is already running, stop it
      if (isGameLoaded) {
        pauseGame();
        mgbaRef.current.quitGame();
      }
      
      // Load the ROM
      mgbaRef.current.uploadRom(file, () => {
        console.log('ROM loaded successfully');
        
        // Start the game after a short delay
        setTimeout(() => {
          startGame();
          setIsGameLoaded(true);
          setIsPaused(false);
          
          // Force refresh after a delay to make sure display initializes
          setTimeout(() => {
            refreshScreen();
          }, 500);
        }, 100);
      });
    } catch (error) {
      console.error('Failed to load ROM:', error);
      setErrorMessage(`ROM加载失败: ${error}`);
      setIsLoading(false);
    }
  };
  
  // Start game
  const startGame = () => {
    if (!mgbaRef.current) return;
    
    try {
      console.log('Starting game');
      mgbaRef.current.resumeMainLoop();
      mgbaRef.current.resumeGame();
      mgbaRef.current.resumeAudio();
      setIsPaused(false);
    } catch (error) {
      console.error('Failed to start game:', error);
      setErrorMessage(`启动游戏失败: ${error}`);
    }
  };
  
  // Pause game
  const pauseGame = () => {
    if (!mgbaRef.current) return;
    
    try {
      console.log('Pausing game');
      mgbaRef.current.pauseMainLoop();
      mgbaRef.current.pauseGame();
      mgbaRef.current.pauseAudio();
      setIsPaused(true);
    } catch (error) {
      console.error('Failed to pause game:', error);
    }
  };
  
  // Toggle pause
  const togglePause = () => {
    if (isPaused) {
      startGame();
    } else {
      pauseGame();
    }
  };
  
  // Reset game
  const resetGame = () => {
    if (!mgbaRef.current || !isGameLoaded) return;
    
    try {
      console.log('Resetting game');
      mgbaRef.current.quickReload();
      
      // Make sure game is running after reset
      if (isPaused) {
        startGame();
      }
      
      // Force refresh
      setTimeout(refreshScreen, 200);
    } catch (error) {
      console.error('Failed to reset game:', error);
    }
  };
  
  // Refresh screen
  const refreshScreen = () => {
    if (!mgbaRef.current || !isGameLoaded) return;
    
    try {
      console.log('Refreshing screen');
      
      // Try to take a screenshot to force refresh
      try {
        mgbaRef.current.screenshot();
      } catch (e) {
        console.warn('Screenshot failed:', e);
      }
      
      // Pause and resume to force redraw
      pauseGame();
      
      setTimeout(() => {
        // Make sure canvas size is set correctly
        if (canvasRef.current) {
          canvasRef.current.width = 240;
          canvasRef.current.height = 160;
          
          // Update canvas size in module
          if (typeof mgbaRef.current.setCanvasSize === 'function') {
            mgbaRef.current.setCanvasSize(240, 160);
          }
        }
        
        startGame();
        console.log('Screen refresh completed');
      }, 100);
    } catch (error) {
      console.error('Failed to refresh screen:', error);
    }
  };
  
  return (
    <div className="emulator-container">
      <div className="emulator-canvas-container">
        <canvas 
          ref={canvasRef} 
          id="gba-canvas"
          width="240"
          height="160"
          style={{
            display: 'block',
            margin: '0 auto',
          }}
        />
        {/* 这个div将叠加在canvas上，用于显示任何错误信息 */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            fontSize: '14px',
            color: 'white',
            textShadow: '1px 1px 2px black',
          }}
        >
          {!isGameLoaded && !isLoading && 'Please load a ROM'}
          {isLoading && 'Loading...'}
        </div>
      </div>
      
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
      
      <div className="emulator-controls">
        <div className="file-control">
          <input
            type="file"
            accept=".gba"
            onChange={handleFileUpload}
            disabled={isLoading || !isInitialized}
          />
        </div>
        
        <div className="game-controls">
          <button
            onClick={togglePause}
            disabled={!isGameLoaded || isLoading}
          >
            {isPaused ? '继续' : '暂停'}
          </button>
          
          <button
            onClick={resetGame}
            disabled={!isGameLoaded || isLoading}
          >
            重置
          </button>
          
          <button
            onClick={refreshScreen}
            disabled={!isGameLoaded || isLoading}
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
    </div>
  );
};

export default GBAEmulator; 