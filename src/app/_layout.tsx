import { Stack } from "expo-router";

import { setupInterceptors } from "../infra/api/interceptor";

setupInterceptors();

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
    </Stack>
  );
}
