import { View } from 'react-native';

import CNButton from './components/CNButton';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center ">
      <View className="flex gap-4">
        <CNButton label="Default" />
        <CNButton label="Ghost" variant="ghost" />
        <CNButton label="Destructive" variant="destructive" />
      </View>
    </View>
  );
}
