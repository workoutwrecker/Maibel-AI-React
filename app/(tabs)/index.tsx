import { View, Text, Button } from "react-native";
import { useTheme } from '../../context/ThemeContext';

export default function Stories() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme === 'light' ? '#f5f5f5' : 'black' }}>
      <Text style={{ color: theme === 'light' ? 'black' : 'white' }}>Today's Story</Text>
    </View>
  );
}