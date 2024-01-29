// DialogComponent.js
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DialogProvider, useDialog } from './DialogContext';

const DialogComponent = ({ children }: any) => {
  return (
    <DialogProvider>
      <View>{children}</View>
    </DialogProvider>
  );
};

export const DialogTrigger = ({ children }: any) => {
  const { setVisible } = useDialog();

  return React.cloneElement(children, { onPress: () => setVisible(true) });
};

export default DialogComponent;
export const DialogContent = ({ children }: any) => {
  const { visible, setVisible } = useDialog();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <TouchableOpacity
        className="w-full h-full"
        onPress={() => setVisible(false)}
      >
        <View className="flex flex-1 justify-center items-center bg-black/75 ">
          <TouchableOpacity
            className="m-5 bg-white rounded-lg p-6 items-center"
            activeOpacity={1}
          >
            {children}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
