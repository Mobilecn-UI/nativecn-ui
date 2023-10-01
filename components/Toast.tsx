import { useEffect, useRef } from 'react';

import { Animated, Text, View, useColorScheme } from 'react-native';

import { styled } from 'nativewind';

interface ToastProps {
  id: number;
  onHide: (id: number) => void;
  message: string;
  variant?: 'default' | 'success' | 'error' | 'info';
  duration?: number;
}

export function Toast({
  id,
  onHide,
  message,
  variant = 'default',
  duration = 3000,
}: ToastProps) {
  const colorScheme = useColorScheme();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => onHide(id)); // Here we're passing the ID of the toast to remove
  }, [duration]);

  const variantStyles: Record<string, string> = {
    default:
      colorScheme === 'light' ? 'bg-black text-white' : 'bg-white text-black',
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <Animated.View
      className={`
        ${variantStyles[variant]}
        p-4 m-2 mb-1 rounded-lg 
        shadow-md 
        transform transition-all 
        opacity-50
      `}
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
      }}
    >
      <Text className="text-center text-white font-semibold dark:text-black">
        {message}
      </Text>
    </Animated.View>
  );
}
