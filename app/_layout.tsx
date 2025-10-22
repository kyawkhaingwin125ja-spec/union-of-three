
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      {/* The Slot or Stack.Screen shows your current route */}
      <Stack.Screen name="index"/>
      <Stack.Screen name="password" />
      <Stack.Screen name="password_typing"/>
      <Stack.Screen name="login"/>
      <Stack.Screen name="recovery"/>
      <Stack.Screen name="newpassword"/>
      <Stack.Screen name="hello_card"/>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  );
}

