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

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

function Slider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  thumbVisible = true,
}: SliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);

  const calcPosition = useCallback(
    (v: number) =>
      (sliderWidth * (v - minimumValue)) / (maximumValue - minimumValue),
    [sliderWidth, minimumValue, maximumValue]
  );

  const translationX = useSharedValue(calcPosition(value));
  const prevTranslationX = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const debounceOnValueChange = useCallback(
    debounce((value: number) => {
      if (onValueChange) onValueChange(value);
    }, 100),
    [onValueChange]
  );

  useEffect(() => {
    translationX.value = calcPosition(value);
    return () => debounceOnValueChange.cancel();
  }, [value, calcPosition, debounceOnValueChange]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(0)
        .onStart(() => {
          prevTranslationX.value = calcPosition(value);
          isDragging.value = true;
        })
        .onUpdate(async event => {
          const positionValue = prevTranslationX.value + event.translationX;
          const clampedPosition = clamp(positionValue, 0, sliderWidth);
          translationX.value = clampedPosition;
        })
        .onEnd(async () => {
          isDragging.value = false;
          const calcReturn =
            ((maximumValue - minimumValue) * translationX.value) / sliderWidth;
          if (onValueChange) await debounceOnValueChange(calcReturn);
        })
        .runOnJS(true),
    [calcPosition, sliderWidth, value, debounceOnValueChange]
  );

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translationX.value }],
    }),
    [translationX]
  );
  const sizeAnimatedStyles = useAnimatedStyle(
    () => ({
      width: translationX.value,
    }),
    [translationX]
  );

  return (
    <>
      <GestureHandlerRootView
        style={{
          height: 20,
          paddingVertical: 18,
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
      {/* <View style={{ marginVertical: 40, backgroundColor: 'red' }}>
        <Text>sliderWidth:{sliderWidth.toFixed(2)}</Text>
        <Text>value:{value.toFixed(2)}</Text>
        <Text>max:{maximumValue}</Text>
        <Text>translationX.value:{translationX.value.toFixed(2)}</Text>
        <Text>prevTranslationX.value:{prevTranslationX.value.toFixed(2)}</Text>
      </View> */}
    </>
  );
}

export { Slider };
