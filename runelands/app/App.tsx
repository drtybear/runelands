import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CarteScreen from './components/CarteScreen';
import CarnetScreen from './components/CarnetScreen';
import SortiesScreen from './components/SortiesScreen';
import ProfilScreen from './components/ProfilScreen';
import OnboardingScreen from './components/OnboardingScreen';
import { GameProvider, useGame } from './game/store';
import { colors } from './theme';

const TABS = [
  { key: 'carte', label: 'Carte', icon: '🗺' },
  { key: 'carnet', label: 'Carnet', icon: '📜' },
  { key: 'sorties', label: 'Sorties', icon: '👟' },
  { key: 'profil', label: 'Profil', icon: '☉' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

function AppShell() {
  const { state, loading } = useGame();
  const [activeTab, setActiveTab] = useState<TabKey>('carte');

  if (loading) {
    return (
      <View style={[styles.app, styles.center]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!state) {
    return (
      <View style={styles.app}>
        <OnboardingScreen />
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <View style={styles.app}>
      <View style={styles.content}>
        {activeTab === 'carte' && <CarteScreen />}
        {activeTab === 'carnet' && <CarnetScreen />}
        {activeTab === 'sorties' && <SortiesScreen />}
        {activeTab === 'profil' && <ProfilScreen />}
      </View>

      <View style={styles.tabbar}>
        {TABS.map((tab) => (
          <Pressable key={tab.key} style={styles.tab} onPress={() => setActiveTab(tab.key)}>
            <Text style={[styles.tabIcon, activeTab === tab.key && styles.tabIconActive]}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>
      <StatusBar style="light" />
    </View>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppShell />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.parchment },
  center: { alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1 },
  tabbar: {
    flexDirection: 'row',
    backgroundColor: colors.tabBar,
    paddingTop: 8,
    paddingBottom: 24,
  },
  tab: { flex: 1, alignItems: 'center', gap: 2 },
  tabIcon: { fontSize: 20, opacity: 0.6 },
  tabIconActive: { opacity: 1 },
  tabLabel: { fontSize: 11, color: colors.tabBarInactive },
  tabLabelActive: { color: '#FFFFFF', fontWeight: 'bold' },
});
