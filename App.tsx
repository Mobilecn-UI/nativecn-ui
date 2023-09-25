import { View } from 'react-native';

import CNButton from './components/CNButton';
import CNBadge from './components/CNBadge';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center gap-y-4">
      <View className="flex flex-row">
        <CNButton label="Button" />
        <CNButton label="Button" variant="ghost" />
        <CNButton label="Button" variant="destructive" />
      </View>
      <View className="flex flex-row">
        <CNBadge label="Badge" />
        <CNBadge label="Badge" variant="ghost" />
        <CNBadge label="Badge" variant="destructive" />
      </View>
    </View>
  );
}
