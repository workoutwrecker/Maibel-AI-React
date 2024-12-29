import { Stack } from "expo-router";

export default function OnboardStoryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    />
  );
}
