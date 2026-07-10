import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { REGIONS, RARITIES, SLOTS, type RegionKey, type SlotKey } from '../game/data';
import { cumXP, levelOf, titleOf } from '../game/formulas';
import { useGame } from '../game/store';
import { colors } from '../theme';

function bonusText(bonus: { kind: string; sport?: string; pct: number }): string {
  switch (bonus.kind) {
    case 'sport':
      return `+${bonus.pct}% XP ${bonus.sport}`;
    case 'all':
      return `+${bonus.pct}% XP toutes sorties`;
    case 'disc':
      return `+${bonus.pct}% XP des découvertes`;
    case 'hex':
      return `+${bonus.pct}% XP des hexagones`;
    default:
      return `+${bonus.pct}% chance de butin`;
  }
}

export default function ProfilScreen() {
  const { state, setName, setRegion, equipItem, unequipSlot, recycleItem, resetGame } = useGame();
  const [nameDraft, setNameDraft] = useState(state?.name ?? '');

  if (!state) return null;

  const level = levelOf(state.xp);
  const cur = cumXP(level);
  const next = cumXP(level + 1);
  const progress = Math.min(1, (state.xp - cur) / (next - cur));
  const region = REGIONS[state.region];
  const inventory = state.inventory.filter((item) => state.equip[item.slot] !== item.id);

  const longest = state.outings.reduce((m, o) => Math.max(m, o.dist), 0);
  const bestDplus = state.outings.reduce((m, o) => Math.max(m, o.dplus || 0), 0);
  const bestXp = state.outings.reduce((m, o) => Math.max(m, o.xp), 0);
  const sanctuaries = state.discoveries.filter((d) => d.type === 'sanctuaire').length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.card, { borderColor: region.color }]}>
        <TextInput
          style={styles.nameInput}
          value={nameDraft}
          onChangeText={setNameDraft}
          onBlur={() => nameDraft.trim() && setName(nameDraft.trim())}
        />
        <Text style={styles.meta}>
          {titleOf(level)} · niveau {level} · {region.name}
        </Text>
        <View style={styles.xpBarTrack}>
          <View style={[styles.xpBarFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.xpLabel}>{state.xp} XP</Text>
      </View>

      <View style={styles.statsRow}>
        <Stat label="km parcourus" value={(state.km / 1000).toFixed(1)} />
        <Stat label="hexagones" value={String(state.hexCount)} />
        <Stat label="sorties" value={String(state.outings.length)} />
        <Stat label="D+" value={String(Math.round(state.dplus))} />
      </View>

      <Text style={styles.sectionTitle}>Équipement</Text>
      <View style={styles.section}>
        {(Object.keys(SLOTS) as SlotKey[]).map((slot) => {
          const itemId = state.equip[slot];
          const item = state.inventory.find((i) => i.id === itemId);
          return (
            <View key={slot} style={styles.slotRow}>
              <Text style={styles.slotIcon}>{SLOTS[slot].icon}</Text>
              <View style={styles.slotInfo}>
                {item ? (
                  <>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemMeta}>
                      <Text style={{ color: RARITIES[item.rarity].color }}>{RARITIES[item.rarity].key}</Text>
                      {'  '}
                      {bonusText(item.bonus)}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.itemNameEmpty}>{SLOTS[slot].label}</Text>
                    <Text style={styles.itemMeta}>emplacement vide</Text>
                  </>
                )}
              </View>
              {item && (
                <Pressable onPress={() => unequipSlot(slot)}>
                  <Text style={styles.actionLink}>Retirer</Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Sac ({inventory.length})</Text>
      <View style={styles.section}>
        {inventory.length === 0 ? (
          <Text style={styles.emptyText}>
            Sac vide — le butin tombe pendant les sorties, surtout en découvrant vestiges et sanctuaires.
          </Text>
        ) : (
          inventory.map((item) => (
            <View key={item.id} style={styles.slotRow}>
              <Text style={styles.slotIcon}>{SLOTS[item.slot].icon}</Text>
              <View style={styles.slotInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMeta}>
                  <Text style={{ color: RARITIES[item.rarity].color }}>{RARITIES[item.rarity].key}</Text>
                  {'  '}
                  {bonusText(item.bonus)}
                </Text>
              </View>
              <View style={{ gap: 6 }}>
                <Pressable onPress={() => equipItem(item.id)}>
                  <Text style={styles.actionLink}>Équiper</Text>
                </Pressable>
                <Pressable onPress={() => recycleItem(item.id)}>
                  <Text style={styles.actionLinkMuted}>Recycler</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>

      <Text style={styles.sectionTitle}>Records</Text>
      <View style={styles.section}>
        <RecordRow label="Plus longue sortie" value={longest ? `${(longest / 1000).toFixed(1)} km` : '—'} />
        <RecordRow label="Meilleur dénivelé" value={bestDplus ? `+${bestDplus} m` : '—'} />
        <RecordRow label="Meilleure récolte" value={bestXp ? `+${bestXp} XP` : '—'} />
        <RecordRow label="Sanctuaires découverts" value={sanctuaries || '—'} />
      </View>

      <Text style={styles.sectionTitle}>Région</Text>
      <View style={styles.regions}>
        {(Object.keys(REGIONS) as RegionKey[]).map((key) => (
          <Pressable
            key={key}
            style={[styles.regionChip, state.region === key && styles.regionChipSelected]}
            onPress={() => setRegion(key)}
          >
            <View style={[styles.regionSwatch, { backgroundColor: REGIONS[key].color }]} />
            <Text style={styles.regionLabel}>{REGIONS[key].name}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={resetGame} style={styles.resetButton}>
        <Text style={styles.resetLabel}>Recommencer l'aventure</Text>
      </Pressable>
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function RecordRow({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.recordRow}>
      <Text style={styles.recordLabel}>{label}</Text>
      <Text style={styles.recordValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.parchment },
  content: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    marginBottom: 16,
  },
  nameInput: { fontSize: 20, fontWeight: 'bold', color: colors.ink, padding: 0 },
  meta: { fontSize: 13, color: colors.inkLight, marginTop: 4, marginBottom: 10 },
  xpBarTrack: { height: 8, borderRadius: 4, backgroundColor: colors.parchmentDark, overflow: 'hidden' },
  xpBarFill: { height: '100%', backgroundColor: colors.accent },
  xpLabel: { fontSize: 12, color: colors.inkLight, marginTop: 4, textAlign: 'right' },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  stat: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: colors.ink },
  statLabel: { fontSize: 10, color: colors.inkLight, marginTop: 2, textAlign: 'center' },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: colors.inkLight, textTransform: 'uppercase', marginBottom: 8, marginTop: 4 },
  section: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, marginBottom: 16, gap: 10 },
  slotRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  slotIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  slotInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: 'bold', color: colors.ink },
  itemNameEmpty: { fontSize: 14, color: colors.inkLight },
  itemMeta: { fontSize: 12, color: colors.inkLight, marginTop: 2 },
  actionLink: { fontSize: 12, color: colors.accent, fontWeight: 'bold' },
  actionLinkMuted: { fontSize: 12, color: colors.inkLight },
  emptyText: { fontSize: 13, color: colors.inkLight, textAlign: 'center', padding: 4 },
  recordRow: { flexDirection: 'row', justifyContent: 'space-between' },
  recordLabel: { fontSize: 13, color: colors.inkLight },
  recordValue: { fontSize: 13, fontWeight: 'bold', color: colors.ink },
  regions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  regionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.parchmentDark,
  },
  regionChipSelected: { borderColor: colors.accent, borderWidth: 2 },
  regionSwatch: { width: 12, height: 12, borderRadius: 6 },
  regionLabel: { fontSize: 12, color: colors.ink },
  resetButton: { alignItems: 'center', paddingVertical: 12 },
  resetLabel: { fontSize: 12, color: colors.inkLight, textDecorationLine: 'underline' },
});
