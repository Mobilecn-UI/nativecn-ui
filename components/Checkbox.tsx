import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const defaultContainerClasses = 'flex flex-row items-center gap-2';
const defaultCheckboxClasses =
  'w-5 h-5 border border-gray-700 rounded bg-black flex justify-center items-center dark:bg-white dark:border-gray-200';
const defaultCheckedClasses = 'bg-black dark:bg-white ';
const defaultLabelClasses = ' text-black dark:text-white';

interface CheckboxProps {
  label?: string;
  containerClasses?: string;
  checkboxClasses?: string;
  checkedClasses?: string;
  labelClasses?: string;
}

export const Checkbox = ({
  label,
  containerClasses = defaultContainerClasses,
  checkboxClasses = defaultCheckboxClasses,
  checkedClasses = defaultCheckedClasses,
  labelClasses = defaultLabelClasses,
}: CheckboxProps) => {
  const [isChecked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!isChecked);
  };

  return (
    <View className={containerClasses}>
      {label && <Text className={labelClasses}>{label}</Text>}
      <TouchableOpacity onPress={toggleCheckbox}>
        <View
          className={`${checkboxClasses} ${
            isChecked ? checkedClasses : 'bg-white dark:bg-black'
          }`}
        >
          {isChecked && (
            <Text className="text-white dark:text-black text-xs">✓</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
