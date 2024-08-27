import React, { useRef, useState } from 'react';
import {
  FlatList,
  LayoutRectangle,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { cn } from '../lib/utils';

export interface ISelectedOption {
  label: string;
  option: string;
}

export interface ISelectedOptionsArray {
  options?: ISelectedOption[];
}

export type ISelectedValue = string | number | undefined;

export interface SelectProps {
  label?: string;
  labelClasses?: string;
  selectClasses?: string;
  options: { label: string; value: string | number }[];
  onSelect: (value: string | number) => void;
  selectedValue?: string | number;
  placeholder?: string;
}

export const Select = ({
  label,
  labelClasses,
  selectClasses,
  options,
  onSelect,
  selectedValue,
  placeholder = 'Select an option',
}: SelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] =
    useState<LayoutRectangle | null>(null);
  const selectButtonRef = useRef<TouchableOpacity>(null);

  const handleSelect = (value: string | number) => {
    onSelect(value);
    setIsDropdownOpen(false);
  };

  const openDropdown = () => {
    selectButtonRef.current?.measure((_fx, _fy, _w, _h, px, py) => {
      setDropdownPosition({
        x: px,
        y: py + _h,
        width: _w,
        height: _h,
      });
      setIsDropdownOpen(true);
    });
  };

  return (
    <View className={cn('flex flex-col gap-1.5')}>
      {label && <Text className={cn('text-base', labelClasses)}>{label}</Text>}
      <TouchableOpacity
        ref={selectButtonRef}
        className={cn(
          selectClasses,
          'border border-input py-2.5 px-4 rounded-lg bg-white'
        )}
        onPress={openDropdown}
      >
        <Text className="text-primary">
          {selectedValue
            ? options.find(option => option.value === selectedValue)?.label
            : placeholder}
        </Text>
      </TouchableOpacity>

      {/* Dropdown modal */}
      {isDropdownOpen && dropdownPosition && (
        <Modal visible={isDropdownOpen} transparent animationType="none">
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setIsDropdownOpen(false)}
          >
            {/* TODO: change this to tailwind */}
            <View
              style={{
                position: 'absolute',
                top: dropdownPosition.y,
                left: dropdownPosition.x,
                width: dropdownPosition.width,
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 8,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <FlatList
                data={options}
                keyExtractor={item => item.value.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.value)}
                    className="p-2 border-b border-gray-200"
                  >
                    <Text className="text-primary">{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};