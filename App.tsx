import { Text, View } from 'react-native';
import { styled } from 'nativewind';

import Avatar from './components/Avatar';
import Button from './components/Button';
import Badge from './components/Badge';

const StyledView = styled(View);

export default function App() {
  return (
    <StyledView className="flex-1 py-20 px-10 gap-y-8 dark:bg-black">
      <Text className="text-3xl underline dark:text-white">nativecn/ui</Text>

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

      <View className="flex gap-2">
        <Text className="font-semibold text-xl dark:text-white">Button</Text>
        <StyledView className="flex justify-center flex-row space-x-2">
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

      <View className="flex gap-2">
        <Text className="font-semibold text-xl dark:text-white">Badge</Text>
        <StyledView className="flex flex-row justify-center space-x-2">
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
    </StyledView>
  );
}
