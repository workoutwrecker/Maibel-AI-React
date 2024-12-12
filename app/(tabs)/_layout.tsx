import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
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
