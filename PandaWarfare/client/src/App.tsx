import { useState, useEffect } from "react";
import { useAudio } from "./lib/stores/useAudio";
import { useGameState } from "./lib/stores/useGameState";
import Game from "./components/Game";
import GameMenu from "./components/GameMenu";
import GameOver from "./components/GameOver";
import "@fontsource/inter";

function App() {
  const { gamePhase } = useGameState();
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();
  const [isLoaded, setIsLoaded] = useState(false);

  // Load audio assets
  useEffect(() => {
    const loadAudio = async () => {
      try {
        // Load background music
        const bgMusic = new Audio('/sounds/background.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
        setBackgroundMusic(bgMusic);

        // Load hit sound
        const hitAudio = new Audio('/sounds/hit.mp3');
        hitAudio.volume = 0.5;
        setHitSound(hitAudio);

        // Load success sound
        const successAudio = new Audio('/sounds/success.mp3');
        successAudio.volume = 0.7;
        setSuccessSound(successAudio);

        setIsLoaded(true);
        console.log("Audio assets loaded successfully");
      } catch (error) {
        console.error("Failed to load audio assets:", error);
        setIsLoaded(true); // Continue without audio
      }
    };

    loadAudio();
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-white">
        <div className="text-xl">Loading General Panda's War...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden bg-black">
      {gamePhase === 'menu' && <GameMenu />}
      {gamePhase === 'playing' && <Game />}
      {gamePhase === 'gameOver' && <GameOver />}
    </div>
  );
}

export default App;
