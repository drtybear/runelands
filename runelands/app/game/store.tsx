import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RegionKey, SlotKey } from './data';
import type { GameState, Item } from './types';
import { RARITIES } from './data';

const STORAGE_KEY = 'rune-state-v1';

function starterItem(): Item {
  return {
    id: 'starter',
    slot: 'chaussures',
    rarity: 0,
    name: 'Chaussures du Pèlerin',
    bonus: { kind: 'sport', sport: 'course', pct: 5 },
  };
}

function newGame(name: string, region: RegionKey): GameState {
  const starter = starterItem();
  return {
    name,
    region,
    xp: 0,
    km: 0,
    dplus: 0,
    hexCount: 0,
    discoveries: [],
    outings: [],
    inventory: [starter],
    equip: { chaussures: starter.id },
    createdAt: Date.now(),
  };
}

interface GameContextValue {
  state: GameState | null;
  loading: boolean;
  startGame: (name: string, region: RegionKey) => void;
  setRegion: (region: RegionKey) => void;
  setName: (name: string) => void;
  equipItem: (itemId: string) => void;
  unequipSlot: (slot: SlotKey) => void;
  recycleItem: (itemId: string) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setState(JSON.parse(raw));
      } catch {
        // pas de sauvegarde lisible : on repart de l'écran de création
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loading && state) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
    }
  }, [state, loading]);

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      loading,
      startGame: (name, region) => setState(newGame(name, region)),
      setRegion: (region) => setState((s) => (s ? { ...s, region } : s)),
      setName: (name) => setState((s) => (s ? { ...s, name } : s)),
      equipItem: (itemId) =>
        setState((s) => {
          if (!s) return s;
          const item = s.inventory.find((i) => i.id === itemId);
          if (!item) return s;
          return { ...s, equip: { ...s.equip, [item.slot]: item.id } };
        }),
      unequipSlot: (slot) =>
        setState((s) => (s ? { ...s, equip: { ...s.equip, [slot]: undefined } } : s)),
      recycleItem: (itemId) =>
        setState((s) => {
          if (!s) return s;
          const item = s.inventory.find((i) => i.id === itemId);
          if (!item) return s;
          const equip = { ...s.equip };
          for (const slot of Object.keys(equip) as SlotKey[]) {
            if (equip[slot] === itemId) equip[slot] = undefined;
          }
          return {
            ...s,
            equip,
            inventory: s.inventory.filter((i) => i.id !== itemId),
            xp: s.xp + RARITIES[item.rarity].xp,
          };
        }),
      resetGame: () => {
        AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
        setState(null);
      },
    }),
    [state, loading]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame doit être utilisé dans un GameProvider');
  return ctx;
}
