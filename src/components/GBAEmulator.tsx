import React, { useRef, useState, useEffect } from 'react';
import { useEmulator } from '../hooks/useEmulator';
import type { mGBAEmulator } from '@thenick775/mgba-wasm';

const GBAEmulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [romLoaded, setRomLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { emulator, isLoading, error } = useEmulator(canvasRef.current);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !emulator) return;

    try {
      // Read the ROM file
      const arrayBuffer = await file.arrayBuffer();
      const romData = new Uint8Array(arrayBuffer);
      
      // Write the ROM data to the emulator's file system
      emulator.FS.writeFile(file.name, romData);
      
      // Load the ROM
      emulator.loadRom(file.name);
      
      // Start emulation
      emulator.start();
      setRomLoaded(true);
      setIsPaused(false);
    } catch (error) {
      console.error('Error loading ROM:', error);
      alert('Failed to load ROM file');
    }
  };

  const togglePause = () => {
    if (!emulator || !romLoaded) return;
    
    if (isPaused) {
      emulator.start();
    } else {
      emulator.pause();
    }
    
    setIsPaused(!isPaused);
  };

  const reset = () => {
    if (!emulator || !romLoaded) return;
    
    emulator.reset();
    if (isPaused) {
      emulator.start();
      setIsPaused(false);
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
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button 
            onClick={reset} 
            disabled={isLoading || !emulator || !romLoaded}
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="instructions">
        <h3>Controls:</h3>
        <p>D-Pad: Arrow Keys</p>
        <p>A Button: Z</p>
        <p>B Button: X</p>
        <p>L Button: A</p>
        <p>R Button: S</p>
        <p>Start: Enter</p>
        <p>Select: Backspace</p>
      </div>
    </div>
  );
};

export default GBAEmulator; 