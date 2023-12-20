import { Text, View } from 'react-native';

import { cn } from '../lib/utils';

function Card({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      className={cn(
        'rounded-xl border px-5 py-4 shadow-sm dark:border-gray-700',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn('pb-4', className)} {...props} />;
}

function CardTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <Text
      className={cn(
        'text-2xl font-semibold tracking-tight text-black dark:text-white',
        className
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <Text
      className={cn('text-sm text-gray-700 dark:text-gray-400', className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn('pb-4', className)} {...props} />;
}

// TODO: style
function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={className} {...props} />;
}

interface SimpleCardProps {
  className?: string;
  title?: string;
  description?: string;
  content?: string;
  footer?: string;
}
function SimpleCard({
  className,
  title,
  description,
  content,
  footer,
}: SimpleCardProps) {
  return (
    <View
      className={cn(
        'px-5 py-4 rounded-lg border shadow-sm dark:border-gray-700',
        className
      )}
    >
      <View>
        {title && (
          <Text className="text-2xl font-semibold tracking-tight text-black dark:text-white">
            {title}
          </Text>
        )}
        {description && (
          <Text className="text-sm text-gray-700 dark:text-gray-400">
            {description}
          </Text>
        )}
      </View>
      {content && (
        <View className="py-4">
          <Text className="text-base text-black dark:text-white">
            {content}
          </Text>
        </View>
      )}
      {footer && (
        <Text className="text-sm text-gray-700 dark:text-gray-400">
          {footer}
        </Text>
      )}
    </View>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  SimpleCard,
};
