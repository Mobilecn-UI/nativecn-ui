import { Text, TouchableOpacity, useColorScheme } from 'react-native';

import { Variant, VariantStyles } from '../lib/types';

interface ButtonProps {
  label: string;
  variant?: Variant;
  onPress?: () => void;
}
// NOTE: pass classnames using https://www.nativewind.dev/api/StyledComponent
export function Button({
  label,
  variant = 'default',
  onPress = () => undefined,
}: ButtonProps) {
  const colorScheme = useColorScheme();

  // NOTE: can't use dark: here :(
  const variantStyles: VariantStyles = {
    default: colorScheme === 'light' ? 'bg-black' : 'bg-white',
    secondary: 'bg-slate-500',
    ghost: 'bg-slate-700',
    destructive: 'bg-red-500',
  };

  return (
    <TouchableOpacity
      className={`py-2 px-6 rounded-lg ${variantStyles[variant]}`}
      onPress={onPress}
    >
      <Text className="text-base text-center text-white dark:text-black">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
