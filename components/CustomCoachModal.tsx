import React from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CustomCoachModalProps {
  visible: boolean;
  onClose: () => void;
  onBuildCoach: (gender: string, prompt: string) => void;
}

const CustomCoachModal: React.FC<CustomCoachModalProps> = ({ visible, onClose, onBuildCoach }) => {
  const [selectedGender, setSelectedGender] = React.useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = React.useState<string>("");

  const handleBuildCoach = () => {
    if (!selectedGender || !systemPrompt) {
      Alert.alert("Error", "Please select gender and enter a system prompt.");
      return;
    }
    onBuildCoach(selectedGender, systemPrompt);
  };

  return (
    <Modal 
    transparent={true} 
    statusBarTranslucent={true}
    animationType="slide" 
    visible={visible} 
    onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Your Custom Coach</Text>

          <View style={styles.genderButtonsContainer}>
            <TouchableOpacity
              style={[styles.genderButton, selectedGender === "male" && styles.selectedButton]}
              onPress={() => setSelectedGender("male")}
            >
              <MaterialCommunityIcons name="gender-male" size={40} color="white" />
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, selectedGender === "female" && styles.selectedButton]}
              onPress={() => setSelectedGender("female")}
            >
              <MaterialCommunityIcons name="gender-female" size={40} color="white" />
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.promptInput}
            placeholder="Enter a system prompt"
            value={systemPrompt}
            onChangeText={setSystemPrompt}
          />

          <TouchableOpacity style={styles.buildButton} onPress={handleBuildCoach}>
            <Text style={styles.buildButtonText}>Build</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default CustomCoachModal;
