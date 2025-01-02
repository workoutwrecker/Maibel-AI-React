import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";

// Define the types for the component's props
interface HeaderProps {
  coachName: string;
  botAvatar: ImageSourcePropType;
}

export const Header: React.FC<HeaderProps> = ({ coachName, botAvatar }) => (
  <View style={styles.header}>
    <Image source={botAvatar} style={styles.avatar} />
    <Text style={styles.headerText}>{coachName}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    color: "#FFF",
  },
});
