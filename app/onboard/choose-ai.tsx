import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { saveToSecureStorage } from "../../utils/SecureStorage";
import CarouselComponent from "../../components/CarouselPageSwipe";


const ChooseAI = () => {
  const router = useRouter();

  const handleCoachSelection = async (coachId: string) => {
    await saveToSecureStorage("selectedCoachId", coachId);
    await saveToSecureStorage("curDay", "1");
    // await saveToSecureStorage("selectedGender", selectedGender);
    // await saveToSecureStorage("systemPrompt", systemPrompt);
    router.push("/(tabs)/chat");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <CarouselComponent onCoachSelect={handleCoachSelection} />
    </View>
  );
};

export default ChooseAI;
