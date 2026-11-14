import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';

interface MenuBreakdownProps {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

const CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Drinks'];

export default function MenuBreakdown({ selectedCategories, onToggleCategory }: MenuBreakdownProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Order For Delivery!</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {CATEGORIES.map((category) => {
          const isActive = selectedCategories.includes(category);
          
          return (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, isActive && styles.categoryButtonActive]}
              onPress={() => onToggleCategory(category)}
            >
              <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    fontFamily: 'Karla-Bold',
    marginBottom: 15,
    letterSpacing: 1,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: '#EDEFEE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark, 
    fontFamily: 'Karla-Bold',
  },
  categoryTextActive: {
    color: COLORS.textLight,
  },
});