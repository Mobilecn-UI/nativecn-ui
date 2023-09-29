import { Text, View, useColorScheme } from 'react-native';

import { Variant, VariantStyles } from '../lib/types';

interface CardProps {
  content?: string;
  description?: string;
  footer?: string;
  title?: string;
  variant?: Variant;
}
export function Card({
  content,
  description,
  footer,
  title,
  variant,
}: CardProps) {
  const colorScheme = useColorScheme();
  const variantStyles: VariantStyles = {
    default: colorScheme === 'light' ? 'bg-white' : 'bg-black',
  };

  return (
    <View
      className={`
      px-5 py-4 rounded-lg border shadow-sm dark:border-gray-700
      ${variant ? variantStyles[variant] : variantStyles.default}
    `}
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
