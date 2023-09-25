import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { Variant, VariantStyles } from '../types';

const baseStyles = 'py-2 px-6 rounded-lg';
const variantStyles: VariantStyles = {
  default: 'bg-black rounded-lg',
  ghost: 'bg-slate-700',
  destructive: 'bg-red-500',
};

// NOTE: passing classnames doesn't work. Gotta work on a hack to compile them here.
export default function CNButton({
  label,
  variant,
}: {
  label: string;
  variant?: Variant;
}) {
  return (
    <TouchableOpacity
      className={`
      ${baseStyles}
      ${variant ? variantStyles[variant] : variantStyles.default}
    `}
    >
      <Text className="text-center text-white text-lg">{label}</Text>
    </TouchableOpacity>
  );
}
