import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CarteScreen from './components/CarteScreen';
import PlaceholderScreen from './components/PlaceholderScreen';
import { colors } from './theme';

const TABS = [
  { key: 'carte', label: 'Carte', icon: '🗺' },
  { key: 'carnet', label: 'Carnet', icon: '📜' },
  { key: 'sorties', label: 'Sorties', icon: '👟' },
  { key: 'profil', label: 'Profil', icon: '☉' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('carte');

  return (
    <View style={styles.app}>
      <View style={styles.content}>
        {activeTab === 'carte' && <CarteScreen />}
        {activeTab === 'carnet' && (
          <PlaceholderScreen
            icon="📜"
            title="Carnet"
            description="Vos runes, vestiges et sanctuaires découverts s'afficheront ici."
          />
        )}
        {activeTab === 'sorties' && (
          <PlaceholderScreen
            icon="👟"
            title="Sorties"
            description="L'historique de vos courses, marches et randos s'affichera ici."
          />
        )}
        {activeTab === 'profil' && (
          <PlaceholderScreen
            icon="☉"
            title="Profil"
            description="Votre personnage, son niveau, son équipement et son butin s'afficheront ici."
          />
        )}
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

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.parchment },
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
