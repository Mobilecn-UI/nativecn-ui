import { styled } from 'nativewind';
import { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { Avatar } from './components/Avatar';
import { Badge } from './components/Badge';
import { Button } from './components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/Card';
import { Checkbox } from './components/Checkbox';
import { Input } from './components/Input';
import { Skeleton } from './components/Skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/Tabs';
import {
  ToastProvider,
  ToastVariant,
  useToast,
} from './components/ToastContext';

const StyledView = styled(View);

export default function App() {
  const [inputText, onChangeText] = useState('');

  return (
    <ToastProvider position="top">
      <ScrollView className="bg-white dark:bg-black flex-1 py-16 px-10">
        <Text className="mb-2 text-3xl underline dark:text-white">
          nativecn-ui
        </Text>
        <StyledView className="flex gap-y-2">
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
            <Text className="font-semibold text-xl dark:text-white">Badge</Text>
            <StyledView className="flex flex-row space-x-2">
              <Badge label="Badge" />
              <Badge label="Badge" variant="secondary" />
              <Badge label="Badge" variant="destructive" />
              <Badge label="Badge" className="bg-amber-400" />
              <Badge label="Badge" variant="success" />
            </StyledView>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl dark:text-white">
              Button
            </Text>
            <StyledView className="flex flex-row space-x-2">
              <Button label="Button" onPress={() => Alert.alert('Pressed 1')} />
              <Button
                label="Button"
                variant="secondary"
                onPress={() => Alert.alert('Pressed 2')}
              />
              <Button
                label="Button"
                variant="destructive"
                onPress={() => Alert.alert('Pressed 3')}
              />
            </StyledView>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl dark:text-white">Card</Text>
            <View>
              <Card>
                <CardHeader>
                  <CardTitle>Accelerate UI</CardTitle>
                  <CardDescription>
                    Enter a new development experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text className="text-base text-black dark:text-white">
                    Sleek, easy to use components to build your next app faster.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Text className="text-sm text-gray-700 dark:text-gray-400">
                    Inspired by shadcn/ui
                  </Text>
                </CardFooter>
              </Card>
            </View>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl dark:text-white">Input</Text>
            <View>
              <Input
                placeholder="Email"
                value={inputText}
                onChange={onChangeText}
              />
            </View>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl dark:text-white">
              Skeleton
            </Text>
            <View className="flex">
              <Skeleton classes="w-48 h-4 mb-1" />
              <Skeleton classes="w-60 h-4 mb-1" />
              <Skeleton classes="w-36 h-4" />
            </View>
          </View>
          <View>
            <Checkbox label="Checkbox" />
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl dark:text-white">Tabs</Text>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger id="account" title="Account" />
                <TabsTrigger id="password" title="Password" />
              </TabsList>
              <TabsContent value="account">
                <Text className="text-black dark:text-white">
                  Make changes to your account here.
                </Text>
              </TabsContent>
              <TabsContent value="password">
                <Text className="text-black dark:text-white">
                  Change your password here.
                </Text>
              </TabsContent>
            </Tabs>
          </View>
          <View>
            <Text className="font-semibold text-xl dark:text-white">Toast</Text>
            <View className="flex mx-auto mb-32">
              <ExampleToast />
            </View>
          </View>
        </StyledView>
      </ScrollView>
    </ToastProvider>
  );
}

function ExampleToast() {
  const { toast } = useToast();
  const variants: ToastVariant[] = [
    'default',
    'success',
    'destructive',
    'info',
  ];

  return (
    <Button
      label="Toast"
      onPress={() => {
        variants.forEach((variant, index) => {
          setTimeout(() => {
            toast(`${variant} toast`, variant, 3000, 'bottom', true);
          }, index * 1000);
        });
      }}
    />
  );
}
