import { Text, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '../lib/utils';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange?: any;
}

const END_POSITION = 200;

function Slider({ min, max, value, onChange }: SliderProps) {
  const onLeft = useSharedValue(true);
  const position = useSharedValue(value);

  const pan = Gesture.Pan()
    .onUpdate(e => {
      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = value + e.translationX;
      }
    })
    .onEnd(e => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        onLeft.value = false;
      } else {
        position.value = withTiming(0, { duration: 100 });
        onLeft.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        className={cn(
          'mx-3 h-2 rounded-xl w-auto bg-foreground/20 justify-center'
        )}
      >
        <GestureDetector gesture={pan}>
          <Animated.View className={cn()} style={[animatedStyle]}>
            <View
              className={cn(
                'h-6 w-6 -mx-3 rounded-full bg-background border border-foreground'
              )}
            />
          </Animated.View>
        </GestureDetector>
      </View>
      <Text className="color-red-600">{(100 / (max - min)) * value}</Text>
    </GestureHandlerRootView>
  );
}

export { Slider };
