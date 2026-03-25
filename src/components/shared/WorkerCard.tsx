import { Pressable, Text, View } from 'react-native';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import type { Worker } from '@/types/api.types';

interface WorkerCardProps {
  worker: Worker;
  onPress: () => void;
}

export function WorkerCard({ worker, onPress }: WorkerCardProps) {
  const { user, jobOccupations, operationCities } = worker;

  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 active:opacity-80"
    >
      <View className="flex-row items-center gap-3">
        <Avatar name={user.name} size="md" />
        <View className="flex-1">
          <Text className="text-base font-semibold text-slate-900" numberOfLines={1}>
            {user.name}
          </Text>
          <Text className="text-sm text-muted" numberOfLines={1}>
            {operationCities.map((c) => c.name).join(', ')}
          </Text>
        </View>
      </View>

      {jobOccupations.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mt-3">
          {jobOccupations.slice(0, 3).map((occ) => (
            <Badge key={occ.id} label={occ.name} color="blue" />
          ))}
          {jobOccupations.length > 3 && (
            <Badge label={`+${jobOccupations.length - 3}`} color="slate" />
          )}
        </View>
      )}
    </Pressable>
  );
}
