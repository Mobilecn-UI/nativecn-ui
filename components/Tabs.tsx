import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

export function Tabs({ children }: any) {
  return <View className="flex-1 gap-2">{children}</View>;
}

export function TabsList({ children }: any) {
  return (
    <View className="m-2 flex-row  items-center justify-center rounded-md">
      {children}
    </View>
  );
}

interface TabsTriggerProps {
  id: number;
  title: string;
  activeTab: number;
  setActiveTab: (id: number) => void;
}
export function TabsTrigger({
  id,
  title,
  activeTab,
  setActiveTab,
}: TabsTriggerProps) {
  return (
    <TouchableOpacity
      className={`px-14 py-3 ${
        activeTab === id
          ? 'bg-black dark:bg-white'
          : 'bg-gray-200 dark:bg-gray-700'
      } rounded-md m-2 `}
      onPress={() => setActiveTab(id)}
    >
      <Text
        className={`${
          activeTab === id
            ? 'text-white dark:text-black'
            : 'text-gray-400 dark:text-gray-500'
        } font-bold`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function TabsContent({ activeTab, children }: any) {
  return (
    <View className="flex-1 px-2 py-3">
      {React.Children.toArray(children)[activeTab]}
    </View>
  );
}
