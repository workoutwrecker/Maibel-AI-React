import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function OnboardStoryLayout() {
  <StatusBar hidden/>
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}>
      <Stack.Screen name="choose-ai" options={{ headerShown: false}} />
    </Stack>
  );
}
