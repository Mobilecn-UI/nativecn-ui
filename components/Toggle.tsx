import { useState } from 'react';
import { TouchableOpacity, View, useColorScheme } from 'react-native';

export function Toggle({ isEnabled }: { isEnabled: boolean }) {
  const [enabled, setEnabled] = useState(isEnabled);
  const colorScheme = useColorScheme();

  const variantStyles = {
    default: isEnabled
      ? colorScheme === 'light'
        ? 'bg-black'
        : 'bg-white'
      : 'bg-gray-500',
  };

  const toggleStyle = {
    default: `translate-x-1 ${
      colorScheme === 'light' ? 'bg-white' : 'bg-black'
    }`,
    enabled: `translate-x-7 ${
      colorScheme === 'light' ? 'bg-white' : 'bg-black'
    }`,
  };

  return (
    <TouchableOpacity
      onPress={() => setEnabled(!enabled)}
      className={`
        w-16 h-8 rounded-full items-center justify-center flex relative transition-colors duration-500
        ${variantStyles.default}
      `}
    >
      <View
        className={`
          w-6 h-6 rounded-full absolute left-1 transform transition-transform duration-500
          ${enabled ? toggleStyle.enabled : toggleStyle.default}
        `}
      />
    </TouchableOpacity>
  );
}
