import { Text, TouchableOpacity, useColorScheme } from 'react-native';

import { baseClasses, darkTheme, lightTheme } from '../lib/theme';
import { Variant, VariantStyles } from '../lib/types';

// NOTE: pass classnames using https://www.nativewind.dev/api/StyledComponent
export default function CNButton({
  label,
  variant,
}: {
  label: string;
  variant?: Variant;
}) {
  const colorScheme = useColorScheme();

  // NOTE: can't use dark: here :(
  const variantStyles: VariantStyles = {
    default: colorScheme === 'light' ? lightTheme.bgColor : darkTheme.bgColor,
    ghost: 'bg-slate-700',
    destructive: 'bg-red-500',
  };

  return (
    <TouchableOpacity
      className={`
      rounded-lg
      ${baseClasses}
      ${variant ? variantStyles[variant] : variantStyles.default}
    `}
    >
      <Text className="text-center text-base text-white dark:text-black">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
