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

  const translationX = useSharedValue(calcPosition);
  const prevTranslationX = useSharedValue(translationX.value);
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
      <Text style={{ color: 'red', marginTop: 20 }}>{value}</Text>
    </>
  );
}

export { Slider };

// import { useState, useRef, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   animate,
// } from 'react-native-reanimated';
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';

// export default function CustomSlider({
//   value,
//   onValueChange,
//   minimumValue = 0,
//   maximumValue = 100,
//   step = 1,
// }) {
//   const [sliderWidth, setSliderWidth] = useState(0);

//   var calcPosition = (sliderWidth * value) / (maximumValue - minimumValue);

//   const translationX = useSharedValue(calcPosition);
//   const prevTranslationX = useSharedValue(translationX.value);
//   useEffect(() => {}, [sliderWidth]);

//   const animatedStyles = useAnimatedStyle(() => ({
//     transform: [{ translateX: translationX.value }],
//   }));

//   const panGesture = Gesture.Pan()
//     .minDistance(1)
//     // .onStart(() => {
//     //   translationX.value = calcPosition;
//     //   prevTranslationX.value = translationX.value;
//     // })
//     .onUpdate((event) => {
//       // creates a limitation for the element
//       var positionValue = !onValueChange
//         ? calcPosition
//         : prevTranslationX.value + event.translationX;

//       translationX.value = Math.min(Math.max(positionValue, 0), sliderWidth);

//       var calcReturn =
//         ((maximumValue - minimumValue) * translationX.value) / sliderWidth;
//       onValueChange?.(calcReturn);
//       //console.log(translationX.value, sliderWidth);
//     })
//     .runOnJS(true);

//   return (
//     <GestureHandlerRootView style={{ width: '100%' }}>
//       <View
//         onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
//         style={{
//           backgroundColor: '#333',
//           width: '100%',
//           height: 5,
//           borderRadius: 10,
//           justifyContent: 'center',
//         }}>
//         <GestureDetector gesture={panGesture}>
//           <Animated.View
//             style={[
//               {
//                 width: 20,
//                 height: 20,
//                 backgroundColor: '#f00',
//                 borderRadius: 10,
//                 marginLeft: -10,
//               },
//               animatedStyles,
//             ]}
//           />
//         </GestureDetector>
//       </View>
//     </GestureHandlerRootView>
//   );
// }
