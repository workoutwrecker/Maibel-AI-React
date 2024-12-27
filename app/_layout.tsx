import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  <StatusBar hidden />
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="onboard-flow/call-prompt" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="stories" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};