import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function EmptyState({ title, description, icon = 'search-outline' }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center gap-3 py-16">
      <Ionicons name={icon} size={48} color="#94A3B8" />
      <Text className="text-lg font-semibold text-slate-700">{title}</Text>
      {description && (
        <Text className="text-sm text-muted text-center px-8">{description}</Text>
      )}
    </View>
  );
}
