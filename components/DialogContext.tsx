import React, { createContext, useContext, useState } from 'react';

interface DialogContextType {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

export const DialogProvider = ({ children }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <DialogContext.Provider value={{ visible, setVisible }}>
      {children}
    </DialogContext.Provider>
  );
};
