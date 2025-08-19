import { useGameState } from "@/lib/stores/useGameState";
import { useAudio } from "@/lib/stores/useAudio";
import { Button } from "@/components/ui/button";

export default function GameMenu() {
  const { startGame } = useGameState();
  const { toggleMute, isMuted } = useAudio();

  const handleStartGame = () => {
    console.log("Starting game");
    startGame();
  };

  const handleToggleSound = () => {
    toggleMute();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 text-white relative overflow-hidden">
      {/* Modern animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/30 animate-pulse"></div>
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30c10-10 10 10 0 0s-10-10 0 0 10 10 0 0-10-10 0 0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-4">
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-bounce">🐼⚔️</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
            GENERAL PANDA'S WAR
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full mb-6 animate-pulse"></div>
        </div>
        
        <p className="text-lg md:text-xl mb-10 text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium">
          Lead General Panda into epic battle against the Jeet invasion! 
          Master the battlefield with precision controls and unleash devastating special attacks!
        </p>

        <div className="space-y-6 mb-10">
          <Button
            onClick={handleStartGame}
            className="px-12 py-5 text-xl md:text-2xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-110 transform"
          >
            ⚔️ START BATTLE
          </Button>
          
          <div className="flex justify-center">
            <Button
              onClick={handleToggleSound}
              variant="outline"
              className="px-8 py-3 text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-200 hover:scale-105"
            >
              {isMuted ? "🔇 SOUND OFF" : "🔊 SOUND ON"}
            </Button>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-2xl mx-auto">
          <p className="text-orange-300 font-semibold mb-3 text-lg">BATTLE CONTROLS:</p>
          <div className="grid md:grid-cols-3 gap-4 text-slate-300">
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="font-medium">Movement</p>
              <p className="text-sm">↑↓←→ or WASD</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="font-medium">Attack</p>
              <p className="text-sm">SPACE</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="font-medium">Burn Attack</p>
              <p className="text-sm">B Key</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400">Mobile: Touch controls will appear during gameplay</p>
        </div>
      </div>
    </div>
  );
}
