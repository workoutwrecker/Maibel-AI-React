import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { storyData } from "./data";
import { initOnboardStoryData } from "./onboard_data";
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

export default function StoryPage() {
  const { slug } = useLocalSearchParams(); // Get the dynamic slug
  const router = useRouter();
  const { theme } = useTheme();

  let story;

  // Ensure slug is valid
  if ((slug as string).startsWith("initOnboard")) {
    story = initOnboardStoryData[slug as keyof typeof initOnboardStoryData];
  } else {
    story = storyData[slug as keyof typeof storyData];
  }

  // Handle invalid slug
  if (!story) {
    return (
      <View style={styles().container}>
        <Text style={styles().text}>Story not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles().container}>
      <StatusBar translucent/>
      {/* Image occupies the top half of the screen and doesn't get cropped */}
      <Image source={story.image} style={styles().image} resizeMode="contain" />
      
      {/* Text and button content in the bottom half */}
      <View style={styles().content}>
        <Text style={styles().text}>{story.text}</Text>
        {story.button && (
          <Button title={story.button.label} onPress={() => router.push(story.button.link as any)} />
        )}
      </View>
    </View>
  );
}

const styles = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: theme === 'light' ? 'white' : 'black',
    },
    image: {
      width: "100%",
      height: "50%",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 20,
      color: theme === 'light' ? 'black' : 'white',
    },
  });
};
