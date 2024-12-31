import React, { useState } from "react";
import { Dimensions, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { useSharedValue } from "react-native-reanimated";
import CustomCoachModal from "./CustomCoachModal";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const slides = [
  { id: "male_coach", background: require("../assets/images/onboard/Male_Coach.jpg") },
  { id: "female_coach", background: require("../assets/images/onboard/Female_Coach.jpg") },
  { id: "custom_coach", background: require("../assets/images/onboard/Custom_Coach.jpeg") },
];

interface CarouselComponentProps {
  onCoachSelect: (coachId: string) => void;
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ onCoachSelect }) => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCoachSelection = (coachId: string) => {
    if (coachId === "custom_coach") {
      setModalVisible(true);
    } else {
      onCoachSelect(coachId);
    }
  };

  const handleBuildCoach = (selectedGender: string, systemPrompt: string) => {
    onCoachSelect("custom_coach");
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <ImageBackground source={item.background} style={styles.backgroundImage}>
      {item.id === "custom_coach" && (
        <CustomCoachModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onBuildCoach={handleBuildCoach}
        />
      )}
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

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <>
      <Carousel
        ref={ref}
        width={width}
        height={height}
        data={slides}
        onProgressChange={progress}
        loop
        renderItem={renderItem}
      />
      <Pagination.Basic
        progress={progress}
        data={slides}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        containerStyle={styles.paginationContainer}
        onPress={onPressPagination}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
  },
  paginationContainer: {
    gap: 5,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CarouselComponent;
