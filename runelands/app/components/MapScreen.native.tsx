import { StyleSheet, View } from 'react-native';
import { Camera, Map as MapLibreMap, Marker } from '@maplibre/maplibre-react-native';

type Coords = { latitude: number; longitude: number };

const osmStyle = {
  version: 8 as const,
  sources: {
    osm: {
      type: 'raster' as const,
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster' as const,
      source: 'osm',
    },
  ],
};

export default function MapScreen({ coords }: { coords: Coords }) {
  const center: [number, number] = [coords.longitude, coords.latitude];

  return (
    <View style={styles.container}>
      <MapLibreMap style={styles.map} mapStyle={osmStyle}>
        <Camera initialViewState={{ center, zoom: 15 }} />
        <Marker id="moi" lngLat={center}>
          <View style={styles.marker} />
        </Marker>
      </MapLibreMap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  marker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2E7DD7',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
