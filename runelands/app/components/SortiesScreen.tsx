import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SPORT_ICON, SPORT_NAME } from '../game/data';
import { fmtDate, fmtKm } from '../game/formulas';
import { useGame } from '../game/store';
import { colors } from '../theme';

export default function SortiesScreen() {
  const { state } = useGame();
  if (!state) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Historique</Text>
      <View style={styles.section}>
        {state.outings.length === 0 ? (
          <Text style={styles.emptyText}>
            Aucune sortie — trace ton premier parcours sur la carte ou importe un GPX.
          </Text>
        ) : (
          state.outings.map((o, i) => (
            <View key={i} style={styles.outingRow}>
              <Text style={styles.outingIcon}>{SPORT_ICON[o.sport]}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.outingTitle}>
                  {SPORT_NAME[o.sport]} · {fmtKm(o.dist)}
                  {o.dplus ? ` · ${o.dplus} m D+` : ''}
                </Text>
                <Text style={styles.outingMeta}>
                  {fmtDate(o.date)} · {o.hexNew} hexagones · {o.discCount} découvertes
                  {o.lootCount ? ` · ${o.lootCount} butin` : ''}
                </Text>
              </View>
              <Text style={styles.outingXp}>+{o.xp}</Text>
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
  section: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, gap: 12 },
  emptyText: { fontSize: 13, color: colors.inkLight, textAlign: 'center', padding: 8 },
  outingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  outingIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  outingTitle: { fontSize: 14, fontWeight: 'bold', color: colors.ink },
  outingMeta: { fontSize: 12, color: colors.inkLight, marginTop: 2 },
  outingXp: { fontSize: 14, fontWeight: 'bold', color: colors.accent },
});
