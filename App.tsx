import { Text, View } from "react-native";
import { styled } from "nativewind";

import Avatar from "./components/Avatar";
import Button from "./components/Button";
import Badge from "./components/Badge";
import Card from "./components/Card";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/Tabs";
import { useState } from "react";

const StyledView = styled(View);

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: "Tab 1" },
    { id: 1, title: "Tab 2" },
  ];
  return (
    <StyledView className="flex-1 py-20 px-10 dark:bg-black">
      <Text className="mb-2 text-3xl underline dark:text-white">
        nativecn-ui
      </Text>

      <Tabs>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              title={tab.title}
              setActiveTab={setActiveTab}
              id={tab.id}
              activeTab={activeTab}
            />
          ))}
        </TabsList>
        <TabsContent activeTab={activeTab}>
          <View>
            <Text className="text-black dark:text-white">Tab 1 content</Text>
          </View>
          <View>
            <Text className="text-black dark:text-white">Tab 2 content</Text>
          </View>
        </TabsContent>
      </Tabs>

      <View>
        <View className="flex gap-2">
          <Text className="font-semibold text-xl dark:text-white">Avatar</Text>
          <StyledView className="flex justify-center flex-row space-x-4">
            <View>
              <Avatar
                src="https://pbs.twimg.com/profile_images/1635394124579999745/oJs7VJ3J_400x400.jpg"
                fallback="CG"
              />
            </View>
            <View>
              <Avatar
                src="https://pbs.twimg.com/profile_images/1603610343905058816/PsPEWMOJ_400x400.jpg"
                fallback="SS"
              />
            </View>
          </StyledView>
        </View>
      </View>

      <View className="mt-10">
        <View className="flex gap-2">
          <Text className="font-semibold text-xl dark:text-white">Badge</Text>
          <StyledView className="flex flex-row space-x-2">
            <View>
              <Badge label="Badge" />
            </View>
            <View>
              <Badge label="Badge" variant="ghost" />
            </View>
            <View>
              <Badge label="Badge" variant="destructive" />
            </View>
          </StyledView>
        </View>

        <View className="flex gap-2 mt-4">
          <Text className="font-semibold text-xl dark:text-white">Button</Text>
          <StyledView className="flex flex-row space-x-2">
            <View>
              <Button label="Button" />
            </View>
            <View>
              <Button label="Button" variant="ghost" />
            </View>
            <View>
              <Button label="Button" variant="destructive" />
            </View>
          </StyledView>
        </View>

        <View className="flex gap-2 mt-4">
          <Text className="font-semibold text-xl dark:text-white">Card</Text>
          <View>
            <Card
              title="Accelerate UI"
              description="Enter a new development experience"
              content="Sleek, easy to use components to build your next mobile app faster. Inspired by the legendary shadcn/ui."
            />
          </View>
        </View>
      </View>
    </StyledView>
  );
}
