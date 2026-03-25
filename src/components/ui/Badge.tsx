import { Text, View } from 'react-native';

type Color = 'blue' | 'green' | 'slate';

interface BadgeProps {
  label: string;
  color?: Color;
}

const colorStyles: Record<Color, { container: string; text: string }> = {
  blue: { container: 'bg-primary-100', text: 'text-primary-700' },
  green: { container: 'bg-secondary-100', text: 'text-secondary-700' },
  slate: { container: 'bg-slate-100', text: 'text-slate-600' },
};

export function Badge({ label, color = 'blue' }: BadgeProps) {
  const { container, text } = colorStyles[color];
  return (
    <View className={`rounded-full px-3 py-1 ${container}`}>
      <Text className={`text-xs font-medium ${text}`}>{label}</Text>
    </View>
  );
}
