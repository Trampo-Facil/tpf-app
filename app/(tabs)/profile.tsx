import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/stores/auth.store';
import { Avatar } from '@/components/ui/Avatar';
import { Divider } from '@/components/ui/Divider';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  danger?: boolean;
}

export default function ProfileScreen() {
  const router = useRouter();
  const signOut = useAuthStore((s) => s.signOut);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/sign-in');
  };

  const menuItems: MenuItem[] = [
    {
      icon: 'person-outline',
      label: 'Editar perfil',
      onPress: () => {},
    },
    {
      icon: 'briefcase-outline',
      label: 'Minhas ocupações',
      onPress: () => {},
    },
    {
      icon: 'location-outline',
      label: 'Cidades de atuação',
      onPress: () => {},
    },
    {
      icon: 'shield-checkmark-outline',
      label: 'Privacidade',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView contentContainerClassName="pb-10" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-6 pb-4">
          <Text className="text-2xl font-bold text-slate-900">Meu Perfil</Text>
        </View>

        {/* Profile card */}
        <View className="mx-5 bg-white rounded-2xl border border-slate-100 p-5 flex-row items-center gap-4">
          <Avatar name="Usuário" size="lg" />
          <View className="flex-1">
            <Text className="text-base font-semibold text-slate-900">Minha conta</Text>
            <Text className="text-sm text-muted">Trabalhador cadastrado</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </View>

        <Divider />

        {/* Menu items */}
        <View className="mx-5 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {menuItems.map((item, index) => (
            <View key={item.label}>
              <Pressable
                onPress={item.onPress}
                className="flex-row items-center gap-3 px-5 py-4 active:bg-slate-50"
              >
                <View className="w-8 h-8 rounded-full bg-primary-50 items-center justify-center">
                  <Ionicons name={item.icon} size={16} color="#2563eb" />
                </View>
                <Text className="flex-1 text-base text-slate-800">{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
              </Pressable>
              {index < menuItems.length - 1 && (
                <View className="h-px bg-slate-100 ml-16" />
              )}
            </View>
          ))}
        </View>

        <Divider />

        {/* Sign out */}
        <View className="mx-5 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <Pressable
            onPress={handleSignOut}
            className="flex-row items-center gap-3 px-5 py-4 active:bg-red-50"
          >
            <View className="w-8 h-8 rounded-full bg-red-50 items-center justify-center">
              <Ionicons name="log-out-outline" size={16} color="#ef4444" />
            </View>
            <Text className="flex-1 text-base text-red-500 font-medium">Sair da conta</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
