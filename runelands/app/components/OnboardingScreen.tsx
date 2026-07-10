import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { REGIONS, type RegionKey } from '../game/data';
import { useGame } from '../game/store';
import { colors } from '../theme';

export default function OnboardingScreen() {
  const { startGame } = useGame();
  const [name, setName] = useState('');
  const [region, setRegion] = useState<RegionKey | null>(null);

  const canStart = name.trim().length > 0 && region !== null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenue, explorateur</Text>
      <Text style={styles.subtitle}>Choisis ton nom et tes couleurs avant de partir sur les chemins.</Text>

      <Text style={styles.label}>Ton nom</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nom de l'explorateur"
        placeholderTextColor={colors.tabBarInactive}
      />

      <Text style={styles.label}>Ta région</Text>
      <View style={styles.regions}>
        {(Object.keys(REGIONS) as RegionKey[]).map((key) => (
          <Pressable
            key={key}
            style={[styles.region, region === key && styles.regionSelected]}
            onPress={() => setRegion(key)}
          >
            <View style={[styles.regionSwatch, { backgroundColor: REGIONS[key].color }]} />
            <Text style={styles.regionLabel}>{REGIONS[key].name}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable disabled={!canStart} onPress={() => region && startGame(name.trim(), region)}>
        <View style={[styles.startButton, !canStart && styles.startButtonDisabled]}>
          <Text style={styles.startButtonLabel}>Commencer l'aventure</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.parchment,
    padding: 24,
    paddingTop: 64,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: colors.ink, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.inkLight, textAlign: 'center', marginTop: 8, marginBottom: 28 },
  label: { fontSize: 14, fontWeight: 'bold', color: colors.ink, marginBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.parchmentDark,
  },
  regions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 32 },
  region: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.parchmentDark,
    backgroundColor: '#FFFFFF',
  },
  regionSelected: { borderColor: colors.accent, borderWidth: 2 },
  regionSwatch: { width: 14, height: 14, borderRadius: 7 },
  regionLabel: { fontSize: 14, color: colors.ink },
  startButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonDisabled: { opacity: 0.4 },
  startButtonLabel: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
