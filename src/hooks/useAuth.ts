import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from '../types';

const ONBOARDING_KEY = '@LittleLemon:onboarding';
const USER_DATA_KEY = '@LittleLemon:userData';

const defaultUserData: UserData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  avatar: null,
  notifications: {
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  },
};

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        const savedUserData = await AsyncStorage.getItem(USER_DATA_KEY);

        if (value === 'true' && savedUserData) {
          setIsOnboardingCompleted(true);
          setUserData({ ...defaultUserData, ...JSON.parse(savedUserData) });
        }
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  const completeOnboarding = async (data: { firstName: string; email: string }) => {
    try {
      const initialData: UserData = {
        ...defaultUserData,
        firstName: data.firstName,
        email: data.email,
      };
      
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(initialData));
      
      setUserData(initialData);
      setIsOnboardingCompleted(true);
    } catch (error) {
      console.error('Error saving AsyncStorage:', error);
    }
  };

  const updateProfile = async (newData: UserData) => {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(newData));
      setUserData(newData);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);
      setIsOnboardingCompleted(false);
      setUserData(defaultUserData);
    } catch (error) {
      console.error('Error removing AsyncStorage:', error);
    }
  };

  return {
    isLoading,
    isOnboardingCompleted,
    userData,
    completeOnboarding,
    updateProfile,
    logout,
  };
}