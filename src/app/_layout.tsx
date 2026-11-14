// src/app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/useAuth';
import { useFonts } from 'expo-font';
import SplashScreen from '../components/SplashScreen';

export default function RootLayout() {
  const { isLoading, isOnboardingCompleted } = useAuth();

  const [fontsLoaded] = useFonts({
    'MarkaziText-Bold': require('../../assets/fonts/MarkaziText-Bold.ttf'),
    'MarkaziText-Regular': require('../../assets/fonts/MarkaziText-Regular.ttf'),
    'Karla-Bold': require('../../assets/fonts/Karla-Bold.ttf'),
    'Karla-Regular': require('../../assets/fonts/Karla-Regular.ttf'),
  });

  if (isLoading || !fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {!isOnboardingCompleted ? (
          <Stack.Screen name="onboarding" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
    </>
  );
}