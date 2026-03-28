"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Play,
  BarChart2,
  Settings,
  Calendar,
  History,
  Trophy,
  Lock,
  Puzzle,
} from "lucide-react";
import Link from "next/link";

export default function MainPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const puzzleDecorations = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${15 + Math.random() * 10}s`,
        size: 20 + Math.random() * 40,
      })),
    [],
  );

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden font-body">
      {/* 1. Top Bar - Fixed, Solid, with Border Bottom */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-on-background/5 flex justify-between items-center z-50 px-4 md:px-8 shadow-sm">
        <h2 className="text-lg font-extrabold text-on-background tracking-tighter">
          Sliding Tiles
        </h2>
        <div className="flex gap-2 md:gap-4">
          <button className="action-icon">
            <BarChart2 size={18} className="text-on-background" />
          </button>
          <button className="action-icon">
            <Settings size={18} className="text-on-background" />
          </button>
        </div>
      </nav>

      {/* Background Decorative - Falling Puzzle Icons */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {isMounted &&
          puzzleDecorations.map((item) => (
            <div
              key={item.id}
              className="absolute animate-fall opacity-5 text-on-background"
              style={{
                left: item.left,
                animationDelay: item.delay,
                animationDuration: item.duration,
              }}
            >
              <Puzzle size={item.size} strokeWidth={1} />
            </div>
          ))}
      </div>

      {/* Main Content Area - Padding top to account for fixed topbar */}
      <main className="flex-1 flex flex-col items-center justify-between pt-24 pb-12 z-10 px-4 md:px-8">
        {/* 2. Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center gap-8 md:gap-12 w-full max-w-4xl mx-auto">
          <div className="flex flex-col gap-2 w-full">
            {/* GRADIENT TITLE - Responsive text size */}
            <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-display font-extrabold text-gradient border">
              Sliding Tiles
            </h1>
            <p className="label-archival text-on-background/40 mt-4 text-xs md:text-sm">
              Kiran Only.
            </p>
          </div>

          {/* CTA Play Button & Quick Stats */}
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/play"
              className="group relative bg-primary-container hover:scale-105 active:scale-95 transition-transform duration-300 px-10 md:px-16 py-6 md:py-8 rounded-full md:rounded-[2.5rem] shadow-lifted flex items-center gap-3 md:gap-4"
            >
              <span className="text-xl md:text-2xl font-display font-extrabold text-primary">
                Play Now
              </span>
              <Play
                size={20}
                fill="currentColor"
                className="text-primary md:w-6 md:h-6"
              />
            </Link>

            {/* Quick Stats below button */}
            <div className="flex gap-3">
              {/* Ikon BarChart */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-low flex items-center justify-center text-on-background/40">
                <BarChart2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              </div>

              {/* Ikon Settings (Baris 70 yang error) */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-low flex items-center justify-center text-on-background/40">
                <Settings className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Cards Section - Responsive Grid (1 col on mobile, 3 on desktop) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto mt-16 md:mt-auto z-10">
          {/* Daily Puzzle Card */}
          <div className="well-container flex flex-col gap-4 !rounded-[2rem] bg-surface/60 hover:bg-surface/90 transition-colors cursor-pointer group">
            <div className="flex justify-between items-center">
              <span className="label-archival">Daily Puzzle</span>
              <Calendar
                size={14}
                className="opacity-40 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="aspect-[16/9] bg-surface-low rounded-xl overflow-hidden grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
              {/* Placeholder for image */}
              <div className="w-full h-full flex items-center justify-center text-on-background/10 bg-on-background/5">
                <Puzzle size={32} strokeWidth={1} />
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-on-background">
                Garden Pathway
              </h3>
              <p className="body-text text-xs mt-1">
                3 x 3 • Easy •{" "}
                <span className="text-primary font-medium">New</span>
              </p>
            </div>
          </div>

          {/* Continue Card */}
          <div className="well-container flex flex-col gap-4 !rounded-[2rem] bg-surface/60 hover:bg-surface/90 transition-colors cursor-pointer group">
            <div className="flex justify-between items-center">
              <span className="label-archival">Continue</span>
              <History
                size={14}
                className="opacity-40 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="aspect-[16/9] bg-surface-low rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
              <span className="text-4xl md:text-5xl font-display font-extrabold text-on-background/10 z-10">
                85%
              </span>
              {/* Subtle progress fill */}
              <div
                className="absolute inset-y-0 left-0 bg-primary/5 z-0"
                style={{ width: "85%" }}
              />
            </div>
            <div>
              <h3 className="font-display font-bold text-on-background">
                The Grand Marble
              </h3>
              <p className="body-text text-xs mt-1">
                5 x 5 • Expert •{" "}
                <span className="text-secondary font-medium">In Progress</span>
              </p>
            </div>
          </div>

          {/* Challenges Card - Empty/Locked State */}
          <div className="well-container flex flex-col gap-4 !rounded-[2rem] bg-surface-low/50 opacity-60">
            <div className="flex justify-between items-center">
              <span className="label-archival">Challenges</span>
              <Trophy size={14} className="opacity-40" />
            </div>
            <div className="aspect-[16/9] bg-surface/40 rounded-xl flex items-center justify-center text-on-background/20 border-2 border-dashed border-on-background/10">
              <Lock size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display font-bold text-on-background">
                Time Trial
              </h3>
              <p className="body-text text-xs mt-1">Unlock at Level 5</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
