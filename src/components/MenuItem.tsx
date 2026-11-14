import { View, Text, StyleSheet, Image } from 'react-native';
import { MenuItem as MenuItemType } from '../types';
import { COLORS } from '../constants/theme';
import { getImageUrl } from '../utils/api';

interface MenuItemProps {
  item: MenuItemType;
}

export default function MenuItem({ item }: MenuItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <Image 
        source={{ uri: getImageUrl(item.image) }} 
        style={styles.image} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  textContainer: {
    flex: 1,
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    fontFamily: 'MarkaziText-Bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    fontFamily: 'Karla-Regular',
  },
  price: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
});