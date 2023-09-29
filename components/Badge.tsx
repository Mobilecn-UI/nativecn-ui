import { Text, View, useColorScheme } from 'react-native';

import { Variant, VariantStyles } from '../lib/types';

export default function Badge({
  label,
  variant,
}: {
  label: string;
  variant?: Variant;
}) {
  const colorScheme = useColorScheme();

  const variantStyles: VariantStyles = {
    default: colorScheme === 'light' ? 'bg-black' : 'bg-white',
    secondary: 'bg-slate-500',
    destructive: 'bg-red-500',
    success: 'bg-green-500',
  };

  return (
    <View
      className={`
      px-3 py-1 rounded-full
      ${variant ? variantStyles[variant] : variantStyles.default}
    `}
    >
      <Text className="font-medium text-center text-xs text-white dark:text-black">
        {label}
      </Text>
    </View>
  );
}
