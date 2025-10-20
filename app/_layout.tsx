<<<<<<< HEAD
import { Stack } from 'expo-router';

export default function RootLayout() {

  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="recovery" options={{ headerShown: false }} />
        <Stack.Screen name="newpassword" options={{ headerShown: false }} />
      </Stack>
=======
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
>>>>>>> 917750e8fc2b59ab84551bd981a052b8901ece9f
  );
}


