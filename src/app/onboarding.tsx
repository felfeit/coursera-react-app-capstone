import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/theme';
import { useAuth } from '../hooks/useAuth'; 

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useAuth(); 
  
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const isNextDisabled = firstName.trim() === '' || email.trim() === '';

  const handleNext = async () => {
    await completeOnboarding({ firstName, email });
    router.replace('/(tabs)'); 
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/little_lemon_logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.heroSection}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Little Lemon</Text>
            <Text style={styles.heroSubtitle}>Chicago</Text>
            <Text style={styles.heroDescription}>
              We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </Text>
          </View>
          <View style={styles.heroImageContainer}>
            <View style={styles.heroImagePlaceholder} />
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="tilly"
              placeholderTextColor="#A9A9A9"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="tillydoe@example.com"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity 
            style={[
              styles.button, 
              isNextDisabled ? styles.buttonDisabled : styles.buttonActive
            ]}
            onPress={handleNext}
            disabled={isNextDisabled}
          >
            <Text style={[
              styles.buttonText,
              isNextDisabled ? styles.buttonTextDisabled : styles.buttonTextActive
            ]}>
              Next
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  logoImage: {
    width: 200,
    height: 50,
  },
  heroSection: {
    backgroundColor: '#4A6057',
    paddingHorizontal: 20,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 15,
  },
  heroTitle: {
    fontSize: 36,
    color: '#F4CE14',
    fontWeight: 'bold',
    fontFamily: 'MarkaziText-Bold',

  },
  heroSubtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'MarkaziText-Regular',
  },
  heroDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Karla-Regular'
  },
  heroImageContainer: {
    justifyContent: 'center',
  },
  heroImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Karla-Bold',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Karla-Regular',
  },
  button: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Karla-Bold',
  },
  buttonTextActive: {
    color: COLORS.textLight,
  },
  buttonTextDisabled: {
    color: '#A9A9A9',
  },
});