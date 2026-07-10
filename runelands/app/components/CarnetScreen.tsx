import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FUTHARK } from '../game/data';
import { fmtDate } from '../game/formulas';
import { useGame } from '../game/store';
import { colors } from '../theme';

const DISCOVERY_ICON = { rune: '📜', ruine: '🗿', sanctuaire: '⛩' } as const;

export default function CarnetScreen() {
  const { state } = useGame();
  if (!state) return null;

  const gotGlyphs = new Set(state.discoveries.filter((d) => d.type === 'rune').map((d) => d.glyph));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Futhark · {gotGlyphs.size}/24</Text>
      <View style={styles.futharkGrid}>
        {FUTHARK.map(([glyph, name]) => {
          const got = gotGlyphs.has(glyph);
          return (
            <View key={glyph} style={[styles.rune, got && styles.runeGot]}>
              <Text style={[styles.runeGlyph, got && styles.runeGlyphGot]}>{glyph}</Text>
              <Text style={styles.runeName}>{name}</Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Découvertes</Text>
      <View style={styles.section}>
        {state.discoveries.length === 0 ? (
          <Text style={styles.emptyText}>
            Rien pour l'instant — pars explorer, les runes t'attendent quelque part.
          </Text>
        ) : (
          [...state.discoveries].reverse().map((d, i) => (
            <View key={i} style={styles.discoveryRow}>
              <Text style={styles.discoveryIcon}>{DISCOVERY_ICON[d.type]}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.discoveryName}>{d.name}</Text>
                <Text style={styles.discoveryDate}>{fmtDate(d.date)}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment },
  content: { padding: 16, paddingBottom: 40 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: colors.inkLight, textTransform: 'uppercase', marginBottom: 8, marginTop: 4 },
  futharkGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  rune: {
    width: 68,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
  runeGot: { opacity: 1, backgroundColor: colors.accent + '22' },
  runeGlyph: { fontSize: 22, color: colors.inkLight },
  runeGlyphGot: { color: colors.accent },
  runeName: { fontSize: 9, color: colors.inkLight, marginTop: 2, textAlign: 'center' },
  section: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, gap: 10 },
  emptyText: { fontSize: 13, color: colors.inkLight, textAlign: 'center', padding: 8 },
  discoveryRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  discoveryIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  discoveryName: { fontSize: 14, fontWeight: 'bold', color: colors.ink },
  discoveryDate: { fontSize: 12, color: colors.inkLight, marginTop: 2 },
});
