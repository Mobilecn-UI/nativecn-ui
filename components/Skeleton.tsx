import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { cn } from '../lib/utils';

export function Skeleton({ classes }: { classes: string }) {
  const fadeAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      className={cn('bg-gray-300 rounded-md', classes)}
      style={[{ opacity: fadeAnim }]}
    />
  );
}
