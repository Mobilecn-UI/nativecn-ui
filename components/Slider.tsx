import { useState } from 'react';
import { Text, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { cn } from '../lib/utils';

interface SliderProps {
  minimumValue: number;
  maximumValue: number;
  value: number;
  onValueChange?: any;
  thumbVisible?: boolean;
}

function Slider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  thumbVisible = true,
}: SliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);

  const calcPosition = (v: number) =>
    (sliderWidth * v) / (maximumValue - minimumValue);

  const translationX = useSharedValue(0);
  translationX.value = calcPosition(value);

  const prevTranslationX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));

  const panGesture = Gesture.Pan()
    .minDistance(1)
    .onStart(event => {
      //console.log(event),
      prevTranslationX.value = calcPosition(value);
    })
    .onUpdate(event => {
      const positionValue = !onValueChange
        ? calcPosition(value)
        : prevTranslationX.value + event.translationX;
      // creates a limitation for the element
      translationX.value = Math.min(Math.max(positionValue, 0), sliderWidth);
      const calcReturn =
        ((maximumValue - minimumValue) * translationX.value) / sliderWidth;
      onValueChange?.(calcReturn);
    })
    .runOnJS(true);

  return (
    <>
      <GestureHandlerRootView style={{ width: '100%' }}>
        <GestureDetector gesture={panGesture}>
          <View
            onLayout={e => setSliderWidth(e.nativeEvent.layout.width)}
            className={cn(
              'mx-3 h-2 rounded-xl w-auto bg-foreground/20 justify-center'
            )}
          >
            <View
              className={cn(
                'h-2 rounded-xl bg-foreground absolute',
                value === maximumValue ? null : 'rounded-r-none'
              )}
              style={{ width: calcPosition(value) }}
            />
            <Animated.View
              style={[animatedStyles]}
              className={cn(
                'h-6 w-6 -mx-3 rounded-full bg-background border border-foreground',
                thumbVisible ? '' : 'opacity-0'
              )}
            />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <View style={{ marginVertical: 40, backgroundColor: 'red' }}>
        <Text>sliderWidth:{sliderWidth}</Text>
        <Text>value:{value}</Text>
        <Text>translationX.value:{translationX.value}</Text>
        <Text>prevTranslationX.value:{prevTranslationX.value}</Text>
      </View>
    </>
  );
}

export { Slider };
