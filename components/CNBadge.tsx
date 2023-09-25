import { Text, View } from 'react-native';
import React from 'react';

const baseStyles = 'py-2 px-6 rounded-full';
const variantStyles: { [key: string]: string } = {
  default: 'bg-black',
  ghost: 'bg-slate-700',
  destructive: 'bg-red-500',
};

export default function CNBadge({
  label,
  variant,
}: {
  label: string;
  variant?: string;
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
