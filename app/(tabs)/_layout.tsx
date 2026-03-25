import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type IoniconsName = keyof typeof Ionicons.glyphMap;

interface Tab {
  name: string;
  title: string;
  icon: IoniconsName;
  activeIcon: IoniconsName;
}

const tabs: Tab[] = [
  { name: 'home', title: 'Buscar', icon: 'search-outline', activeIcon: 'search' },
  { name: 'profile', title: 'Perfil', icon: 'person-outline', activeIcon: 'person' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          borderTopColor: '#e2e8f0',
          backgroundColor: '#fff',
          paddingBottom: 4,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
      }}
    >
      {tabs.map(({ name, title, icon, activeIcon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? activeIcon : icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
