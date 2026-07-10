export const REGIONS = {
  bourgogne: { name: 'Bourgogne', color: '#8D3B46' },
  bretagne: { name: 'Bretagne', color: '#2B3040' },
  jura: { name: 'Jura', color: '#3F5D49' },
  flandres: { name: 'Flandres', color: '#B4842C' },
  provence: { name: 'Provence', color: '#7A6FAE' },
  normandie: { name: 'Normandie', color: '#4A6D8C' },
} as const;

export type RegionKey = keyof typeof REGIONS;

export const FUTHARK: [string, string][] = [
  ['ᚠ', 'Fehu'], ['ᚢ', 'Uruz'], ['ᚦ', 'Thurisaz'], ['ᚨ', 'Ansuz'], ['ᚱ', 'Raidho'], ['ᚲ', 'Kenaz'],
  ['ᚷ', 'Gebo'], ['ᚹ', 'Wunjo'], ['ᚺ', 'Hagalaz'], ['ᚾ', 'Nauthiz'], ['ᛁ', 'Isa'], ['ᛃ', 'Jera'],
  ['ᛇ', 'Eihwaz'], ['ᛈ', 'Perthro'], ['ᛉ', 'Algiz'], ['ᛊ', 'Sowilo'], ['ᛏ', 'Tiwaz'], ['ᛒ', 'Berkano'],
  ['ᛖ', 'Ehwaz'], ['ᛗ', 'Mannaz'], ['ᛚ', 'Laguz'], ['ᛜ', 'Ingwaz'], ['ᛞ', 'Dagaz'], ['ᛟ', 'Othala'],
];

export const TITLES: [number, string][] = [
  [1, 'Vagabond'], [2, 'Marcheur'], [3, 'Éclaireur'], [4, 'Pisteur'], [5, 'Explorateur'],
  [6, 'Arpenteur'], [7, 'Cartographe'], [8, 'Chasseur de runes'], [10, 'Maître des runes'],
  [13, 'Gardien des sanctuaires'], [16, 'Légende vivante'],
];

export const XP_KM = { course: 15, rando: 12, marche: 8 } as const;
export const XP_DISC = { rune: 25, ruine: 60, sanctuaire: 150 } as const;

export const SPORT_ICON = { course: '🏃', marche: '🚶', rando: '🥾' } as const;
export const SPORT_NAME = { course: 'Course', marche: 'Marche', rando: 'Rando' } as const;
export type Sport = keyof typeof SPORT_ICON;

export const RARITIES = [
  { key: 'commun', color: '#8F8878', xp: 10 },
  { key: 'rare', color: '#4A6D8C', xp: 30 },
  { key: 'épique', color: '#7A6FAE', xp: 80 },
  { key: 'légendaire', color: '#B4842C', xp: 200 },
] as const;

export const SLOTS = {
  chaussures: { label: 'Chaussures', icon: '🥾' },
  tenue: { label: 'Tenue', icon: '🧥' },
  talisman: { label: 'Talisman', icon: 'ᛟ' },
  boussole: { label: 'Boussole', icon: '🧭' },
  besace: { label: 'Besace', icon: '🎒' },
} as const;

export type SlotKey = keyof typeof SLOTS;
