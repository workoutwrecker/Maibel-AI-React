import * as React from "react";
import { Dimensions, View, ImageBackground, StyleSheet, TouchableOpacity, Text, Modal, TextInput, Alert } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { saveToSecureStorage } from "../../utils/SecureStorage";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // For male/female icons

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const slides = [
  { id: "male_coach", background: require("../../assets/images/onboard/Male_Coach.jpg") },
  { id: "female_coach", background: require("../../assets/images/onboard/Female_Coach.jpg") },
  { id: "custom_coach", background: require("../../assets/images/onboard/Custom_Coach.jpeg") },
];

export default function App() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const router = useRouter();

  // Modal states
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = React.useState<string>("");

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const handleCoachSelection = async (coachId: string) => {
    if (coachId === "custom_coach") {
      setModalVisible(true);
    } else {
      await saveToSecureStorage("selectedCoachId", coachId);
      router.push("/(tabs)/chat");
    }
  };

  const handleBuildCoach = async () => {
    if (!selectedGender || !systemPrompt) {
      Alert.alert("Error", "Please select gender and enter a system prompt.");
      return;
    }

    await saveToSecureStorage("selectedCoachId", "custom_coach");
    await saveToSecureStorage("selectedGender", selectedGender);
    await saveToSecureStorage("systemPrompt", systemPrompt);

    setModalVisible(false);
    router.push("/(tabs)/chat");
  };

  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <ImageBackground source={item.background} style={styles.backgroundImage}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCoachSelection(item.id)}
      >
        <LinearGradient colors={["#6A0DAD", "#FF69B4"]} style={styles.gradient}>
          <Text style={styles.buttonText}>Start Your Adventure</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={width}
        height={height}
        data={slides}
        onProgressChange={progress}
        loop
        renderItem={renderItem}
      />

      {/* Pagination Dots */}
      <Pagination.Basic
        progress={progress}
        data={slides}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        containerStyle={styles.paginationContainer}
        onPress={onPressPagination}
      />

      {/* Modal for custom coach selection */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Your Custom Coach</Text>

            {/* Gender Selection */}
            <View style={styles.genderButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === "male" && styles.selectedButton,
                ]}
                onPress={() => setSelectedGender("male")}
              >
                <MaterialCommunityIcons name="gender-male" size={40} color="white" />
                <Text style={styles.genderText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === "female" && styles.selectedButton,
                ]}
                onPress={() => setSelectedGender("female")}
              >
                <MaterialCommunityIcons name="gender-female" size={40} color="white" />
                <Text style={styles.genderText}>Female</Text>
              </TouchableOpacity>
            </View>

            {/* System Prompt Input */}
            <TextInput
              style={styles.promptInput}
              placeholder="Enter a system prompt"
              value={systemPrompt}
              onChangeText={setSystemPrompt}
            />

            {/* Build Button */}
            <TouchableOpacity style={styles.buildButton} onPress={handleBuildCoach}>
              <Text style={styles.buildButtonText}>Build</Text>
            </TouchableOpacity>

            {/* Close Modal */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  button: {
    marginBottom: 50,
    alignSelf: "center",
    width: "80%",
    borderRadius: 25,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 50,
    width: 10,
    height: 10,
  },
  activeDot: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 12,
    height: 12,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  genderButtonsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  genderButton: {
    backgroundColor: "#6A0DAD",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  selectedButton: {
    backgroundColor: "#FF69B4",
  },
  genderText: {
    color: "white",
    marginTop: 5,
    fontWeight: "bold",
  },
  promptInput: {
    borderWidth: 1,
    borderColor: "#6A0DAD",
    width: "100%",
    height: 50,
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  buildButton: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 10,
    width: "100%",
    borderRadius: 25,
    alignItems: "center",
  },
  buildButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: "#6A0DAD",
    fontSize: 16,
  },
});
