import { useState, useCallback } from "react";

interface MobileControlsProps {
  controls: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    attack: boolean;
    burn: boolean;
  };
  setControls: (controls: any) => void;
}

export default function MobileControls({ controls, setControls }: MobileControlsProps) {
  const handleTouchStart = useCallback((action: string) => {
    setControls((prev: any) => ({ ...prev, [action]: true }));
  }, [setControls]);

  const handleTouchEnd = useCallback((action: string) => {
    setControls((prev: any) => ({ ...prev, [action]: false }));
  }, [setControls]);

  const buttonStyle = "w-16 h-16 rounded-full border-2 border-white/20 bg-black/40 backdrop-blur-sm text-white text-xl font-bold active:bg-white/20 select-none flex items-center justify-center transition-all duration-150 hover:scale-110 shadow-lg";
  const activeButtonStyle = "bg-white/20 border-white/40 shadow-white/20 shadow-xl scale-110";

  return (
    <div className="absolute bottom-4 left-0 right-0 z-20 pointer-events-none px-4">
      <div className="flex justify-between items-end">
        {/* Movement controls */}
        <div className="pointer-events-auto">
          <div className="relative">
            {/* Up */}
            <button
              className={`${buttonStyle} ${controls.up ? activeButtonStyle : ''} absolute -top-4 left-1/2 -translate-x-1/2`}
              onTouchStart={() => handleTouchStart('up')}
              onTouchEnd={() => handleTouchEnd('up')}
              onMouseDown={() => handleTouchStart('up')}
              onMouseUp={() => handleTouchEnd('up')}
            >
              ↑
            </button>
            
            {/* Left and Right */}
            <div className="flex gap-4 items-center">
              <button
                className={`${buttonStyle} ${controls.left ? activeButtonStyle : ''}`}
                onTouchStart={() => handleTouchStart('left')}
                onTouchEnd={() => handleTouchEnd('left')}
                onMouseDown={() => handleTouchStart('left')}
                onMouseUp={() => handleTouchEnd('left')}
              >
                ←
              </button>
              
              <div className="w-16 h-16"></div> {/* Spacer */}
              
              <button
                className={`${buttonStyle} ${controls.right ? activeButtonStyle : ''}`}
                onTouchStart={() => handleTouchStart('right')}
                onTouchEnd={() => handleTouchEnd('right')}
                onMouseDown={() => handleTouchStart('right')}
                onMouseUp={() => handleTouchEnd('right')}
              >
                →
              </button>
            </div>
            
            {/* Down */}
            <button
              className={`${buttonStyle} ${controls.down ? activeButtonStyle : ''} absolute -bottom-4 left-1/2 -translate-x-1/2`}
              onTouchStart={() => handleTouchStart('down')}
              onTouchEnd={() => handleTouchEnd('down')}
              onMouseDown={() => handleTouchStart('down')}
              onMouseUp={() => handleTouchEnd('down')}
            >
              ↓
            </button>
          </div>
        </div>

        {/* Action controls */}
        <div className="pointer-events-auto flex flex-col gap-4">
          <button
            className={`${buttonStyle} ${controls.burn ? activeButtonStyle : ''} bg-gradient-to-r from-red-600/60 to-orange-600/60 border-red-400/50 hover:from-red-500/70 hover:to-orange-500/70`}
            onTouchStart={() => handleTouchStart('burn')}
            onTouchEnd={() => handleTouchEnd('burn')}
            onMouseDown={() => handleTouchStart('burn')}
            onMouseUp={() => handleTouchEnd('burn')}
          >
            🔥
          </button>
          
          <button
            className={`${buttonStyle} ${controls.attack ? activeButtonStyle : ''} bg-gradient-to-r from-orange-600/60 to-yellow-600/60 border-orange-400/50 hover:from-orange-500/70 hover:to-yellow-500/70`}
            onTouchStart={() => handleTouchStart('attack')}
            onTouchEnd={() => handleTouchEnd('attack')}
            onMouseDown={() => handleTouchStart('attack')}
            onMouseUp={() => handleTouchEnd('attack')}
          >
            ⚔️
          </button>
        </div>
      </div>
    </div>
  );
}
