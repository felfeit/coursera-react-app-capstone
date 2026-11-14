import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { COLORS } from '../../constants/theme';
import Header from '../../components/Header'; 
import Hero from '../../components/Hero';
import MenuBreakdown from '../../components/MenuBreakdown';
import MenuItem from '../../components/MenuItem';
import { MenuItem as MenuItemType } from '../../types';
import { initDatabase, saveMenuToDB, filterMenuInDB, isDatabaseEmpty } from '../../utils/database';
import { fetchMenuData } from '../../utils/api';

export default function HomeScreen() {
  const [displayedMenu, setDisplayedMenu] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadInitialData();
    }, [])
  );

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      initDatabase();
      if (isDatabaseEmpty()) {
        const apiData = await fetchMenuData();
        saveMenuToDB(apiData);
      }
      setDisplayedMenu(filterMenuInDB([], '')); 
    } catch (error) {
      console.error('Failed to load menu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (!isLoading) {
      const results = filterMenuInDB(selectedCategories, debouncedSearchQuery);
      setDisplayedMenu(results as MenuItemType[]);
    }
  }, [selectedCategories, debouncedSearchQuery, isLoading]);


  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10 }}>Loading Menu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Header />
            <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <MenuBreakdown 
              selectedCategories={selectedCategories} 
              onToggleCategory={handleToggleCategory} 
            />
          </>
        }
        data={displayedMenu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MenuItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20, color: '#888'}}>No dishes found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF'
  },
  center: { 
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'Karla-Regular',
  },
  emptyText: {
    textAlign: 'center', 
    marginTop: 20, 
    color: '#888',
    fontFamily: 'Karla-Regular',
  }
});