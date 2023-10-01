import { useState } from 'react';

import { Alert, ScrollView, Text, View } from 'react-native';

import { styled } from 'nativewind';

import { Avatar } from './components/Avatar';
import { Badge } from './components/Badge';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/Tabs';
import { ToastProvider, useToast } from './components/ToastContext';

const StyledView = styled(View);

const TestToastContent = () => {
  const { addToast } = useToast();

  return (
    <View className="flex justify-center items-center mt-[-10]">
      <Button
        label="Toast"
        onPress={() => addToast('Successfully added toast', 'default')}
      />
    </View>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: 'Tab 1' },
    { id: 1, title: 'Tab 2' },
  ];
  return (
    <ToastProvider>
      <View style={{ flex: 1 }}>
        <ScrollView className="flex-1 py-10 px-10 dark:bg-black">
          <Text className="mb-6 text-3xl underline dark:text-white">
            nativecn-ui
          </Text>
          <StyledView className="flex gap-y-4">
            <View className="flex gap-2">
              <Text className="font-semibold text-xl dark:text-white">
                Avatar
              </Text>
              <StyledView className="flex justify-center flex-row space-x-4">
                <View>
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/1706762093876453376/_d_KcNjw_400x400.jpg"
                    fallback="CGM"
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
            <View className="flex gap-2">
              <Text className="font-semibold text-xl dark:text-white">
                Badge
              </Text>
              <StyledView className="flex flex-row space-x-2">
                <View>
                  <Badge label="Badge" />
                </View>
                <View>
                  <Badge label="Badge" variant="secondary" />
                </View>
                <View>
                  <Badge label="Badge" variant="destructive" />
                </View>
                <View>
                  <Badge
                    label="Badge"
                    containerClasses="px-2 py-1 rounded-full bg-amber-400"
                  />
                </View>
                <View>
                  <Badge label="Badge" variant="success" />
                </View>
              </StyledView>
            </View>
            <View className="flex gap-2">
              <Text className="font-semibold text-xl dark:text-white">
                Button
              </Text>
              <StyledView className="flex flex-row space-x-2">
                <View>
                  <Button
                    label="Button"
                    onPress={() => Alert.alert('Pressed 1')}
                  />
                </View>
                <View>
                  <Button
                    label="Button"
                    variant="secondary"
                    onPress={() => Alert.alert('Pressed 2')}
                  />
                </View>
                <View>
                  <Button
                    label="Button"
                    variant="destructive"
                    onPress={() => Alert.alert('Pressed 3')}
                  />
                </View>
              </StyledView>
            </View>
            <View className="flex gap-2">
              <Text className="font-semibold text-xl dark:text-white">
                Card
              </Text>
              <View>
                <Card
                  title="Accelerate UI"
                  description="Enter a new development experience"
                  content="Sleek, easy to use components to build your next app faster."
                  footer="Inspired by shadcn/ui"
                />
              </View>
            </View>
            <View className="flex gap-2">
              <Text className="font-semibold text-xl dark:text-white">
                Tabs
              </Text>
              <Tabs>
                <TabsList>
                  {tabs.map(tab => (
                    <TabsTrigger
                      key={tab.id}
                      id={tab.id}
                      title={tab.title}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  ))}
                </TabsList>
                <TabsContent activeTab={activeTab}>
                  <Text className="text-black dark:text-white">
                    Tab 1 content
                  </Text>
                  <Text className="text-black dark:text-white">
                    Tab 2 content
                  </Text>
                </TabsContent>
              </Tabs>
            </View>
          </StyledView>
          <TestToastContent />
        </ScrollView>
      </View>
    </ToastProvider>
  );
}
