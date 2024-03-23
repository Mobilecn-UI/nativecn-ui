import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { X } from 'lucide-react-native';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import {
  ScrollViewProps,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-reanimated';

import { cn } from '../lib/utils';

interface ContextProps {
  openModal(): void;
  closeModal(): void;
  onChange(index: number): void;
  ref: React.RefObject<BottomSheetModalMethods>;
}

const SheetContext = createContext({} as ContextProps);

const BottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const onChange = useCallback((index: number) => {
    console.log('modal', index);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SheetContext.Provider
          value={{ openModal, onChange, closeModal, ref: bottomSheetModalRef }}
        >
          {children}
        </SheetContext.Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

interface RootProps {
  snap?: (string | number)[] | SharedValue<(string | number)[]>;
  children: React.ReactNode;
}

const Root = ({ snap, children, ...props }: RootProps) => {
  const { ref, onChange } = useBottomSheetHook();
  const snapPoints = useMemo(() => (snap ? snap : ['25%', '50%']), []);

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      onChange={onChange}
      children={children}
      style={{
        paddingHorizontal: 24,
        paddingBottom: 24,
      }}
      backgroundStyle={{
        elevation: 25,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      {...props}
    />
  );
};

Root.displayName = 'Root';

const SheetHeader = ({ className, ...props }: BottomSheetViewProps) => (
  <View
    className={cn(
      'flex flex-row items-center justify-between gap-2  w-full',
      className
    )}
    style={{
      justifyContent: 'space-between',
    }}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetContent = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex flex-col w-full mt-2', className)} {...props} />
);
SheetContent.displayName = 'SheetContent';

const SheetContentScrollable = ({
  className,
  children,
  ...props
}: ScrollViewProps) => (
  <BottomSheetScrollView
    {...props}
    className={cn('flex flex-col w-full mt-2', className)}
  >
    {children}
  </BottomSheetScrollView>
);
SheetContentScrollable.displayName = 'SheetContentScrollable';

const SheetTitle = ({ className, children }: TextProps) => (
  <Text className={cn('font-semibold text-2xl text-primary', className)}>
    {children}
  </Text>
);
SheetTitle.displayName = 'SheetTitle';

const SheetDescription = ({ className, children }: TextProps) => (
  <Text className={cn('text-base leading-normal', className)}>{children}</Text>
);
SheetDescription.displayName = 'SheetDescription';

interface SheetCloseProps extends TouchableOpacityProps {
  iconColor?: string;
  iconSize?: number;
}
const SheetClose = ({
  className,
  iconColor = '#252525',
  iconSize = 26,
  ...props
}: SheetCloseProps) => {
  return (
    <TouchableOpacity
      className={cn(
        'p-3 rounded-sm flex items-center justify-center',
        className
      )}
      {...props}
    >
      <X color={iconColor} size={iconSize} />
    </TouchableOpacity>
  );
};

SheetClose.displayName = 'SheetClose';

const useBottomSheetHook = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};

export {
  BottomSheetProvider,
  useBottomSheetHook,
  Root,
  SheetTitle,
  SheetHeader,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetContentScrollable,
};
