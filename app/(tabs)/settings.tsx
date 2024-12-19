import { View, Text, Button } from "react-native";
import { useTheme } from '../../context/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme === 'light' ? '#f5f5f5' : 'black' }}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}