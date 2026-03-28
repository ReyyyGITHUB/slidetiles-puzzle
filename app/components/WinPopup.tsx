'use client'

import React from 'react'
import { Trophy, Timer, Hash, RotateCcw, Share2, LayoutGrid } from 'lucide-react'

interface WinPopupProps {
  moves: number;
  time: string;
  onRestart: () => void;
}

export default function WinPopup({ moves, time, onRestart }: WinPopupProps) {
  const handleShareScore = () => {
    const myNumber = '6285799799857'
    const websiteUrl = 'https://example.com'
    const message = `Sliding Tiles: Puzzle Solved!

Dalam sekejap, tantangan ini runtuh tanpa perlawanan. Setiap langkah terasa nyaris tak terlihat, setiap detik berlalu tanpa cela.

Statistik permainan:
• Moves: ${moves} langkah
• Time: ${time}

Sebuah penyelesaian yang nyaris mustahil—tanpa langkah, tanpa ragu, hanya hasil sempurna dalam satu detik.

Berani membuktikan bahwa kamu bisa menandingi ini?
Mainkan Sekarang:
${websiteUrl}`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${myNumber}?text=${encodedMessage}`, '_blank')
  }

  return (
    /* 1. Overlay Wrapper: Menggunakan Backdrop Blur & Stone Tint */
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-on-background/40 backdrop-blur-md animate-in fade-in duration-500">
      
      {/* 2. Dialog Container: Rounded Besar & Border Kontras */}
      <div className="relative w-full max-w-sm bg-tertiary-container rounded-[3rem] p-1 border-4 border-primary-container shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Dekoratif Background (Blurs) */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

        <div className="relative p-8 flex flex-col items-center text-center">
          
          {/* Celebratory Icon */}
          <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mb-6 shadow-sm border-2 border-primary/10">
            <Trophy className="text-primary w-10 h-10" strokeWidth={2.5} />
          </div>

          {/* Title & Message */}
          <div className="mb-8">
            <h2 className="font-display text-3xl font-extrabold text-primary tracking-tighter mb-2">
              Puzzle Solved!
            </h2>
            <p className="body-text text-sm font-medium opacity-60">
              Exceptional spatial awareness demonstrated.
            </p>
          </div>

          {/* 3. Stats Grid (Bento Style) */}
          <div className="grid grid-cols-2 gap-4 w-full mb-10">
            {/* Moves Stat */}
            <div className="bg-surface-low p-4 rounded-3xl flex flex-col items-center justify-center border border-on-background/5">
              <Hash className="text-primary mb-2 w-5 h-5 opacity-60" />
              <span className="label-archival !text-[8px] mb-1">Final Moves</span>
              <p className="font-display text-2xl font-extrabold text-on-background">{moves}</p>
            </div>
            
            {/* Time Stat */}
            <div className="bg-surface-low p-4 rounded-3xl flex flex-col items-center justify-center border border-on-background/5">
              <Timer className="text-primary mb-2 w-5 h-5 opacity-60" />
              <span className="label-archival !text-[8px] mb-1">Total Time</span>
              <p className="font-display text-2xl font-extrabold text-on-background">{time}</p>
            </div>
          </div>

          {/* 4. Action Buttons Stack */}
          <div className="flex flex-col w-full gap-3">
            {/* Primary Action: Play Again */}
            <button 
              onClick={onRestart}
              className="w-full bg-primary text-tertiary-container py-4 rounded-full font-display font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Play Again
            </button>

            {/* Secondary Action: Share */}
            <button
              onClick={handleShareScore}
              className="w-full bg-transparent border-2 border-primary-container py-4 rounded-full text-primary font-display font-bold text-lg hover:bg-primary-container/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Share2 size={20} />
              Share Score
            </button>
          </div>

          {/* Tertiary Action: Back to Home */}
          <button
            onClick={() => {
              window.location.href = '/home'
            }}
            className="mt-6 label-archival !text-[10px] opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
          >
            <LayoutGrid size={12} />
            Return to Levels
          </button>
        </div>
      </div>
    </div>
  )
}
