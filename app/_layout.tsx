import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';

import SplashLottie from '@/components/SplashLottie';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useOnboarding } from '@/hooks/use-onboarding';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isOnboardingDone, isLoading } = useOnboarding();
  const router = useRouter();
  const [splashDone, setSplashDone] = useState(false);

  // Navigate after splash completes
  useEffect(() => {
    if (splashDone && !isLoading) {
      if (!isOnboardingDone) {
        router.replace('/welcome');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [splashDone, isLoading, isOnboardingDone]);

  // Show splash while loading and before navigation
  if (!splashDone || isLoading) {
    return <SplashLottie onDone={() => setSplashDone(true)} />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chats" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
