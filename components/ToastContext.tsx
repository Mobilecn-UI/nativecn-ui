import React, { createContext, useContext, useState } from 'react';
import { View } from 'react-native';

import { Toast, toastVariants } from './Toast';

export type ToastVariant = keyof typeof toastVariants;

interface ToastMessage {
  id: number;
  text: string;
  variant: ToastVariant;
  duration?: number;
  position?: string;
  showProgress?: boolean;
}
interface ToastContextProps {
  toast: (
    message: string,
    variant?: keyof typeof toastVariants,
    duration?: number,
    position?: 'top' | 'bottom',
    showProgress?: boolean
  ) => void;
  removeToast: (id: number) => void;
}
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// TODO: refactor to pass position to Toast instead of ToastProvider
export function ToastProvider({
  children,
  position = 'top',
}: {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const toast: ToastContextProps['toast'] = (
    message: string,
    variant: ToastVariant = 'default',
    duration: number = 3000,
    position: 'top' | 'bottom' = 'top',
    showProgress: boolean = true
  ) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: message,
        variant,
        duration,
        position,
        showProgress,
      },
    ]);
  };

  const removeToast = (id: number) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <View
        className={`absolute ${
          position === 'top' ? 'top-[45px]' : 'bottom-0'
        } left-0 right-0`}
      >
        {messages.map(message => (
          <Toast
            key={message.id}
            id={message.id}
            message={message.text}
            variant={message.variant}
            duration={message.duration}
            showProgress={message.showProgress}
            onHide={removeToast}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
