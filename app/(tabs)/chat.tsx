import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useTheme } from "../../context/ThemeContext";
import { themeStyles } from "../../context/themeStyles";
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { botResponse } from "./chat/call_bot";


export default function Chat() {
  const { theme } = useTheme();
  const currentTheme = themeStyles[theme];

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const botAvatar = require("../../assets/images/bots/bot-icon.jpg");
  

  useEffect(() => {
    // Initial bot message
    setMessages([
      {
        _id: 1,
        text: "Hi, I am Mabel. How can I assist you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Mabel",
          avatar: botAvatar,
        },
      },
    ]);
  }, []);

  const handleSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  
    const userMessage = newMessages[0];
    if (userMessage && userMessage.text) {
      setIsStreaming(true);
  
      // Bot response logic using the botResponse function from the working script
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
                  name: "Mabel", // Bot name (could be dynamic based on bot selected)
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
                name: "Mabel", // Bot name (could be dynamic based on bot selected)
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
  }, []);

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

      // Placeholder: Handle API call for image upload if necessary
      // await handleImageUpload(pickerResult.assets[0].uri);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: currentTheme.background,
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
      color: currentTheme.text,
    },
    iconButton: {
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={botAvatar} style={styles.avatar} />
        <Text style={styles.headerText}>Mabel</Text>
      </View>

      {/* Chat */}
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
        bottomOffset={50} 
        renderActions={() => (
          <TouchableOpacity style={styles.iconButton} onPress={handleSendImage}>
            <Ionicons name="image-outline" size={28} color={currentTheme.text} />
          </TouchableOpacity>
        )}
        renderFooter={() =>
          isStreaming && (
            <ActivityIndicator size="small" color={currentTheme.text} style={{ margin: 10 }} />
          )
        }
      />
    </View>
  );
}
