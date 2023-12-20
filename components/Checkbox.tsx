import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { cn } from '../lib/utils';

// TODO: make controlled (optional)
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof View> {
  label?: string;
  checkboxClasses?: string;
  checkedClasses?: string;
  labelClasses?: string;
}
function Checkbox({
  label,
  className,
  checkboxClasses = 'w-5 h-5 border border-gray-700 rounded bg-white flex justify-center items-center dark:bg-black dark:border-gray-200',
  checkedClasses = 'bg-black dark:bg-white',
  labelClasses = 'text-black dark:text-white',
  ...props
}: CheckboxProps) {
  const [isChecked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(prev => !prev);
  };

  return (
    <View
      className={cn('flex flex-row items-center gap-x-2', className)}
      {...props}
    >
      {label && <Text className={labelClasses}>{label}</Text>}
      <TouchableOpacity onPress={toggleCheckbox}>
        <View
          className={cn(checkboxClasses, {
            'bg-black dark:bg-white': isChecked,
          })}
        >
          {isChecked && (
            <Text className="text-white dark:text-black text-xs">✓</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export { Checkbox };
