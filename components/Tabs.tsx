import React, { ReactNode, createContext, useContext, useState } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}
const TabsContext = createContext<TabsContextProps>({
  activeTab: '',
  setActiveTab: () => {},
});

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}
export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <View className="px-2 py-2">
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        {children}
      </TabsContext.Provider>
    </View>
  );
}

export function TabsList({ children }: { children: ReactNode }) {
  return <View className="flex flex-row justify-center">{children}</View>;
}

interface TabsTriggerProps {
  id: string;
  title: string;
}
export function TabsTrigger({ id, title }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <TouchableOpacity
      className={`px-8 py-3 rounded-md w-1/2 ${
        activeTab === id
          ? 'bg-black dark:bg-white'
          : 'bg-gray-200 dark:bg-gray-800'
      }`}
      onPress={() => setActiveTab(id)}
    >
      <Text
        className={`font-bold text-center ${
          activeTab === id
            ? 'text-white dark:text-black'
            : 'text-gray-400 dark:text-gray-300'
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

interface TabsContent {
  value: string;
  children: ReactNode;
}
export function TabsContent({ value, children }: TabsContent) {
  const { activeTab } = useContext(TabsContext);

  if (value === activeTab)
    return (
      <View className="border border-gray-600 mt-2 px-4 py-4 rounded-xl">
        {children}
      </View>
    );

  return null;
}
