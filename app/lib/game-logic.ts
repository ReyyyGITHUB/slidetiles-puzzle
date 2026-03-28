// src/lib/game-logic.ts

export const SOLVED_STATE = [1, 2, 3, 4, 5, 6, 7, 8, 0];

export const checkWin = (currentTiles: number[]): boolean => {
  // Membandingkan array saat ini dengan kondisi menang
  return JSON.stringify(currentTiles) === JSON.stringify(SOLVED_STATE);
};

export const getNeighbors = (index: number) => {
  const neighbors = [];
  const row = Math.floor(index / 3);
  const col = index % 3;

  if (row > 0) neighbors.push(index - 3); // Top
  if (row < 2) neighbors.push(index + 3); // Bottom
  if (col > 0) neighbors.push(index - 1); // Left
  if (col < 2) neighbors.push(index + 1); // Right
  return neighbors;
};