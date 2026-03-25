import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <View className="gap-1">
      {label && (
        <Text className="text-sm font-medium text-slate-700">{label}</Text>
      )}
      <TextInput
        className={`w-full rounded-xl border px-4 py-3 text-base text-slate-900 bg-white ${
          error ? 'border-red-400' : 'border-slate-200'
        }`}
        placeholderTextColor="#94A3B8"
        {...props}
      />
      {error && (
        <Text className="text-xs text-red-500">{error}</Text>
      )}
    </View>
  );
}
