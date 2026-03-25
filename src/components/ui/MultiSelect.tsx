import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export interface SelectOption<T = number> {
  label: string;
  value: T;
}

interface MultiSelectProps<T = number> {
  label?: string;
  placeholder?: string;
  options: SelectOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
}

export function MultiSelect<T extends string | number>({
  label,
  placeholder = 'Selecione...',
  options,
  value,
  onChange,
  loading = false,
  error,
  disabled = false,
}: MultiSelectProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedLabels = options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label);

  const toggle = (val: T) => {
    onChange(value.includes(val) ? value.filter((v) => v !== val) : [...value, val]);
  };

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
            className={`flex-1 text-base ${
              selectedLabels.length > 0 ? 'text-slate-900' : 'text-slate-400'
            }`}
            numberOfLines={1}
          >
            {loading
              ? 'Carregando...'
              : selectedLabels.length > 0
              ? selectedLabels.join(', ')
              : placeholder}
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
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-slate-100">
              <Text className="text-base font-semibold text-slate-900">{label}</Text>
              <Pressable onPress={() => setOpen(false)} hitSlop={12}>
                <Ionicons name="close" size={22} color="#64748B" />
              </Pressable>
            </View>

            {/* Options list */}
            <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
              {options.map((option) => {
                const selected = value.includes(option.value);
                return (
                  <Pressable
                    key={String(option.value)}
                    onPress={() => toggle(option.value)}
                    className="flex-row items-center px-5 py-3.5 active:bg-slate-50"
                  >
                    <View
                      className={`w-5 h-5 rounded border mr-3 items-center justify-center ${
                        selected
                          ? 'bg-primary-600 border-primary-600'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {selected && <Ionicons name="checkmark" size={13} color="white" />}
                    </View>
                    <Text className="text-base text-slate-800 flex-1">{option.label}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Confirm */}
            <View className="px-5 py-4 border-t border-slate-100">
              <Pressable
                onPress={() => setOpen(false)}
                className="bg-primary-600 rounded-xl py-3 items-center"
              >
                <Text className="text-white font-semibold text-base">
                  {value.length > 0 ? `Confirmar (${value.length})` : 'Fechar'}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
