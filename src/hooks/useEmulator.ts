import mGBA, { type mGBAEmulator } from '@thenick775/mgba-wasm';
import { useEffect, useState } from 'react';

export const useEmulator = (canvas: HTMLCanvasElement | null) => {
  const [emulator, setEmulator] = useState<mGBAEmulator | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      if (canvas) {
        try {
          setIsLoading(true);
          const Module = await mGBA({ canvas });

          const mGBAVersion =
            Module.version.projectName + ' ' + Module.version.projectVersion;
          console.log('Emulator version:', mGBAVersion);

          await Module.FSInit();
          setEmulator(Module);
        } catch (err) {
          console.error('Failed to initialize emulator:', err);
          setError('Failed to initialize emulator');
        } finally {
          setIsLoading(false);
        }
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