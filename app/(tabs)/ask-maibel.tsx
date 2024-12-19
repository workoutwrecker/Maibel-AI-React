import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TouchableOpacity,
} from "react-native";
import { botResponse } from "./ask-maibel/call_bot";
import { useTheme } from '../../context/ThemeContext';
import { themeStyles } from "../../context/themeStyles";

export default function AskMaibel() {
  const { theme } = useTheme();
  const currentTheme = themeStyles[theme];
  // *Initialising 'state variables' that are exclusive to react
  const [messages, setMessages] = useState([
    { id: "1", sender: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const getPreviousAIMessage = () => {
    const botMessages = messages.filter((msg) => msg.sender === "bot");
    return botMessages.length > 0 ? botMessages[botMessages.length - 1] : null;
  };

  const prevAImsg = getPreviousAIMessage();  

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { id: Date.now().toString(), sender: "user", text: input };
    // *Append user message to the messages state variable. Cannot directly push a new row since state variables are immutable
    setMessages((prev) => [...prev, userMessage]);
    setIsStreaming(true);
    botResponse(input, 123, prevAImsg?.text || "", (chunk) => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.sender === "bot" && lastMessage.text.startsWith("...")) {
          return [...prev.slice(0, -1), { ...lastMessage, text: lastMessage.text + chunk }];
        } else {
          return [...prev, { id: Date.now().toString(), sender: "bot", text: "..." + chunk }];
        }
      });
    }).then((botMessage) => {
      setMessages((prev) => [...prev.slice(0, -1), botMessage]);
      setIsStreaming(false);
    });

    // Clear input field
    setInput("");
  };

  const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (event.nativeEvent.key === "Enter") {
      event.preventDefault(); // Prevent new line
      handleSend();
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
    },
    messagesContainer: {
      padding: 10,
    },
    messageBubble: {
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
      maxWidth: "80%",
    },
    userMessage: {
      alignSelf: "flex-end",
      backgroundColor: "#ccc",
    },
    botMessage: {
      alignSelf: "flex-start",
      backgroundColor: "#eee",
    },
    messageText: {
      fontSize: 16,
      color: "black",
    },
    inputContainer: {
      flexDirection: "row",
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: "#ddd",
    },
    input: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: currentTheme.border,
      borderRadius: 5,
      marginRight: 10,
      color: currentTheme.text,
    },
    sendText: {
      marginTop: 20,
      fontSize: 16,
      color: currentTheme.text,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          multiline
          onSubmitEditing={handleSend}
          onKeyPress={handleKeyPress}
          editable={!isStreaming} // Disable input during streaming
        />
        <TouchableOpacity onPress={handleSend} disabled={isStreaming}>
          <Text style={styles.sendText}>{isStreaming ? "..." : "Send"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
