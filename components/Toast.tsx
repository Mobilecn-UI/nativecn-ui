import { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';

import { ToastVariants } from './ToastContext';

interface ToastProps {
  id: number;
  message: string;
  onHide: (id: number) => void;
  variant?: ToastVariants;
  duration?: number;
}
export function Toast({
  id,
  message,
  onHide,
  variant = 'default',
  duration = 3000,
}: ToastProps) {
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
    ]).start(() => onHide(id));
  }, [duration]);

  const variantStyles = {
    default: 'bg-black dark:bg-white',
    destructive: 'bg-red-500',
    success: 'bg-green-500',
    info: 'bg-blue-500',
  };

  return (
    <Animated.View
      className={`
        ${variantStyles[variant]}
        p-4 m-2 mb-1 rounded-lg shadow-md transform transition-all
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
      <Text className="font-semibold text-center text-white dark:text-black">
        {message}
      </Text>
    </Animated.View>
  );
}
