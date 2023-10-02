import { useState } from 'react';

import { Text, View } from 'react-native';

import { Image } from 'expo-image';

interface AvatarProps {
  src: string;
  width?: number;
  height?: number;
  fallback?: string;
  imageClasses?: string;
  fallbackViewClasses?: string;
  fallbackTextClasses?: string;
}
export function Avatar({
  src,
  width = 60,
  height = 60,
  fallback = '',
  imageClasses = 'rounded-full',
  fallbackViewClasses = 'border border-black p-4 rounded-full dark:border-white',
  fallbackTextClasses = 'text-base text-black dark:text-white',
}: AvatarProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return hasImageError ? (
    <View className={fallbackViewClasses}>
      <Text className={fallbackTextClasses}>{fallback}</Text>
    </View>
  ) : (
    <Image
      className={imageClasses}
      contentFit="cover"
      source={src}
      style={{ width, height }}
      onError={() => setHasImageError(prevState => !prevState)}
    />
  );
}
