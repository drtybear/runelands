import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapScreen from './MapScreen';
import { colors } from '../theme';

type Coords = { latitude: number; longitude: number };

export default function CarteScreen() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setErrorMsg("La localisation est désactivée sur votre téléphone. Activez-la dans les réglages puis rouvrez l'appli.");
          return;
        }

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg("Accès à la position refusé. Autorisez-le dans les réglages du téléphone pour voir la carte.");
          return;
        }

        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        setErrorMsg(
          `Impossible de récupérer votre position : ${error instanceof Error ? error.message : String(error)}`
        );
      }
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>{errorMsg}</Text>
      </View>
    );
  }

  if (!coords) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.message}>Localisation en cours…</Text>
      </View>
    );
  }

  return <MapScreen coords={coords} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.parchment,
  },
  message: { marginTop: 12, textAlign: 'center', color: colors.ink },
});
