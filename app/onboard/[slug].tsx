import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
import { initOnboardStoryData } from "./onboard_data";
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";

export default function onboardStoryPage() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  let story;

  if ((slug as string).startsWith("initOnboard")) {
    story = initOnboardStoryData[slug as keyof typeof initOnboardStoryData];
  }

  if (!story) {
    return (
      <View style={styles().container}>
        <Text style={styles().text}>Story not found.</Text>
      </View>
    );
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  return (
    <ImageBackground source={story.image} style={styles().backgroundImage} resizeMode="cover">
      {/* <StatusBar translucent /> */}
      <View style={styles().buttonContainer}>
        {story.buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles().button,
              button.style === "plain" && styles().plainButton,
              { marginBottom: button.marginBottom || 25 },
            ]}
            onPress={() => router.push(button.link as any)}
          >
            {button.style === "plain" ? (
              <View style={styles().plainButtonContent}>
                <Text style={styles().plainButtonText}>{button.label}</Text>
              </View>
            ) : (
              <LinearGradient
                colors={["#6A0DAD", "#FF69B4"]}
                style={styles().gradientButton}
              >
                <Text style={styles().buttonText}>{button.label}</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
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
    backgroundImage: {
      flex: 1,
      justifyContent: "flex-end",
    },
    buttonContainer: {
      alignItems: "center",
    },
    button: {
      minWidth: 250,
      borderRadius: 25,
      overflow: "hidden",
    },
    gradientButton: {
      paddingVertical: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    plainButton: {
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#ccc",
    },
    plainButtonContent: {
      paddingVertical: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    plainButtonText: {
      color: "black",
      fontSize: 18,
      fontWeight: "bold",
    },
    text: {
      color: theme === "light" ? "black" : "white",
    },
  });
};
