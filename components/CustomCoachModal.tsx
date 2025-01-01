import React from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CustomCoachModalProps {
  visible: boolean;
  onClose: () => void;
  onBuildCoach: (gender: string, name: string, background: string, personalities: string[]) => void;
}

const CustomCoachModal: React.FC<CustomCoachModalProps> = ({ visible, onClose, onBuildCoach }) => {
  const [selectedGender, setSelectedGender] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string>("");
  const [background, setBackground] = React.useState<string>("");
  const [selectedPersonalities, setSelectedPersonalities] = React.useState<string[]>([]);

  const personalityOptions = ["Empathetic", "Motivational", "Supportive", "Analytical", "Encouraging", "Challenging"];

  const togglePersonality = (personality: string) => {
    setSelectedPersonalities((prev) =>
      prev.includes(personality)
        ? prev.filter((p) => p !== personality)
        : prev.length < 3
        ? [...prev, personality]
        : prev
    );
  };

  const handleBuildCoach = () => {
    if (!selectedGender || !name || !background || selectedPersonalities.length === 0) {
      Alert.alert("Error", "Please fill out all fields and select at least one personality.");
      return;
    }
    onBuildCoach(selectedGender, name, background, selectedPersonalities);
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

          {/* Gender Selection */}
          <View style={styles.genderButtonsContainer}>
            <TouchableOpacity
              style={[styles.genderButton, selectedGender === "male" && styles.selectedMaleButton]}
              onPress={() => setSelectedGender("male")}
            >
              <MaterialCommunityIcons name="gender-male" size={40} color="white" />
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, selectedGender === "female" && styles.selectedFemaleButton]}
              onPress={() => setSelectedGender("female")}
            >
              <MaterialCommunityIcons name="gender-female" size={40} color="white" />
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter Name (e.g., Coach Alex)"
            value={name}
            maxLength={50}
            onChangeText={setName}
          />
          <View style={styles.characterCountContainer}>
            <Text style={styles.characterCountText}>{`${name.length}/50`}</Text>
          </View>

          {/* Background Input */}
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Enter Background (e.g., Fitness expert with 10 years of experience.)"
            value={background}
            maxLength={300}
            multiline
            onChangeText={setBackground}
          />
          <View style={styles.characterCountContainer}>
            <Text style={styles.characterCountText}>{`${background.length}/300`}</Text>
          </View>

          {/* Personalities Selection */}
          <Text style={styles.subTitle}>Select Up to 3 Personalities:</Text>
          <View style={styles.personalitiesContainer}>
            {personalityOptions.map((personality) => (
              <TouchableOpacity
                key={personality}
                style={[
                  styles.personalityButton,
                  selectedPersonalities.includes(personality) && styles.selectedPersonalityButton,
                ]}
                onPress={() => togglePersonality(personality)}
              >
                <Text
                  style={[
                    styles.personalityText,
                    selectedPersonalities.includes(personality) && styles.selectedPersonalityText,
                  ]}
                >
                  {personality}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Build and Close Buttons */}
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
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  genderButtonsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  genderButton: {
    backgroundColor: "#000",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  selectedMaleButton: {
    backgroundColor: "lightblue",
    elevation: 5,
  },
  selectedFemaleButton: {
    backgroundColor: "pink",
  },
  genderText: {
    color: "white",
    marginTop: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#6A0DAD",
    width: "100%",
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  multilineInput: {
    height: 80,
  },
  characterCountContainer: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  characterCountText: {
    color: "gray",
    fontSize: 12,
  },
  personalitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  personalityButton: {
    borderWidth: 1,
    borderColor: "#6A0DAD",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  selectedPersonalityButton: {
    backgroundColor: "#6A0DAD",
  },
  personalityText: {
    color: "#6A0DAD",
  },
  selectedPersonalityText: {
    color: "white",
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
