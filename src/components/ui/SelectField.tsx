import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import type { SelectOption } from './MultiSelect';

interface SelectFieldProps<T extends string | number> {
  label?: string;
  placeholder?: string;
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
}

export function SelectField<T extends string | number>({
  label,
  placeholder = 'Selecione...',
  options,
  value,
  onChange,
  loading = false,
  error,
  disabled = false,
}: SelectFieldProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <>
      <View className="gap-1">
        {label && <Text className="text-sm font-medium text-slate-700">{label}</Text>}

        <Pressable
          onPress={() => !disabled && !loading && setOpen(true)}
          className={`w-full flex-row items-center justify-between rounded-xl border px-4 py-3 bg-white ${
            error ? 'border-red-400' : 'border-slate-200'
          } ${disabled || loading ? 'opacity-50' : ''}`}
        >
          <Text
            className={`flex-1 text-base ${selectedLabel ? 'text-slate-900' : 'text-slate-400'}`}
          >
            {loading ? 'Carregando...' : selectedLabel ?? placeholder}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#94A3B8" />
        </Pressable>

        {error && <Text className="text-xs text-red-500">{error}</Text>}
      </View>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setOpen(false)}
        >
          <Pressable
            className="bg-white rounded-t-2xl max-h-[60%]"
            onPress={(e) => e.stopPropagation()}
          >
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-slate-100">
              <Text className="text-base font-semibold text-slate-900">{label}</Text>
              <Pressable onPress={() => setOpen(false)} hitSlop={12}>
                <Ionicons name="close" size={22} color="#64748B" />
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
              {options.map((option) => {
                const selected = value === option.value;
                return (
                  <Pressable
                    key={String(option.value)}
                    onPress={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className="flex-row items-center px-5 py-3.5 active:bg-slate-50"
                  >
                    <View
                      className={`w-5 h-5 rounded-full border mr-3 items-center justify-center ${
                        selected
                          ? 'bg-primary-600 border-primary-600'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {selected && <View className="w-2 h-2 rounded-full bg-white" />}
                    </View>
                    <Text className="text-base text-slate-800 flex-1">{option.label}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
