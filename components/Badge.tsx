import { Text, View } from 'react-native';

const defaultContainerClasses = 'px-2 py-1 rounded-full';
const defaultLabelClasses =
  'font-medium text-center text-xs text-white dark:text-black';
const badgeVariants = {
  default: 'bg-black dark:bg-white',
  secondary: 'bg-gray-500',
  destructive: 'bg-red-500',
  success: 'bg-green-500',
};

interface BadgeProps {
  label: string;
  containerClasses?: string;
  labelClasses?: string;
  variant?: keyof typeof badgeVariants;
}
export function Badge({
  label,
  containerClasses = defaultContainerClasses,
  labelClasses = defaultLabelClasses,
  variant = 'default',
}: BadgeProps) {
  return (
    <View
      className={`${containerClasses} ${
        containerClasses === defaultContainerClasses && badgeVariants[variant]
      }`}
    >
      <Text className={labelClasses}>{label}</Text>
    </View>
  );
}
