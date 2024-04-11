/* eslint-disable prettier/prettier */
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { Text, View } from 'react-native';

import { cn } from '../lib/utils';

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropDownContext = createContext<DialogContextType | undefined>(undefined);

const DropDown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <DropDownContext.Provider value={{ open, setOpen }}>
      {children}
    </DropDownContext.Provider>
  );
};

const DropDownTrigger = ({ children }: any) => {
  const { setOpen } = useDropdown();
  return cloneElement(children, {
    onPress: () => setOpen((prev: any) => !prev),
  });
};

type DropDownContentTypes = {
  className?: string;
  children: React.ReactNode;
};

const DropDownContent = ({ className, children }: DropDownContentTypes) => {
  const { open } = useDropdown();
  return (
    <>
      {open && (
        <View
          className={cn(
            'z-50 min-w-[8rem] flex gap-3 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md mt-3 p-3',
            className
          )}
        >
          {children}
        </View>
      )}
    </>
  );
};

type DropDownLabelProps = {
  labelTitle: string;
};

const DropDownLabel = ({ labelTitle }: DropDownLabelProps) => {
  return (
    <Text className="text-xl font-semibold text-primary">{labelTitle}</Text>
  );
};

type DropDownItemProps = {
  children: React.ReactNode;
  className?: string;
};

const DropDownItem = ({ children, className }: DropDownItemProps) => {
  return (
    <View className={cn('p-2 border border-zinc-600 rounded-md', className)}>
      {children}
    </View>
  );
};

const DropDownItemSeparator = () => {
  return <View className="h-[1px] bg-zinc-600 flex-1" />;
};

const useDropdown = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};
export {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownLabel,
  DropDownItemSeparator,
  DropDownItem,
  useDropdown,
};
