import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, IMessage, InputToolbar, Send } from "react-native-gifted-chat";
import { useTheme } from "../../context/ThemeContext";
import { themeStyles } from "../../context/themeStyles";
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator, ImageBackground, SafeAreaView, StatusBar, KeyboardAvoidingView, Keyboard, 
  Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { botResponse } from "./chat/call_bot";
import { getFromSecureStorage } from '../../utils/SecureStorage';

export default function Chat() {
  const getCoach = async () => {
    const coachId = await getFromSecureStorage('selectedCoachId');
    return { coachId };
  };
  
  const logCoachDetails = async () => {
    const coachDetails = await getCoach();
    console.log("Coach Details: ", coachDetails);
  };
  
  logCoachDetails();

  const { theme } = useTheme();
  const currentTheme = themeStyles[theme];

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [coachBackground, setCoachBackground] = useState(null);
  const [coachName, setCoachName] = useState("");

  const botAvatar = require("../../assets/images/Stan.jpeg");

  useEffect(() => {
    // Get the selected coach and apply the correct background and name
    const setCoachDetails = async () => {
      const coachDetails = await getCoach();
      let background;
      let name;

      // Define backgrounds and names for different coaches
      switch (coachDetails.coachId) {
        case "male_coach":
          background = require("../../assets/images/chat/chat_male.jpg");
          name = "Ethain";
          break;
        case "female_coach":
          background = require("../../assets/images/chat/chat_female.jpg");
          name = "Maibel";
          break;
        case "custom_coach":
          background = require("../../assets/images/onboard/Male_Coach.jpg");
          name = "Custom Coach";
          break;
        default:
          background = require("../../assets/images/onboard/Male_Coach.jpg");
          name = "Coach";
      }

      setCoachBackground(background);
      setCoachName(name);
    };

    setCoachDetails();
  }, []);

  const handleSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    const userMessage = newMessages[0];
    if (userMessage && userMessage.text) {
      setIsStreaming(true);
      botResponse(userMessage.text, 123, 'bubbly_coach', (chunk) => {
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[0];
          if (lastMessage && lastMessage.user._id === 2 && lastMessage.text.startsWith("...")) {
            const updatedMessage = {
              ...lastMessage,
              text: lastMessage.text + chunk,
            };
            return [updatedMessage, ...prevMessages.slice(1)];
          } else {
            return [
              {
                _id: new Date().getTime(),
                text: "..." + chunk,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: coachName,
                  avatar: botAvatar,
                },
              },
              ...prevMessages,
            ];
          }
        });
      }).then((botMessage) => {
        setMessages((previousMessages) => {
          const updatedMessages = [
            {
              _id: new Date().getTime(),
              text: botMessage.text,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: coachName,
                avatar: botAvatar,
              },
            },
            ...previousMessages.slice(1),
          ];
          return updatedMessages;
        });
        setIsStreaming(false);
      });
    }
  }, [coachName]);

  const handleSendImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access the gallery is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!pickerResult.canceled) {
      const imageMessage = {
        _id: new Date().getTime(),
        text: "",
        createdAt: new Date(),
        user: {
          _id: 1,
        },
        image: pickerResult.assets[0].uri,
      };
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [imageMessage]));
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#000",
    },
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      // backgroundColor: currentTheme.background,
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
    iconButton: {
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    inputContainer: {
      marginHorizontal: 10,
      marginBottom: 10,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: "#ddd",
      paddingHorizontal: 15,
      backgroundColor: "#fff",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    sendButton: {
      marginBottom: 5,
      backgroundColor: "#007AFF",
      borderRadius: 20,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      elevation: 2,
    },
    sendContainer: {
      // Override inputContainer styling
    }
  });

  return coachBackground ? (
    <>
      <StatusBar translucent={true} backgroundColor="#000" />
      <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Adjust this offset if needed
      >
      <ImageBackground
        source={coachBackground}
        style={[styles.container, { paddingBottom: 0 }]}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Image source={botAvatar} style={styles.avatar} />
          <Text style={styles.headerText}>{coachName}</Text>
        </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => handleSend(messages)}
        user={{
          _id: 1,
          name: "User",
        }}
        placeholder="Type your message..."
        showUserAvatar={true}
        renderAvatarOnTop={true}
        isTyping={isStreaming}
        bottomOffset={0}
        renderActions={() => (
          <TouchableOpacity style={styles.iconButton} onPress={handleSendImage}>
            <Ionicons name="image-outline" size={28} />
          </TouchableOpacity>
        )}
        renderFooter={() =>
          isStreaming && (
            <ActivityIndicator size="small" color={currentTheme.text} style={{ margin: 10 }} />
          )
        }
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={styles.inputContainer}
            
          />
        )}
        renderSend={(props) => (
          <Send {...props} containerStyle={styles.sendContainer}>
            <View style={styles.sendButton}>
              <Ionicons name="send" size={18} color="#fff" />
            </View>
          </Send>
        )}
      />
    </ImageBackground>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  ) : (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
}
