import { type VariantProps, cva } from 'class-variance-authority';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';

import { cn } from '../lib/utils';

interface CollapsibleContextProps {
  setIsExpanded: (value: boolean) => void;
  isExpanded: boolean;
}
const CollapsibleContext = createContext<CollapsibleContextProps>({
  isExpanded: false,
  setIsExpanded: () => {},
});

interface CollapsibleProps {
  children: React.ReactNode;
}
function Collapsible({ children }: CollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <CollapsibleContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </CollapsibleContext.Provider>
  );
}

const collapsibleHeaderVariants = cva(
  'flex flex-col items-center mb-3 rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const collapsibleContentVariants = cva(
  'flex flex-col items-center rounded-md gap-3',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CollapsibleContentProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof collapsibleContentVariants> {
  children: React.ReactNode;
}
function CollapsibleContent({
  children,
  className,
  variant,
  ...props
}: CollapsibleContentProps) {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const { isExpanded } = useContext(CollapsibleContext);

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isExpanded ? 0 : 4000, // Defina a altura que deseja para o conteúdo expandido
      duration: 300, // Defina a duração da animação
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  return (
    <Animated.View
      style={{
        maxHeight: heightAnim,
        overflow: 'hidden',
      }}
      className={cn(collapsibleContentVariants({ variant }), className)}
    >
      {children}
    </Animated.View>
  );
}

export interface CollapsibleHeaderProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof collapsibleHeaderVariants> {
  children: React.ReactNode;
}
function CollapsibleHeader({
  children,
  className,
  variant,
  ...props
}: CollapsibleHeaderProps) {
  const { isExpanded, setIsExpanded } = useContext(CollapsibleContext);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity
      onPress={toggleCollapse}
      activeOpacity={1}
      className={cn(collapsibleHeaderVariants({ variant }), className)}
    >
      {children}
    </TouchableOpacity>
  );
}

export { Collapsible, CollapsibleHeader, CollapsibleContent };
