"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BarChart2, Settings, ArrowLeft, RefreshCcw, Lightbulb } from "lucide-react";
import Link from "next/link";
import WinPopup from "../components/WinPopup";

export default function FullscreenGame() {
  const SHOW_DEV_WIN_BUTTON = 1;
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isWon, setIsWon] = useState(false);

  const initGame = useCallback(() => {
    const solved = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let shuffled = [...solved];
    for (let i = 0; i < 200; i++) {
      const emptyIndex = shuffled.indexOf(0);
      const neighbors = getNeighbors(emptyIndex);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      const temp = shuffled[emptyIndex];
      shuffled[emptyIndex] = shuffled[randomNeighbor];
      shuffled[randomNeighbor] = temp;
    }
    setTiles(shuffled);
    setMoves(0);
    setSeconds(0);
    setIsActive(true);
    setIsWon(false);
  }, []);

  const getNeighbors = (index: number) => {
    const neighbors = [];
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (row > 0) neighbors.push(index - 3);
    if (row < 2) neighbors.push(index + 3);
    if (col > 0) neighbors.push(index - 1);
    if (col < 2) neighbors.push(index + 1);
    return neighbors;
  };

  const handleTileClick = (index: number) => {
    if (isWon) return;
    const emptyIndex = tiles.indexOf(0);
    const neighbors = getNeighbors(emptyIndex);
    if (neighbors.includes(index)) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = 0;
      setTiles(newTiles);
      setMoves((prev) => prev + 1);
      if (slideAudioRef.current) {
        slideAudioRef.current.currentTime = 0;
        slideAudioRef.current.play().catch(() => undefined);
      }
      if (JSON.stringify(newTiles) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 0])) {
        setIsWon(true);
        setIsActive(false);
      }
    }
  };

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && !isWon) interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    else clearInterval(interval);
    return () => clearInterval(interval);
  }, [isActive, isWon]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden selection:bg-primary-container font-body">
      {/* Header */}
      <header className="h-16 flex justify-between items-center px-6 border-b border-on-background/5 bg-surface/50 backdrop-blur-sm z-30">
        <Link href="/home" className="action-icon">
          <ArrowLeft size={20} className="text-primary" />
        </Link>
        <h2 className="text-lg font-display font-extrabold text-primary tracking-tighter">Garden Pathway</h2>
        <div className="flex gap-2">
          {process.env.NODE_ENV !== "production" && SHOW_DEV_WIN_BUTTON === 1 && (
            <button className="action-icon" onClick={() => { setIsWon(true); setIsActive(false); }}>
              <BarChart2 size={18} className="text-primary" />
            </button>
          )}
          <button className="action-icon" onClick={initGame}><RefreshCcw size={18} className="text-primary" /></button>
          <button className="action-icon"><Settings size={18} className="text-primary" /></button>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-[420px] flex justify-between items-end mb-8">
          <div className="flex flex-col">
            <span className="label-archival text-secondary/60">Moves</span>
            <span className="text-3xl font-display font-extrabold text-primary tracking-tighter">{moves}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="label-archival text-secondary/60">Duration</span>
            <span className="text-3xl font-display font-extrabold text-primary tracking-tighter">{formatTime(seconds)}</span>
          </div>
        </div>

        {/* Game Board Container */}
        <div className="well-container w-full aspect-square max-w-[420px] p-3 md:p-4 relative shadow-2xl">
          <div className="relative w-full h-full">
            {/* Layer 1: Garis Panduan (Slot Kosong Statis) */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 md:gap-4 pointer-events-none">
              {[...Array(9)].map((_, i) => (
                <div key={`slot-${i}`} className="tile-empty" />
              ))}
            </div>

            {/* Layer 2: Tiles dengan Key yang Benar (key={tile}) */}
            {tiles.map((tile, index) => {
              if (tile === 0) return null;

              const row = Math.floor(index / 3);
              const col = index % 3;

              return (
                <button
                  key={tile}
                  onClick={() => handleTileClick(index)}
                  className="tile-card group absolute flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-95 will-change-transform"
                  style={{
                    width: "calc((100% - (2 * 0.75rem)) / 3)",
                    height: "calc((100% - (2 * 0.75rem)) / 3)",
                    top: 0,
                    left: 0,
                    transform: `translate3d(calc(${col} * (100% + 0.75rem)), calc(${row} * (100% + 0.75rem)), 0)`,
                    zIndex: 10,
                  }}
                >
                  <span className="text-3xl md:text-4xl font-display font-extrabold text-primary pointer-events-none">
                    {tile}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Win Popup */}
          {isWon && (
            <WinPopup
              moves={moves}
              time={formatTime(seconds)}
              onRestart={initGame}
            />
          )}
        </div>

        <button className="mt-8 flex items-center gap-2 px-6 py-2 rounded-full bg-surface-low text-secondary/40 hover:text-primary transition-colors">
          <Lightbulb size={16} />
          <span className="label-archival !text-[9px]">Get a Hint</span>
        </button>
      </main>

      <footer className="h-8 flex justify-center items-center opacity-20">
        <div className="w-16 h-1 bg-on-background/20 rounded-full" />
      </footer>
    </div>
  );
}
