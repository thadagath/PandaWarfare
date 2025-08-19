import { useRef, useEffect, useCallback } from "react";
import { GameEngine } from "@/lib/game/GameEngine";

interface GameCanvasProps {
  keys: Set<string>;
  mobileControls: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    attack: boolean;
    burn: boolean;
  };
}

export default function GameCanvas({ keys, mobileControls }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);

  // Initialize game engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize game engine
    gameEngineRef.current = new GameEngine(canvas, ctx);
    gameEngineRef.current.init();

    console.log("Game engine initialized");

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (gameEngineRef.current) {
        gameEngineRef.current.destroy();
      }
    };
  }, []);

  // Update input state
  useEffect(() => {
    if (gameEngineRef.current) {
      gameEngineRef.current.updateInput(keys, mobileControls);
    }
  }, [keys, mobileControls]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block bg-gradient-to-b from-orange-900 to-red-900"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
