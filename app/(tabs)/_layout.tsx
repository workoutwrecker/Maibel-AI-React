import { Tabs } from 'expo-router';
import { Image, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from '../../context/ThemeContext';
import { themeStyles } from "../../context/themeStyles";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  const { theme } = useTheme();
  const currentTheme = themeStyles[theme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarStyle: {
          backgroundColor: theme === 'light' ? 'white' : '#3e3e3e',
        },
        tabBarLabelStyle: {
          color: theme === 'light' ? 'black' : 'white',
        },
        headerStyle: {
          height: 70,
        },
        headerTitleStyle: {
          fontSize: 20,
          textAlign: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Stories',
          
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text
                style={{
                  fontSize: 12,
                  color: theme === 'light' ? 'black' : 'white',
                  opacity: focused ? 1 : 0,
                }}
              >
                Stories
              </Text>
            ) : null, // Only show label when focused
          tabBarIcon: ({ focused }) => {
            const { theme } = useTheme();
            const iconColor = theme === 'light' ? 'black' : 'white';
            const opacity = focused ? 1 : 0.6;

            return <Feather name="book-open" size={28} color={iconColor} style={{ opacity }} />;
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerTitle: 'Chat',
          headerShown: false,
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text
                style={{
                  fontSize: 12,
                  color: theme === 'light' ? 'black' : 'white',
                  opacity: focused ? 1 : 0,
                }}
              >
                Chat
              </Text>
            ) : null, // Only show label when focused
          tabBarIcon: ({ size, focused }) => (
            <Image
              source={require('../../assets/images/bots/bot-icon.jpg')}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.6,
                borderColor: focused ? (theme === 'light' ? 'royalblue' : 'royalblue') : 'transparent',
                borderWidth: focused ? 2 : 0,
                borderRadius: size / 2,
              }}
            />
          ),
          
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          headerTitle: "Challeges",
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text
                style={{
                  fontSize: 12,
                  color: theme === 'light' ? 'black' : 'white',
                  opacity: focused ? 1 : 0,
                }}
              >
                Challenges
              </Text>
            ) : null, // Only show label when focused
            tabBarIcon: ({ focused }) => {
              const { theme } = useTheme();
              const iconColor = theme === 'light' ? 'black' : 'white';
              const opacity = focused ? 1 : 0.6;
  
              return <Feather name="user" size={28} color={iconColor} style={{ opacity }} />;
            },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text
                style={{
                  fontSize: 12,
                  color: theme === 'light' ? 'black' : 'white',
                  opacity: focused ? 1 : 0,
                }}
              >
                Settings
              </Text>
            ) : null, // Only show label when focused
            tabBarIcon: ({ focused }) => {
              const { theme } = useTheme();
              const iconColor = theme === 'light' ? 'black' : 'white';
              const opacity = focused ? 1 : 0.6;
  
              return <Feather name="settings" size={28} color={iconColor} style={{ opacity }} />;
            },
        }}
      />
    </Tabs>
  );
}
