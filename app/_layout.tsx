// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false, // 👈 hides the header for all screens
//       }}
//     />
//   );
// }

// app/index.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="password">
      {/* The Slot or Stack.Screen shows your current route */}
      <Stack.Screen name="index" />
      <Stack.Screen name="password" />
      <Stack.Screen name="password_typing"/>
    </Stack>
  );
}


