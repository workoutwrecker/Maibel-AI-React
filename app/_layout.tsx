import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { View, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <ThemeProvider> {/* Wrap everything inside ThemeProvider */}
      <RootLayoutContent /> {/* Render the content inside another component */}
    </ThemeProvider>
  );
}

const RootLayoutContent = () => {
  const { theme } = useTheme(); // Now this works because ThemeProvider wraps it

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboard-flow/call-prompt" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full height
  },
});
