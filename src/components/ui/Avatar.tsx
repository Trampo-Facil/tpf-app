import { Text, View } from 'react-native';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: { container: 'w-8 h-8', text: 'text-sm' },
  md: { container: 'w-12 h-12', text: 'text-lg' },
  lg: { container: 'w-16 h-16', text: 'text-2xl' },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  const { container, text } = sizeStyles[size];
  return (
    <View className={`${container} rounded-full bg-primary-600 items-center justify-center`}>
      <Text className={`${text} font-bold text-white`}>{getInitials(name)}</Text>
    </View>
  );
}
