import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useWorkers } from '@/hooks/useWorkers';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';

export default function WorkerDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useWorkers({ page: 1, limit: 100 });

  const worker = data?.data.find((w) => String(w.id) === id);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-surface items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  if (!worker) {
    return (
      <SafeAreaView className="flex-1 bg-surface items-center justify-center px-6">
        <Text className="text-slate-500 text-center">Profissional não encontrado.</Text>
        <Pressable onPress={() => router.back()} className="mt-4">
          <Text className="text-primary-600 font-semibold">Voltar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Back */}
      <Pressable
        onPress={() => router.back()}
        className="flex-row items-center gap-2 px-5 pt-4 pb-2"
      >
        <Ionicons name="arrow-back" size={22} color="#2563eb" />
        <Text className="text-primary-600 font-medium">Voltar</Text>
      </Pressable>

      <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
        {/* Profile header */}
        <View className="items-center py-8 bg-white rounded-2xl border border-slate-100 mt-2">
          <Avatar name={worker.user.name} size="lg" />
          <Text className="text-xl font-bold text-slate-900 mt-3">{worker.user.name}</Text>
          <Text className="text-sm text-muted mt-1">{worker.user.email}</Text>
          <Text className="text-sm text-muted">{worker.user.phone}</Text>
        </View>

        <Divider />

        {/* Occupations */}
        {worker.jobOccupations.length > 0 && (
          <View className="bg-white rounded-2xl border border-slate-100 p-4">
            <Text className="text-base font-semibold text-slate-900 mb-3">
              Serviços oferecidos
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {worker.jobOccupations.map((occ) => (
                <Badge key={occ.id} label={occ.name} color="blue" />
              ))}
            </View>
          </View>
        )}

        {worker.operationCities.length > 0 && (
          <>
            <Divider />
            <View className="bg-white rounded-2xl border border-slate-100 p-4">
              <Text className="text-base font-semibold text-slate-900 mb-3">
                Cidades de atuação
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {worker.operationCities.map((city) => (
                  <Badge key={city.id} label={`${city.name} — ${city.state}`} color="slate" />
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
