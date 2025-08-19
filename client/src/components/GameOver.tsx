import { useGameState } from "@/lib/stores/useGameState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function GameOver() {
  const { score, wave, resetGame, startGame } = useGameState();

  const handlePlayAgain = () => {
    console.log("Restarting game");
    resetGame();
    startGame();
  };

  const handleBackToMenu = () => {
    console.log("Returning to menu");
    resetGame();
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Modern animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 animate-pulse"></div>
        <div className="w-full h-full bg-repeat animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 40c0-20 20-20 20 0s-20 20-20 0 20-20 20 0-20 20 0 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Card className="w-full max-w-md mx-4 bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">💥</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">GAME OVER</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-orange-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="text-lg mb-8">
            <p className="text-orange-300 mb-2 font-medium">General Panda has fallen!</p>
            <p className="text-slate-300">The Jeets have overrun the battlefield.</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl mb-8 border border-white/10">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="group">
                <div className="text-3xl font-bold text-yellow-400 mb-1 group-hover:scale-110 transition-transform">{score}</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Jeets Defeated</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-blue-400 mb-1 group-hover:scale-110 transition-transform">{wave}</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Waves Survived</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handlePlayAgain}
              className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-red-500/25 transition-all duration-200 hover:scale-105"
            >
              ⚔️ FIGHT AGAIN
            </Button>
            
            <Button
              onClick={handleBackToMenu}
              variant="outline"
              className="w-full px-8 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl text-lg transition-all duration-200 hover:scale-105"
            >
              🏠 MAIN MENU
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
