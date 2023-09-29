import { Text, TouchableOpacity, useColorScheme } from 'react-native';

import { Variant, VariantStyles } from '../lib/types';

// NOTE: pass classnames using https://www.nativewind.dev/api/StyledComponent
export default function Button({
  label,
  variant,
}: {
  label: string;
  variant?: Variant;
}) {
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
      className={`
      py-2 px-6 rounded-lg
      ${variant ? variantStyles[variant] : variantStyles.default}
    `}
    >
      <Text className="text-center text-base text-white dark:text-black">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
