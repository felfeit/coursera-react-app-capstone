import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/little_lemon_logo.png')} 
        style={styles.logoImage}
        resizeMode="contain"
      />
      
      <ActivityIndicator 
        size="large" 
        color={COLORS.primary} 
        style={{ marginTop: 30 }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoImage: {
    width: 250,
    height: 80,
  },
});