/* eslint-disable prettier/prettier */
import { CircleUser, CreditCard, Settings } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Avatar, AvatarFallback, AvatarImage } from './components/Avatar';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleHeader,
} from './components/Collapsible';
import { Dialog, DialogContent, DialogTrigger } from './components/Dialog';
import {
  DropDown,
  DropDownContent,
  DropDownItem,
  DropDownItemSeparator,
  DropDownLabel,
  DropDownTrigger,
} from './components/DropDown';
import { Input } from './components/Input';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
} from './components/RadioGroup';
import { Skeleton } from './components/Skeleton';
import { Switch } from './components/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/Tabs';
import { ToastProvider, ToastVariant, useToast } from './components/Toast';
import './styles/globals.css';

export default function App() {
  const [inputText, onChangeText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <ToastProvider position="top">
      <ScrollView className="bg-background flex-1 py-16 px-10">
        <Text className="mb-2 text-3xl underline text-primary">
          nativecn-ui
        </Text>
        <View className="flex gap-3 mb-8">
          <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">Avatar</Text>
            <View className="flex justify-center items-center flex-row gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1745949238519803904/ZHwM5B07_400x400.jpg',
                  }}
                />
                <AvatarFallback>CG</AvatarFallback>
              </Avatar>
              <Avatar className="h-14 w-14">
                <AvatarImage
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1603610343905058816/PsPEWMOJ_400x400.jpg',
                  }}
                />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
            </View>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">Badge</Text>
            <View className="flex flex-row gap-2">
              <Badge label="Badge" />
              <Badge label="Badge" variant="secondary" />
              <Badge label="Badge" variant="destructive" />
              <Badge label="Badge" className="bg-amber-400 dark:bg-amber-600" />
              <Badge label="Badge" variant="success" />
            </View>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">Button</Text>
            <View className="flex flex-row gap-3">
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
            </View>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">Card</Text>
            <Card>
              <CardHeader>
                <CardTitle>Accelerate UI</CardTitle>
                <CardDescription>
                  Enter a new development experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text className="text-base text-primary">
                  Sleek, easy to use components to build your next app faster.
                </Text>
              </CardContent>
              <CardFooter>
                <Text className="text-sm text-muted-foreground">
                  Inspired by shadcn/ui
                </Text>
              </CardFooter>
            </Card>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">Checkbox</Text>
            <Checkbox label="Accept T&C" />
          </View>

          {/* DropDown ComponentView */}
          <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">DropDown</Text>
            <Text className="text-primary text-base">
              Displays a menu to the user - such as a set of actions of
              functions - triggered by a button
            </Text>

            <View className="rounded-xl border border-border z-50">
              <DropDown>
                <DropDownTrigger>
                  <Button label="Open Dropdown" />
                </DropDownTrigger>
                <DropDownContent>
                  <DropDownLabel labelTitle="My Account" />
                  <DropDownItemSeparator />
                  <DropDownItem>
                    <TouchableOpacity className="flex flex-row gap-2 items-center">
                      <CircleUser size={18} color="#fff" />
                      <Text className="text-primary text-xl">Profile</Text>
                    </TouchableOpacity>
                  </DropDownItem>
                  <DropDownItem>
                    <TouchableOpacity className="flex flex-row gap-2 items-center">
                      <Settings size={18} color="#fff" />
                      <Text className="text-primary text-xl">Settings</Text>
                    </TouchableOpacity>
                  </DropDownItem>
                  <DropDownItem>
                    <TouchableOpacity className="flex flex-row gap-2 items-center">
                      <CreditCard size={18} color="#fff" />
                      <Text className="text-primary text-xl">Billing</Text>
                    </TouchableOpacity>
                  </DropDownItem>
                  <DropDownLabel labelTitle="Team" />
                  <DropDownItemSeparator />
                  <DropDownItem>
                    <TouchableOpacity className="flex flex-row gap-2 items-center">
                      <CreditCard size={18} color="#fff" />
                      <Text className="text-primary text-xl">Billing</Text>
                    </TouchableOpacity>
                  </DropDownItem>
                </DropDownContent>
              </DropDown>
            </View>
          </View>

          {/* Dialog ComponentView */}
          <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">Dialog</Text>
            <Dialog>
              <DialogTrigger>
                <Button label="Open Dialog" />
              </DialogTrigger>
              <DialogContent>
                <View className="flex gap-4">
                  <Text className="font-semibold text-xl text-primary">
                    Dialog Content
                  </Text>
                  <Text className="text-primary">
                    Tap outside the dialog to close it.
                  </Text>
                </View>
              </DialogContent>
            </Dialog>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">Input</Text>
            <View>
              <Input
                placeholder="Email"
                value={inputText}
                onChangeText={onChangeText}
              />
            </View>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">
              Radio Group
            </Text>
            <RadioGroup defaultValue="dark">
              <RadioGroupItem value="light" label="Light" />
              <RadioGroupItem value="dark" label="Dark" />
              <View className="flex flex-row items-center gap-2">
                <RadioGroupItem value="system" />
                <RadioGroupLabel value="system">
                  <AvatarImage
                    className="h-8 w-8 rounded-full"
                    source={{
                      uri: 'https://avatars.githubusercontent.com/u/75042455?s=200&v=4',
                    }}
                  />
                </RadioGroupLabel>
              </View>
            </RadioGroup>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">Skeleton</Text>
            <View className="flex">
              <Skeleton className="w-48 h-4 mb-1" />
              <Skeleton className="w-60 h-4 mb-1" />
              <Skeleton className="w-56 h-4 mb-1" />
              <Skeleton className="w-36 h-4" />
            </View>
          </View>
          <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">Switch</Text>
            <View className="flex">
              <Switch onValueChange={setIsEnabled} value={isEnabled} />
            </View>
          </View>
          <View className="flex gap-2 mt-1">
            <Text className="font-semibold text-xl text-primary">Tabs</Text>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account" title="Account" />
                <TabsTrigger value="password" title="Password" />
              </TabsList>
              <TabsContent value="account">
                <Text className="text-primary">
                  Make changes to your account here.
                </Text>
              </TabsContent>
              <TabsContent value="password">
                <Text className="text-primary">Change your password here.</Text>
              </TabsContent>
            </Tabs>
          </View>
          <View>
            <Text className="font-semibold text-xl dark:text-white">Toast</Text>
            <View className="flex mx-auto mb-32">
              <ExampleToast />
            </View>
          </View>
          <View>
            <Text className="font-semibold text-xl dark:text-white mb-5">
              Collapsible
            </Text>
            <View className="flex mx-auto mb-16">
              <Collapsible>
                <CollapsibleHeader>
                  <View className="p-3 rounded-full bg-primary">
                    <Text className="font-semibold text-xl text-white">
                      Collapsible
                    </Text>
                  </View>
                </CollapsibleHeader>
                <CollapsibleContent>
                  <View className="bg-primary p-3 rounded-md">
                    <Text className="font-semibold text-xl text-white">
                      Lorem ipsum dolor sit amet. Vel maxime repudiandae aut
                      delectus neque eos excepturi exercitationem ut sapiente
                      voluptates ex fugit ullam.
                    </Text>
                  </View>
                  <View className="bg-primary p-3 rounded-md">
                    <Text className="font-semibold text-xl text-white">
                      Lorem ipsum dolor sit amet. Vel maxime repudiandae aut
                      delectus neque eos excepturi exercitationem ut sapiente
                      voluptates ex fugit ullam.
                    </Text>
                  </View>
                </CollapsibleContent>
              </Collapsible>
            </View>
          </View>
        </View>
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
