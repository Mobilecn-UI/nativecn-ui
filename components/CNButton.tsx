import { Text, TouchableOpacity, useColorScheme } from 'react-native';
import React from 'react';

import { baseClasses, darkTheme, lightTheme } from '../lib/theme';
import { Variant, VariantStyles } from '../lib/types';

// NOTE: passing classnames doesn't work. Gotta work on a hack to compile them here.
export default function CNButton({
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
  // NOTE: may not be the best wa
  const textClasses =
    colorScheme === 'light' ? lightTheme.textColor : darkTheme.textColor;

  return (
    <TouchableOpacity
      className={`
      rounded-lg
      ${baseClasses}
      ${variant ? variantStyles[variant] : variantStyles.default}
    `}
    >
      <Text className={`text-center text-lg ${textClasses}`}>{label}</Text>
    </TouchableOpacity>
  );
}
