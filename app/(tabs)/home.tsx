import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useWorkers } from '@/hooks/useWorkers';
import { WorkerCard } from '@/components/shared/WorkerCard';
import { EmptyState } from '@/components/shared/EmptyState';
import type { Worker } from '@/types/api.types';

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useWorkers({ page, limit: 20 });

  const workers = data?.data ?? [];

  const filtered = search.trim()
    ? workers.filter(
        (w) =>
          w.user.name.toLowerCase().includes(search.toLowerCase()) ||
          w.jobOccupations.some((o) => o.name.toLowerCase().includes(search.toLowerCase())),
      )
    : workers;

  const renderWorker = ({ item }: { item: Worker }) => (
    <WorkerCard
      worker={item}
      onPress={() => router.push({ pathname: '/worker/[id]', params: { id: item.id } })}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-2xl font-bold text-slate-900">Trampo Fácil</Text>
        <Text className="text-slate-500 text-sm mt-1">Encontre o profissional ideal</Text>
      </View>

      {/* Search bar */}
      <View className="px-5 mb-4">
        <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 gap-3">
          <Ionicons name="search-outline" size={18} color="#94A3B8" />
          <TextInput
            className="flex-1 text-base text-slate-900"
            placeholder="Buscar por nome ou serviço..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Content */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : isError ? (
        <EmptyState
          icon="wifi-outline"
          title="Erro ao carregar"
          description="Verifique sua conexão e tente novamente"
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderWorker}
          contentContainerClassName="px-5 pb-6 gap-3"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text className="text-xs text-muted mb-1">
              {filtered.length} profissional{filtered.length !== 1 ? 'is' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            </Text>
          }
          ListEmptyComponent={
            <EmptyState
              title="Nenhum profissional encontrado"
              description="Tente buscar por outro nome ou serviço"
            />
          }
        />
      )}
    </SafeAreaView>
  );
}
