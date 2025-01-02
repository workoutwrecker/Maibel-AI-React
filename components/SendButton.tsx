import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define the type for the component's props
interface SendButtonProps {
  handleSendImage: () => void; // handleSendImage is a function with no parameters and no return value
}

export const SendButton: React.FC<SendButtonProps> = ({ handleSendImage }) => (
  <TouchableOpacity style={styles.iconButton} onPress={handleSendImage}>
    <Ionicons name="image-outline" size={28} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  iconButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
