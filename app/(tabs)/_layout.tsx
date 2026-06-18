import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants/Colors';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, label, focused }: { name: IconName; label: string; focused: boolean }) {
  return (
    <View style={[s.tab, focused && s.tabActive]}>
      <Ionicons name={name} size={20} color={focused ? C.emerald : C.textMuted} />
      <Text style={[s.tabLabel, { color: focused ? C.emerald : C.textMuted }]}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: s.tabBar, tabBarShowLabel: false }}>
      <Tabs.Screen name="index" options={{ tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'home' : 'home-outline'} label="Asosiy" focused={focused} /> }} />
      <Tabs.Screen name="transactions" options={{ tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'swap-horizontal' : 'swap-horizontal-outline'} label="Tarix" focused={focused} /> }} />
      <Tabs.Screen name="insights" options={{ tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'sparkles' : 'sparkles-outline'} label="Tahlil" focused={focused} /> }} />
      <Tabs.Screen name="budgets" options={{ tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'pie-chart' : 'pie-chart-outline'} label="Byudjet" focused={focused} /> }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'person' : 'person-outline'} label="Profil" focused={focused} /> }} />
    </Tabs>
  );
}

const s = StyleSheet.create({
  tabBar: { backgroundColor: C.card, borderTopColor: C.border, borderTopWidth: 1, height: 72, paddingHorizontal: 8, paddingBottom: 8, paddingTop: 8, elevation: 8, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: -2 } },
  tab: { alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  tabActive: { backgroundColor: C.emeraldMuted },
  tabLabel: { fontSize: 10, fontWeight: '600' },
});
