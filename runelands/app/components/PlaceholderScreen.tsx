import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function PlaceholderScreen({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: colors.parchment,
  },
  icon: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.ink, marginBottom: 8 },
  description: { fontSize: 15, color: colors.inkLight, textAlign: 'center' },
});
