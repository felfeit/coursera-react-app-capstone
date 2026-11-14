import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../hooks/useAuth';
import { COLORS } from '../../constants/theme';
import Checkbox from '../../components/Checkbox';
import { UserData } from '../../types';

export default function ProfileScreen() {
  const { userData, updateProfile, logout } = useAuth();
  const router = useRouter(); 
  
  const [formData, setFormData] = useState<UserData>(userData);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setFormData({ ...formData, avatar: result.assets[0].uri });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, avatar: null });
  };

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setFormData({ ...formData, phone: cleaned });
  };

  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.email.trim()) {
      Alert.alert("Missing Info", "First name and email are required.");
      return;
    }
    if (formData.phone.length > 0 && formData.phone.length < 10) {
      Alert.alert("Invalid Phone", "Please enter a valid 10-digit US phone number.");
      return;
    }
    
    await updateProfile(formData);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleDiscard = () => {
    setFormData(userData);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/onboarding');
  };

  const renderAvatar = () => {
    if (formData.avatar) {
      return <Image source={{ uri: formData.avatar }} style={styles.avatar} />;
    }
    
    const firstInitial = formData.firstName ? formData.firstName[0].toUpperCase() : '';
    const lastInitial = formData.lastName ? formData.lastName[0].toUpperCase() : '';
    
    return (
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{firstInitial}{lastInitial || firstInitial}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Image 
            source={require('../../../assets/images/little_lemon_logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.pageTitle}>Personal information</Text>

          <View style={styles.avatarSection}>
            <Text style={styles.label}>Avatar</Text>
            <View style={styles.avatarActions}>
              {renderAvatar()}
              <TouchableOpacity style={styles.btnChange} onPress={pickImage}>
                <Text style={styles.btnChangeText}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnRemove} onPress={removeImage}>
                <Text style={styles.btnRemoveText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Inputs */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First name</Text>
            <TextInput 
              style={styles.input} 
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last name</Text>
            <TextInput 
              style={styles.input} 
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input} 
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput 
              style={styles.input} 
              value={formData.phone}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              placeholder="(217) 555-0113"
              placeholderTextColor="#888"
              maxLength={10}
            />
          </View>

          <Text style={[styles.pageTitle, { fontSize: 18, marginTop: 10 }]}>Email notifications</Text>
          
          <View style={styles.checkboxContainer}>
            <Checkbox 
              label="Order statuses" 
              isChecked={formData.notifications.orderStatuses} 
              onPress={() => setFormData({ ...formData, notifications: { ...formData.notifications, orderStatuses: !formData.notifications.orderStatuses } })}
            />
            <Checkbox 
              label="Password changes" 
              isChecked={formData.notifications.passwordChanges} 
              onPress={() => setFormData({ ...formData, notifications: { ...formData.notifications, passwordChanges: !formData.notifications.passwordChanges } })}
            />
            <Checkbox 
              label="Special offers" 
              isChecked={formData.notifications.specialOffers} 
              onPress={() => setFormData({ ...formData, notifications: { ...formData.notifications, specialOffers: !formData.notifications.specialOffers } })}
            />
            <Checkbox 
              label="Newsletter" 
              isChecked={formData.notifications.newsletter} 
              onPress={() => setFormData({ ...formData, notifications: { ...formData.notifications, newsletter: !formData.notifications.newsletter } })}
            />
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>

          <View style={styles.bottomActions}>
            <TouchableOpacity style={styles.discardButton} onPress={handleDiscard}>
              <Text style={styles.discardText}>Discard changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save changes</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  scrollContent: { 
    paddingBottom: 40,
    flexGrow: 1,
  },
    header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  logoImage: {
    width: 180,
    height: 45,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 20,
    fontFamily: 'MarkaziText-Bold',
  },
  avatarSection: {
    marginBottom: 25,
  },
  avatarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6EE7B7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textLight,
    fontFamily: 'MarkaziText-Bold',
  },
  btnChange: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 16,
  },
  btnChangeText: { 
    color: COLORS.textLight, 
    fontWeight: 'bold',
    fontFamily: 'Karla-Bold',
  },
  btnRemove: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnRemoveText: { 
    color: COLORS.primary, 
    fontWeight: 'bold',
    fontFamily: 'Karla-Bold',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    fontWeight: '600',
    fontFamily: 'Karla-Bold',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: COLORS.textDark,
    fontFamily: 'Karla-Regular',
  },
  checkboxContainer: {
    marginBottom: 30,
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: COLORS.secondary, 
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#E5C110', 
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    fontFamily: 'Karla-Bold',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discardButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#999',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  discardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    fontFamily: 'Karla-Bold'
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textLight,
    fontFamily: 'Karla-Bold',
  },
});