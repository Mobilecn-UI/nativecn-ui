import { useState } from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';

export default function Toggle({
  isEnabled,
  onToggle,
}: {
  isEnabled: boolean;
  onToggle: (state: boolean) => void;
}) {
  const colorScheme = useColorScheme();

  const variantStyles = {
    default: isEnabled
      ? colorScheme === 'light' ? 'bg-black' : 'bg-white'
      : 'bg-gray-500',
  };

  const toggleStyle = {
    default: `translate-x-1 ${colorScheme === 'light' ? 'bg-white' : 'bg-black'}`,
    enabled: `translate-x-7 ${colorScheme === 'light' ? 'bg-white' : 'bg-black'}`,
};


  return (
    <TouchableOpacity
      onPress={() => onToggle(!isEnabled)}
      className={`
        w-16 h-8 rounded-full relative p-1 transition-colors duration-500
        ${variantStyles.default}
      `}
    >
      <View
        className={`
          w-6 h-6 rounded-full absolute top-1 left-1 transform transition-transform duration-500
          ${isEnabled ? toggleStyle.enabled : toggleStyle.default}
        `}
      />
    </TouchableOpacity>
  );
}
