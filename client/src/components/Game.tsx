import { useEffect, useRef, useState } from "react";
import GameCanvas from "./GameCanvas";
import GameHUD from "./GameHUD";
import MobileControls from "./MobileControls";
import { useGameState } from "@/lib/stores/useGameState";
import { useAudio } from "@/lib/stores/useAudio";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function Game() {
  const { gamePhase, endGame } = useGameState();
  const { backgroundMusic, isMuted } = useAudio();
  const isMobile = useIsMobile();
  const [keys, setKeys] = useState<Set<string>>(new Set());

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => new Set(Array.from(prev).concat([e.code])));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => {
        const newKeys = new Set(Array.from(prev));
        newKeys.delete(e.code);
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle background music
  useEffect(() => {
    if (backgroundMusic && gamePhase === 'playing') {
      if (!isMuted) {
        backgroundMusic.play().catch(error => {
          console.log("Background music play prevented:", error);
        });
      } else {
        backgroundMusic.pause();
      }
    }

    return () => {
      if (backgroundMusic) {
        backgroundMusic.pause();
      }
    };
  }, [backgroundMusic, gamePhase, isMuted]);

  // Mobile touch controls state
  const [mobileControls, setMobileControls] = useState({
    left: false,
    right: false,
    up: false,
    down: false,
    attack: false,
    burn: false
  });

  return (
    <div className="w-full h-full relative bg-black overflow-hidden">
      <GameHUD />
      <GameCanvas 
        keys={keys} 
        mobileControls={mobileControls}
      />
      {isMobile && (
        <MobileControls 
          controls={mobileControls}
          setControls={setMobileControls}
        />
      )}
    </div>
  );
}
