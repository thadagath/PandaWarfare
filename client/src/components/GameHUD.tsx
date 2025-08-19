import { useGameState } from "@/lib/stores/useGameState";
import { useAudio } from "@/lib/stores/useAudio";
import { Progress } from "@/components/ui/progress";

export default function GameHUD() {
  const { score, health, burnAttackCooldown, burnAttackReady, wave } = useGameState();
  const { toggleMute, isMuted } = useAudio();

  const healthPercentage = (health / 3) * 100;
  const burnProgress = burnAttackReady ? 100 : ((30 - burnAttackCooldown) / 30) * 100;

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-black/30 backdrop-blur-xl border-b border-white/20">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left side - Score and Wave */}
        <div className="flex items-center gap-6">
          <div className="text-center bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-yellow-400/30">
            <div className="text-xs text-yellow-300 uppercase tracking-wider font-medium">SCORE</div>
            <div className="text-2xl font-bold text-yellow-400">{score}</div>
          </div>
          <div className="text-center bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-400/30">
            <div className="text-xs text-blue-300 uppercase tracking-wider font-medium">WAVE</div>
            <div className="text-2xl font-bold text-blue-400">{wave}</div>
          </div>
        </div>

        {/* Center - Health */}
        <div className="flex-1 max-w-xs bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-red-400/30">
          <div className="text-xs text-red-300 mb-2 uppercase tracking-wider font-medium text-center">🐼 GENERAL PANDA</div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-white font-medium">HP</div>
            <Progress 
              value={healthPercentage} 
              className="flex-1 h-3 bg-black/40"
            />
            <div className="text-sm text-white font-bold">{health}/3</div>
          </div>
        </div>

        {/* Right side - Burn Attack and Sound */}
        <div className="flex items-center gap-4">
          <div className="text-center min-w-[120px] bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-orange-400/30">
            <div className="text-xs text-orange-300 uppercase tracking-wider font-medium">🔥 BURN ATTACK</div>
            {burnAttackReady ? (
              <div className="text-lg font-bold text-red-400 animate-pulse">⚡ READY!</div>
            ) : (
              <div className="w-full">
                <Progress 
                  value={burnProgress} 
                  className="h-2 mb-1 bg-black/40"
                />
                <div className="text-xs text-orange-300 font-medium">{Math.ceil(burnAttackCooldown)}s</div>
              </div>
            )}
          </div>
          
          <button
            onClick={toggleMute}
            className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:text-orange-400 hover:border-orange-400/50 transition-all duration-200 hover:scale-110"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>

      {/* Mobile instructions */}
      <div className="mt-3 text-xs text-slate-400 text-center md:hidden bg-black/20 backdrop-blur-sm py-2 px-4 rounded-lg border border-white/10">
        Use on-screen controls • B button for Burn Attack when ready
      </div>
    </div>
  );
}
