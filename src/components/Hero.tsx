import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <View style={styles.heroContainer}>
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.subtitle}>Chicago</Text>
      
      <View style={styles.contentRow}>
        <Text style={styles.description}>
          We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
        </Text>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300&auto=format&fit=crop' }} 
          style={styles.heroImage} 
        />
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textDark} style={styles.searchIcon} />
        <TextInput 
          placeholder="Search menu..." 
          style={styles.searchInput}
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    backgroundColor: '#495E57',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 25,
  },
  title: {
    fontSize: 40,
    color: '#F4CE14',
    fontWeight: 'bold',
    fontFamily: 'MarkaziText-Bold',
  },
  subtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'MarkaziText-Regular',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    color: '#FFFFFF',
    fontSize: 15,
    flex: 1,
    marginRight: 15,
    lineHeight: 20,
  },
  heroImage: {
    width: 130,
    height: 130,
    borderRadius: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEFEE',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 25,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
  },
});