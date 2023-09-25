import { View } from 'react-native';

import CNButton from './components/CNButton';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center ">
      <CNButton label="Button" variant="ghost" />
    </View>
  );
}
