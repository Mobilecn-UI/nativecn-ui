import { useState } from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

const defaultContainerClasses = 'flex flex-col gap-1.5';
const defaultLabelClasses = 'text-base text-black dark:text-white';
const defaultInputClasses =
  'border border-gray-700 bg-white py-2.5 px-4 rounded-lg dark:bg-black text-black dark:text-white';

interface InputProps {
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  onChange?: (value: string) => void;
  containerClasses?: string;
  inputClasses?: string;
  labelClasses?: string;
}
export function Input({
  label,
  placeholder,
  keyboardType = 'default',
  value,
  onChange,
  containerClasses = defaultContainerClasses,
  inputClasses = defaultInputClasses,
  labelClasses = defaultLabelClasses,
}: InputProps) {
  const [text, onChangeText] = useState('');

  return (
    <View className={containerClasses}>
      {label && <Text className={labelClasses}>{label}</Text>}
      <TextInput
        className={inputClasses}
        keyboardType={keyboardType}
        onChangeText={onChange || onChangeText}
        placeholder={placeholder}
        value={value || text}
      />
    </View>
  );
}
