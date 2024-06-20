/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
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
  step?: number;
}

function Slider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
}: SliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);

  const calcPosition = (sliderWidth * value) / (maximumValue - minimumValue);
  const translationX = useSharedValue<number>(calcPosition);
  const prevTranslationX = useSharedValue<number>(translationX.value);
  useEffect(() => {}, [sliderWidth]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));

  const panGesture = Gesture.Pan()
    .minDistance(0)
    .onStart(() => {
      translationX.value = calcPosition;
      prevTranslationX.value = translationX.value;
    })
    .onUpdate(event => {
      // creates a limitation for the element
      const positionValue = prevTranslationX.value + event.translationX;
      translationX.value = Math.min(Math.max(positionValue, 0), sliderWidth);

      const calcReturn =
        ((maximumValue - minimumValue) * translationX.value) / sliderWidth;
      onValueChange?.(calcReturn.toFixed(0));
      //console.log(translationX.value, sliderWidth);
    })
    .runOnJS(true);

  return (
    <>
      <GestureHandlerRootView style={{ width: '100%' }}>
        <View
          onLayout={e => setSliderWidth(e.nativeEvent.layout.width)}
          className={cn(
            'mx-3 h-2 rounded-xl w-auto bg-foreground/20 justify-center'
          )}
        >
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[animatedStyles]}
              className={cn(
                'h-6 w-6 -mx-3 rounded-full bg-background border border-foreground'
              )}
            />
          </GestureDetector>
        </View>
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
