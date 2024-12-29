import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from 'expo-status-bar';

export default function Onboarding() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <StatusBar translucent />

      <ImageBackground
        source={require("../assets/images/onboard/Start.jpg")}
        style={styles.container}
        resizeMode="cover"
      >
        <Text style={styles.title}>Welcome to Maibel.ai!</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("../onboard/initOnboard_1_day1")}
          >
            <LinearGradient
              colors={["#6A0DAD", "#FF69B4"]}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Start the Journey</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <LinearGradient
              colors={["#1E90FF", "#00CED1"]}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>How to Play</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Modal
          statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                What is 'The Secret Heir'?
                {"\n\n"}
                This is an interactive fitness game that puts you at the heart of a thrilling Korean mystery.
                {"\n\n"}
                With your AI companion as your guide, you'll tackle fitness challenges as missions to demonstrate your worthiness for a billion-dollar fortune.
                {"\n\n"}
                Stay committed to your healthy habits and unlock the path to claim your rightful inheritance.
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.minimalCloseButton}>
                <View style={styles.closeButtonCircle}>
                  <Text style={styles.minimalCloseButtonText}>✕</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 50,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
    borderRadius: 25,
    overflow: "hidden",
    width: 250,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  minimalCloseButton: {
    position: "absolute",
    bottom: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  minimalCloseButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
