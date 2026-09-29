import { Stack } from "expo-router";

import { setupInterceptors } from "../infra/api/interceptor";

setupInterceptors();

export default function RootLayout() {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}
