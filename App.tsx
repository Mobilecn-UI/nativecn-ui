import { View } from 'react-native';

import Avatar from './components/Avatar';
import CNButton from './components/CNButton';
import CNBadge from './components/CNBadge';

import { styled } from 'nativewind';

const StyledView = styled(View);

export default function App() {
  return (
    <StyledView className="flex-1 items-center justify-center gap-y-4 dark:bg-black">
      <StyledView className="space-x-2 flex flex-row">
        <Avatar
          src="https://pbs.twimg.com/profile_images/1635394124579999745/oJs7VJ3J_400x400.jpg"
          fallback="CG"
        />
        <Avatar
          src="https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg"
          fallback="NC"
        />
        <Avatar
          src="https://pbs.twimg.com/profile_images/1603610343905058816/PsPEWMOJ_400x400.jpg"
          fallback="SS"
        />
      </StyledView>

      <StyledView className="flex flex-row">
        <CNButton label="Button" />
        <CNButton label="Button" variant="ghost" />
        <CNButton label="Button" variant="destructive" />
      </StyledView>

      <StyledView className="flex flex-row space-x-2">
        <CNBadge label="Badge" />
        <CNBadge label="Badge" variant="ghost" />
        <CNBadge label="Badge" variant="destructive" />
      </StyledView>
    </StyledView>
  );
}
