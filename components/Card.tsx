import { Text, View } from 'react-native';

const cardVariants = {
  default: 'bg-white dark:bg-black',
};

interface CardProps {
  content?: string;
  description?: string;
  footer?: string;
  title?: string;
  variant?: keyof typeof cardVariants;
}
export function Card({
  content,
  description,
  footer,
  title,
  variant = 'default',
}: CardProps) {
  return (
    <View
      className={`
      px-5 py-4 rounded-lg border shadow-sm dark:border-gray-700
      ${cardVariants[variant]}
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
