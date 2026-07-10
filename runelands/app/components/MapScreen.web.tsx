import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Coords = { latitude: number; longitude: number };

export default function MapScreen({ coords }: { coords: Coords }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carte (aperçu web)</Text>
      <Text style={styles.message}>
        La vraie carte s'affiche uniquement sur mobile (APK). Position détectée :
      </Text>
      <Text style={styles.coords}>
        {coords.latitude.toFixed(5)}, {coords.longitude.toFixed(5)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.parchment,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: colors.ink },
  message: { textAlign: 'center', marginBottom: 8, color: colors.inkLight },
  coords: { fontFamily: 'monospace', color: colors.ink },
});
