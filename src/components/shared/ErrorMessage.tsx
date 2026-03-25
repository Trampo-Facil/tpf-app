import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <View className="flex-row items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
      <Ionicons name="alert-circle-outline" size={18} color="#ef4444" />
      <Text className="text-sm text-red-600 flex-1">{message}</Text>
    </View>
  );
}
