import { Text, TouchableOpacity, useColorScheme } from 'react-native';

import { Variant, VariantStyles } from '../lib/types';

const defaultContainerClasses = 'py-2 px-5 rounded-lg';
const defaultLabelClasses = 'text-base text-center text-white dark:text-black';

interface ButtonProps {
  label: string;
  containerClasses?: string;
  labelClasses?: string;
  variant?: Variant;
  onPress?: () => void;
}
export function Button({
  label,
  containerClasses = defaultContainerClasses,
  labelClasses = defaultLabelClasses,
  variant = 'default',
  onPress = () => undefined,
}: ButtonProps) {
  const colorScheme = useColorScheme();

  const variantStyles: VariantStyles = {
    default: colorScheme === 'light' ? 'bg-black' : 'bg-white',
    secondary: 'bg-gray-500',
    ghost: 'bg-slate-700',
    destructive: 'bg-red-500',
  };

  return (
    <TouchableOpacity
      className={`${containerClasses} ${
        containerClasses === defaultContainerClasses && variantStyles[variant]
      }`}
      onPress={onPress}
    >
      <Text className={labelClasses}>{label}</Text>
    </TouchableOpacity>
  );
}
