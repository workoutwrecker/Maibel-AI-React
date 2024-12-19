import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboard-flow/call-prompt" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};