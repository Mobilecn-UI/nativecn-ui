import { type VariantProps, cva } from 'class-variance-authority';
import { Text, TouchableOpacity } from 'react-native';

import { cn } from '../lib/utils';

const buttonVariants = cva(
  'flex flex-row items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-black dark:bg-white',
        destructive: 'bg-red-500',
        secondary: 'bg-gray-500',
        ghost: 'bg-slate-700',
        link: 'text-primary underline-offset-4',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 px-2',
        lg: 'h-12 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('text-center font-medium', {
  variants: {
    variant: {
      default: 'text-white dark:text-black',
      destructive: 'text-white dark:text-black',
      secondary: 'text-white dark:text-black',
      ghost: 'text-white dark:text-black',
      link: 'text-primary underline',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label: string;
  labelClasses?: string;
}
function Button({
  label,
  labelClasses,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <Text
        className={cn(
          buttonTextVariants({ variant, size, className: labelClasses })
        )}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export { Button, buttonVariants, buttonTextVariants };
