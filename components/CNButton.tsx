import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

const variantStyles: { [key: string]: string } = {
  default: 'bg-black rounded-lg',
  ghost: 'bg-stone-900',
  // outline: 'bg-white-500 text-black',
};

// TODO: make variant type an enum
// NOTE: passing classnames doesn't work. Gotta work on a hack to compile them here.
export default function CNButton({
  label,
  variant,
}: {
  label: string;
  variant: string;
}) {
  return (
    <TouchableOpacity
      className={`
      py-2 px-6
      ${variantStyles.default}
      ${variantStyles[variant]}
    `}
    >
      <Text className="text-white text-lg">{label}</Text>
    </TouchableOpacity>
  );
}
