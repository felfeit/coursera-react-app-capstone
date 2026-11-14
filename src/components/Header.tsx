import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <Image 
        source={require('../../assets/images/little_lemon_logo.png')} 
        style={styles.logoImage}
        resizeMode="contain"
      />
      
      <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
          style={styles.avatar} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60, 
    paddingBottom: 15,
    backgroundColor: '#FFFFFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#EAEAEA',
  },
  logoImage: {
    width: 150,
    height: 40,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
});