import { type VariantProps, cva } from 'class-variance-authority';
import { Text, View } from 'react-native';

import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-black dark:bg-white',
        secondary: 'bg-gray-500',
        destructive: 'bg-red-500',
        success: 'bg-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {
  label: string;
  labelClasses?: string;
}
function Badge({
  label,
  labelClasses,
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant, className }))} {...props}>
      <Text
        className={cn(
          labelClasses,
          'font-medium text-center text-xs text-white dark:text-black'
        )}
      >
        {label}
      </Text>
    </View>
  );
}

export { Badge, badgeVariants };
