import { Text, View, useColorScheme } from 'react-native';

import { Variant, VariantStyles } from '../lib/types';

const defaultContainerClasses = 'px-2 py-1 rounded-full';
const defaultLabelClasses =
  'font-medium text-center text-xs text-white dark:text-black';

interface BadgeProps {
  label: string;
  containerClasses?: string;
  labelClasses?: string;
  variant?: Variant;
}
export function Badge({
  label,
  containerClasses = defaultContainerClasses,
  labelClasses = defaultLabelClasses,
  variant = 'default',
}: BadgeProps) {
  const colorScheme = useColorScheme();

  const variantStyles: VariantStyles = {
    default: colorScheme === 'light' ? 'bg-black' : 'bg-white',
    secondary: 'bg-gray-500',
    destructive: 'bg-red-500',
    success: 'bg-green-500',
  };

  // Only apply variant style if the containerClasses default has been overwritten.
  return (
    <View
      className={`${containerClasses} ${
        containerClasses === defaultContainerClasses && variantStyles[variant]
      }`}
    >
      <Text className={labelClasses}>{label}</Text>
    </View>
  );
}
