import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

type Props = {
  onDone?: () => void;
};

export default function SplashLottie({ onDone }: Props) {
  const anim = useRef<LottieView | null>(null);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(() => {});
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      <LottieView
        ref={anim}
        source={require('../assets/animations/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={async () => {
          await SplashScreen.hideAsync().catch(() => {});
          onDone && onDone();
        }}
        style={styles.animation}
        resizeMode="cover"
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    top: 0,
    left: 0,
    backgroundColor: '#F7F6F2',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  animation: {
    width: width * 0.7,
    height: width * 0.7,
  },
});
