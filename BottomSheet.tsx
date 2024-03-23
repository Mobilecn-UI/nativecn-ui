import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const BottomSheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
const BottomSheet = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <>
      <View style={styles.container}>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          containerStyle={{
            borderWidth: 3,
          }}
        >
          <BottomSheetView style={styles.contentContainer}>
            <BottomSheetTextInput style={styles.input} />
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
    width: '100%',
  },
});

export { BottomSheet };
