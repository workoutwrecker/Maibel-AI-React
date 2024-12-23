// /app/story-flow/call-prompt.tsx
import { useRouter } from "expo-router";
import { View, Text, Button } from "react-native";

export default function CallPrompt() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notification or Call UI Here</Text>
      <Button title="Go to Chat" onPress={() => router.push("/(tabs)/chat")} />
    </View>
  );
}
