import { useState } from 'react';

import { Text, View } from 'react-native';

import { Image } from 'expo-image';

interface AvatarProps {
  src: string;
  width?: number;
  height?: number;
  fallback?: string;
}
export default function Avatar({
  src,
  width = 60,
  height = 60,
  fallback = 'AB',
}: AvatarProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return hasImageError ? (
    <View className="border border-black px-4 py-4 rounded-full dark:border-white">
      <Text className="text-base text-center text-black dark:text-white">
        {fallback}
      </Text>
    </View>
  ) : (
    <Image
      className="rounded-full"
      contentFit="cover"
      source={src}
      style={{ width, height }}
      onError={() => setHasImageError(prevState => !prevState)}
    />
  );
}
