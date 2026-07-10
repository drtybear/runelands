import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapScreen from './MapScreen';
import { colors } from '../theme';

type Coords = { latitude: number; longitude: number };

// Repère par défaut (France) si la géolocalisation échoue sur web, par ex.
// quand la page est servie en http:// non sécurisé sur le réseau local.
const FALLBACK_COORDS: Coords = { latitude: 46.6, longitude: 2.2 };

export default function CarteScreen() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS !== 'web') {
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
        }

        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        if (Platform.OS === 'web') {
          // Sur web, souvent bloqué par le navigateur (page non https) : on
          // affiche quand même l'aperçu avec un repère par défaut.
          setCoords(FALLBACK_COORDS);
          return;
        }
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
