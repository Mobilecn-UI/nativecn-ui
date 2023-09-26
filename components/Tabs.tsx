import React, { useState } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";

const Tabs = ({ children }: any) => (
  <View className="flex-1 gap-2">{children}</View>
);

const TabsList = ({ children }: any) => (
  <View className="m-2 flex-row  items-center justify-center rounded-md  ">
    {children}
  </View>
);

const TabsTrigger = ({ title, setActiveTab, id, activeTab }: any) => (
  <TouchableOpacity
    className={`px-14 py-3 ${
      activeTab === id
        ? "bg-black dark:bg-white"
        : "bg-gray-200 dark:bg-gray-700"
    } rounded-md m-2 `}
    onPress={() => setActiveTab(id)}
  >
    <Text
      className={`${
        activeTab === id
          ? "text-white dark:text-black"
          : "text-gray-400 dark:text-gray-500"
      } font-bold`}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const TabsContent = ({ activeTab, children }: any) => (
  <View className="flex-1 p-4">
    {React.Children.toArray(children)[activeTab]}
  </View>
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
