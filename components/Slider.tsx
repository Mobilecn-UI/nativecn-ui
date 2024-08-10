import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  thumbVisible?: true | false;
}

function Slider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  thumbVisible = true,
}: SliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);

  const calcPosition = useMemo(() => {
    return (v: number) => (sliderWidth * v) / (maximumValue - minimumValue);
  }, [sliderWidth, maximumValue, minimumValue]);

  const translationX = useSharedValue(0);
  translationX.value = calcPosition(value);

  const prevTranslationX = useSharedValue(0);
  const isDragging = useSharedValue(false);

  useEffect(() => {
    translationX.value = calcPosition(value);
  }, [value, calcPosition]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));
  const sizeAnimatedStyles = useAnimatedStyle(() => ({
    width: translationX.value,
  }));

  const debounceOnValueChange = useCallback(debounce(onValueChange, 100), []);

  const panGesture = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = calcPosition(value);
      isDragging.value = true;
    })
    .onUpdate(event => {
      const positionValue = prevTranslationX.value + event.translationX;
      translationX.value = Math.min(Math.max(positionValue, 0), sliderWidth);

      const calcReturn =
        ((maximumValue - minimumValue) * translationX.value) / sliderWidth;
      debounceOnValueChange(calcReturn);
    })
    .onEnd(() => {
      isDragging.value = false;
    })
    .runOnJS(true);

  return (
    <GestureHandlerRootView
      style={{
        backgroundColor: 'red',
        height: 20,
        justifyContent: 'center',
      }}
    >
      <View
        onLayout={e => setSliderWidth(e.nativeEvent.layout.width)}
        className={cn(
          'mx-3 h-2 rounded-xl w-auto bg-foreground/20 justify-center'
        )}
      >
        <Animated.View
          style={sizeAnimatedStyles}
          className={cn(
            'h-2 rounded-l-xl bg-foreground absolute',
            value === maximumValue ? 'rounded-r-xl' : null
          )}
        />
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[animatedStyles]}
            className={cn(
              'h-6 w-6 -mx-3 rounded-full bg-background border border-foreground',
              thumbVisible ? '' : 'opacity-0'
            )}
          />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

export { Slider };
