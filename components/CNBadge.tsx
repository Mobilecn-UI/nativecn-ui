import { Text, View } from 'react-native';
import React from 'react';

import { Variant, VariantStyles } from '../types';

const baseStyles = 'py-2 px-6 rounded-full';
const variantStyles: VariantStyles = {
  default: 'bg-black',
  ghost: 'bg-slate-700',
  destructive: 'bg-red-500',
};

export default function CNBadge({
  label,
  variant,
}: {
  label: string;
  variant?: Variant;
}) {
  return (
    <View
      className={`
      ${baseStyles}
      ${variant ? variantStyles[variant] : variantStyles.default}
    `}
    >
      <Text className="text-white">{label}</Text>
    </View>
  );
}
