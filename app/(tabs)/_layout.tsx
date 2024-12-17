import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook

export default function TabLayout() {
  const { theme } = useTheme(); // Access the theme context

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarStyle: {
          backgroundColor: theme === 'light' ? 'white' : '#3e3e3e',
        },
        tabBarLabelStyle: {
          color: theme === 'light' ? 'black' : 'white',
        },
        
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Stories',
          tabBarIcon: ({ color }) => {
            const { theme } = useTheme(); // Get current theme
            const iconColor = theme === 'dark' ? 'white' : 'black'; // Set icon color based on theme
            
            return <Feather name="book-open" size={28} color={iconColor} />;
          },
        }}
      />
      <Tabs.Screen
        name="ask-maibel"
        options={{
          title: 'Ask Maibel',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/images/ask-maibel.jpg')}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
