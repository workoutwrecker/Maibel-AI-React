// /app/onboarding/index.tsx
import { useRouter } from "expo-router";
import { View, Button, Text } from "react-native";

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Maibel.ai!</Text>
      <Button title="Get Started" onPress={() => router.push("../stories/initOnboardStart")} />
    </View>
  );
}
