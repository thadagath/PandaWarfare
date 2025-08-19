import { create } from "zustand";

export type GamePhase = "menu" | "playing" | "gameOver";

interface GameState {
  gamePhase: GamePhase;
  score: number;
  health: number;
  burnAttackReady: boolean;
  burnAttackCooldown: number;
  wave: number;
  
  // Actions
  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
  addScore: (points: number) => void;
  takeDamage: () => void;
  useBurnAttack: () => void;
  updateBurnAttackCooldown: (time: number) => void;
  nextWave: () => void;
}

export const useGameState = create<GameState>((set) => ({
  gamePhase: "menu",
  score: 0,
  health: 3,
  burnAttackReady: false,
  burnAttackCooldown: 30,
  wave: 1,
  
  startGame: () => set(() => ({ 
    gamePhase: "playing",
    score: 0,
    health: 3,
    burnAttackReady: false,
    burnAttackCooldown: 30,
    wave: 1
  })),
  
  endGame: () => set(() => ({ gamePhase: "gameOver" })),
  
  resetGame: () => set(() => ({ 
    gamePhase: "menu",
    score: 0,
    health: 3,
    burnAttackReady: false,
    burnAttackCooldown: 30,
    wave: 1
  })),
  
  addScore: (points) => set((state) => ({ score: state.score + points })),
  
  takeDamage: () => set((state) => {
    const newHealth = state.health - 1;
    return {
      health: newHealth,
      gamePhase: newHealth <= 0 ? "gameOver" : state.gamePhase
    };
  }),
  
  useBurnAttack: () => set(() => ({ 
    burnAttackReady: false,
    burnAttackCooldown: 30
  })),
  
  updateBurnAttackCooldown: (time) => set(() => ({
    burnAttackCooldown: time,
    burnAttackReady: time <= 0
  })),
  
  nextWave: () => set((state) => ({ wave: state.wave + 1 }))
}));
