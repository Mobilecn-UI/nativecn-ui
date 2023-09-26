import { useState } from 'react';
import { Image } from 'expo-image';
import { Text, View, useColorScheme } from 'react-native';

interface AvatarProps {
  src: string;
  width?: number;
  height?: number;
  fallback?: string;
}
export default function Avatar({
  src,
  width = 50,
  height = 50,
  fallback = 'AB',
}: AvatarProps) {
  const colorScheme = useColorScheme();
  const [hasImageError, setHasImageError] = useState(false);
  const textColor = colorScheme === 'light' ? 'text-black' : 'text-white';

  return (
    <View>
      {hasImageError ? (
        <View className={`px-4 py-4 rounded-full border-white border`}>
          <Text className={`text-base text-center ${textColor}`}>
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
      )}
    </View>
  );
}
