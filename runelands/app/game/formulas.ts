import { TITLES } from './data';

export function cumXP(level: number): number {
  return Math.round(100 * Math.pow(level - 1, 1.5));
}

export function levelOf(xp: number): number {
  let level = 1;
  while (xp >= cumXP(level + 1)) level++;
  return level;
}

export function titleOf(level: number): string {
  let title = TITLES[0][1];
  for (const [min, name] of TITLES) {
    if (level >= min) title = name;
  }
  return title;
}

export function elanMult(recentOutingsCount: number): number {
  return 1 + 0.1 * Math.min(5, recentOutingsCount);
}

export function fmtKm(meters: number): string {
  return (meters / 1000).toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' km';
}

export function fmtDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}
