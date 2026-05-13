import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="SignupScreen" />
      <Tabs.Screen name="LoginScreen" />

    </Tabs>
  );
}