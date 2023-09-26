import { Text, View, useColorScheme } from 'react-native';

import { baseClasses, darkTheme, lightTheme } from '../lib/theme';
import { Variant, VariantStyles } from '../lib/types';

export default function CNBadge({
  label,
  variant,
}: {
  label: string;
  variant?: Variant;
}) {
  const colorScheme = useColorScheme();

  const variantStyles: VariantStyles = {
    default: colorScheme === 'light' ? lightTheme.bgColor : darkTheme.bgColor,
    ghost: 'bg-slate-700',
    destructive: 'bg-red-500',
  };

  return (
    <View
      className={`
      rounded-full
      ${baseClasses}
      ${variant ? variantStyles[variant] : variantStyles.default}
    `}
    >
      <Text className="text-center text-white dark:text-black">{label}</Text>
    </View>
  );
}
