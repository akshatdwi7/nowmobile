import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const ONBOARDING_KEY = '@nowmobile_onboarding_done';
const DEBUG_MODE = true; // Set to false after testing onboarding

export function useOnboarding() {
  const [isOnboardingDone, setIsOnboardingDone] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has completed onboarding on app start
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      // Reset onboarding in debug mode for testing
      if (DEBUG_MODE) {
        await AsyncStorage.removeItem(ONBOARDING_KEY);
      }
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      setIsOnboardingDone(value === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsOnboardingDone(false);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      setIsOnboardingDone(true);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
      setIsOnboardingDone(false);
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  return {
    isOnboardingDone,
    isLoading,
    completeOnboarding,
    resetOnboarding,
  };
}
