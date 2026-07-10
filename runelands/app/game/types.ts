import type { RegionKey, SlotKey, Sport } from './data';

export type DiscoveryType = 'rune' | 'ruine' | 'sanctuaire';

export interface Discovery {
  type: DiscoveryType;
  glyph: string;
  name: string;
  date: number;
  lat: number;
  lng: number;
}

export interface ItemBonus {
  kind: 'sport' | 'all' | 'disc' | 'hex' | 'loot';
  sport?: Sport;
  pct: number;
}

export interface Item {
  id: string;
  slot: SlotKey;
  rarity: 0 | 1 | 2 | 3;
  name: string;
  bonus: ItemBonus;
}

export interface Outing {
  sport: Sport;
  dist: number;
  dplus: number;
  date: number;
  xp: number;
  hexNew: number;
  discCount: number;
  lootCount: number;
  source: 'trace' | 'gpx';
}

export interface GameState {
  name: string;
  region: RegionKey;
  xp: number;
  km: number;
  dplus: number;
  hexCount: number;
  discoveries: Discovery[];
  outings: Outing[];
  inventory: Item[];
  equip: Partial<Record<SlotKey, string>>;
  createdAt: number;
}
