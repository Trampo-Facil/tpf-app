import { Text, View } from 'react-native';

interface DividerProps {
  label?: string;
}

export function Divider({ label }: DividerProps) {
  if (!label) {
    return <View className="h-px bg-slate-100 my-4" />;
  }
  return (
    <View className="flex-row items-center gap-3 my-4">
      <View className="flex-1 h-px bg-slate-100" />
      <Text className="text-sm text-muted">{label}</Text>
      <View className="flex-1 h-px bg-slate-100" />
    </View>
  );
}
