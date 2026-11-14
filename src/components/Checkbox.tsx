import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onPress: () => void;
}

export default function Checkbox({ label, isChecked, onPress }: CheckboxProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.box, isChecked && styles.boxChecked]}>
        {isChecked && <Ionicons name="checkmark" size={16} color={COLORS.textLight} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: COLORS.background,
  },
  boxChecked: {
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: 16,
    color: COLORS.textDark,
    fontFamily: 'Karla-Regular'
  },
});