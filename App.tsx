import { View, useColorScheme } from 'react-native';

import CNButton from './components/CNButton';
import CNBadge from './components/CNBadge';

const lightTheme = 'bg-white';
const darkTheme = 'bg-black';

export default function App() {
  const colorScheme = useColorScheme();
  const containerClasses = colorScheme === 'light' ? lightTheme : darkTheme;

  return (
    <View
      className={`flex-1 items-center justify-center gap-y-4 ${containerClasses}`}
    >
      <View className="flex flex-row">
        <CNButton label="Button" />
        <CNButton label="Button" variant="ghost" />
        <CNButton label="Button" variant="destructive" />
      </View>
      <View className="flex flex-row space-x-2">
        <CNBadge label="Badge" />
        <CNBadge label="Badge" variant="ghost" />
        <CNBadge label="Badge" variant="destructive" />
      </View>
    </View>
  );
}
