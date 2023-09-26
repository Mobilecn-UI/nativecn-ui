import { Text, View, useColorScheme } from 'react-native';
import React from 'react';

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
  const textClasses =
    colorScheme === 'light' ? lightTheme.textColor : darkTheme.textColor;

  return (
    <View
      className={`
      rounded-full
      ${baseClasses}
      ${variant ? variantStyles[variant] : variantStyles.default}
    `}
    >
      <Text className={`text-center ${textClasses}`}>{label}</Text>
    </View>
  );
}
