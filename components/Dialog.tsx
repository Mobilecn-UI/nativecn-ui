import { cloneElement, createContext, useContext, useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';

interface DialogContextType {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

function Dialog({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <DialogContext.Provider value={{ visible, setVisible }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children }: any) {
  const { setVisible } = useDialog();

  return cloneElement(children, { onPress: () => setVisible(true) });
}

function DialogContent({ children }: { children: React.ReactNode }) {
  const { visible, setVisible } = useDialog();

  return (
    <Modal
      transparent
      animationType="fade"
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
}

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

export { Dialog, DialogTrigger, DialogContent, useDialog };
