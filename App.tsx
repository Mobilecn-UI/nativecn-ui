import { View } from 'react-native';
import { styled } from 'nativewind';

import Avatar from './components/Avatar';
import Button from './components/Button';
import Badge from './components/Badge';

const StyledView = styled(View);

export default function App() {
  return (
    <StyledView className="flex-1 items-center justify-center gap-y-8 dark:bg-black">
      <StyledView className="flex flex-row space-x-4">
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

      <StyledView className="flex flex-row space-x-2">
        <View>
          <Badge label="Button" />
        </View>
        <View>
          <Badge label="Button" variant="ghost" />
        </View>
        <View>
          <Badge label="Button" variant="destructive" />
        </View>
      </StyledView>
    </StyledView>
  );
}
