import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { saveToSecureStorage } from "../../utils/SecureStorage";
import CarouselComponent from "../../components/CarouselPageSwipe";


const ChooseAI = () => {
  const router = useRouter();

  const handleCoachSelection = async (coachId: string, selectedGender: string, name: string, 
    background: string, personalities: string[]) => {
    await saveToSecureStorage("coachId", coachId);
    console.log("Saving: ", coachId);
    await saveToSecureStorage("onboardDay", new Date().toISOString().split("T")[0]);
    await saveToSecureStorage("gender", selectedGender || "");
    await saveToSecureStorage("name", name || "");
    await saveToSecureStorage("background", background || "");
    await saveToSecureStorage("personality_1", personalities[0] || "");
    await saveToSecureStorage("personality_2", personalities[1] || "");
    await saveToSecureStorage("personality_3", personalities[2] || "");
    router.push("/(tabs)/chat");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <CarouselComponent onCoachSelect={handleCoachSelection} />
    </View>
  );
};

export default ChooseAI;
