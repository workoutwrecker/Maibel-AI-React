import { View, Text, Button } from "react-native";
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook

export default function Stories() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Today's Story</Text>
      <Button title="Toggle Theme" onPress={toggleTheme}></Button>
    </View>
  );
}