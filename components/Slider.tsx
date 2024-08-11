import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  onValueChange?: (value: number) => void;
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

  const calcPosition = useMemo(() => {
    return (v: number) =>
      (sliderWidth * (v - minimumValue)) / (maximumValue - minimumValue);
  }, [sliderWidth, maximumValue, minimumValue]);

  const translationX = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const isDragging = useSharedValue(false);

  useEffect(() => {
    translationX.value = calcPosition(value);
  }, [value, calcPosition]);

  const debounceOnValueChange = useCallback(
    debounce((value: number) => {
      if (onValueChange) onValueChange(value);
    }, 100),
    [onValueChange]
  );

  useEffect(() => {
    return () => debounceOnValueChange.cancel();
  }, [debounceOnValueChange]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
          prevTranslationX.value = calcPosition(value);
          isDragging.value = true;
        })
        .onUpdate(event => {
          const positionValue = prevTranslationX.value + event.translationX;
          translationX.value = Math.min(
            Math.max(positionValue, 0),
            sliderWidth
          );
          const calcReturn =
            ((maximumValue - minimumValue) * translationX.value) / sliderWidth;

          if (onValueChange) debounceOnValueChange(calcReturn);
        })
        .onEnd(() => {
          isDragging.value = false;
        })
        .runOnJS(true),
    [calcPosition, sliderWidth, value, debounceOnValueChange]
  );

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));
  const sizeAnimatedStyles = useAnimatedStyle(() => ({
    width: translationX.value,
  }));

  return (
    <>
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
                thumbVisible ? '' : ' bg-transparent border-transparent'
              )}
            />
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
      {/* Debugging info - remove or hide in production */}
      <View style={{ marginVertical: 40, backgroundColor: 'red' }}>
        <Text>sliderWidth:{sliderWidth.toFixed(2)}</Text>
        <Text>value:{value.toFixed(2)}</Text>
        <Text>max:{maximumValue}</Text>
        <Text>translationX.value:{translationX.value.toFixed(2)}</Text>
        <Text>prevTranslationX.value:{prevTranslationX.value.toFixed(2)}</Text>
      </View>
    </>
  );
}

export { Slider };
