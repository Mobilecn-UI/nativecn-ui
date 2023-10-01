import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import { View } from 'react-native';

import { Toast } from './Toast';

interface ToastMessage {
  id: number;
  text: string;
  variant: 'default' | 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastContextProps {
  addToast: (
    message: string,
    variant?: 'default' | 'success' | 'error' | 'info',
    duration?: number
  ) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (
      message: string,
      variant: 'default' | 'success' | 'error' | 'info' = 'default',
      duration?: number
    ) => {
      setMessages(prev => [
        ...prev,
        { text: message, id: Date.now(), variant, duration },
      ]);
    },
    []
  );

  const removeToast = useCallback((id: number) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <View
        style={{
          position: 'absolute',
          top: 45,
          left: 0,
          right: 0,
        }}
      >
        {messages.map(messageObj => (
          <Toast
            key={messageObj.id}
            id={messageObj.id}
            message={messageObj.text}
            variant={messageObj.variant}
            duration={messageObj.duration}
            onHide={removeToast}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
