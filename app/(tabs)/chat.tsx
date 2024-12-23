import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-native";
import { botResponse } from "./chat/call_bot";
import { useTheme } from '../../context/ThemeContext';
import { themeStyles } from "../../context/themeStyles";
import Sidebar from '../../components/sidebar';

interface Message {
  id: string;
  sender: string;
  text: string;
}

interface User {
  id: string;
  name: string;
  avatar: any;
}

interface Conversation {
  userId: string;
  messages: Message[];
}

export default function Chat() {
  const { theme } = useTheme();
  const currentTheme = themeStyles[theme];

  const [users, setUsers] = useState<User[]>([
    { id: "bubbly_coach", name: "Maibel", avatar: require('../../assets/images/bot-icon.jpg') },
    { id: "bad_coach", name: "Stan", avatar: require('../../assets/images/bot-icon.jpg') },
  ]);

  const [selectedUserId, setSelectedUserId] = useState("bubbly_coach");
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      userId: "bubbly_coach",
      messages: [{ id: "1", sender: "bot", text: "Hi! How can I assist you today?" }],
    },
  ]);

  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    // Initialize conversations for all users
    const initialConversations = users.map(user => ({
      userId: user.id,
      messages: user.id === "bubbly_coach" ? [{ id: "1", sender: "bot", text: "Hi! How can I assist you today?" }] : [],
    }));
    setConversations(initialConversations);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: "user", text: input };
    
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.userId === selectedUserId
          ? { ...conv, messages: [...conv.messages, userMessage] }
          : conv
      )
    );

    setIsStreaming(true);

    const selectedUser = users.find(user => user.id === selectedUserId);
    const personality = selectedUser?.id || "bubbly_coach";
    console.log("Personality: ", personality);

    botResponse(input, 123, personality, (chunk) => {
      setConversations(prevConversations => 
        prevConversations.map(conv => {
          if (conv.userId === selectedUserId) {
            const lastMessage = conv.messages[conv.messages.length - 1];
            if (lastMessage.sender === "bot" && lastMessage.text.startsWith("...")) {
              const updatedMessages = [...conv.messages.slice(0, -1), { ...lastMessage, text: lastMessage.text + chunk }];
              return { ...conv, messages: updatedMessages };
            } else {
              return { ...conv, messages: [...conv.messages, { id: Date.now().toString(), sender: "bot", text: "..." + chunk }] };
            }
          }
          return conv;
        })
      );
    }).then((botMessage) => {
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.userId === selectedUserId
            ? { ...conv, messages: [...conv.messages.slice(0, -1), botMessage] }
            : conv
        )
      );
      setIsStreaming(false);
    });

    setInput("");
  };

  const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (event.nativeEvent.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleToggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleAddUser = () => {
    const newUserId = `user${users.length + 1}`;
    const newUser: User = {
      id: newUserId,
      name: `User ${users.length + 1}`,
      avatar: require('../../assets/images/default-avatar.jpg'),
      personality: "neutral",
    };
    setUsers([...users, newUser]);
    setConversations([...conversations, { userId: newUserId, messages: [] }]);
  };

  const handleDeleteChat = (userId: string) => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this chat?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            setConversations(conversations.filter(conv => conv.userId !== userId));
            if (selectedUserId === userId) {
              setSelectedUserId(users[0].id);
            }
          }
        }
      ]
    );
  };

  const currentConversation = conversations.find(conv => conv.userId === selectedUserId) || { messages: [] };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: currentTheme.background,
    },
    chatContainer: {
      flex: 1,
    },
    messagesContainer: {
      flex: 1,
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
    <View style={styles.container}>
      <Sidebar
        users={users}
        selectedUserId={selectedUserId}
        onSelectUser={handleSelectUser}
        isExpanded={isSidebarExpanded}
        onToggleExpand={handleToggleSidebar}
        onAddUser={handleAddUser}
        onDeleteChat={handleDeleteChat}
      />
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={currentConversation.messages}
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

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            multiline
            onSubmitEditing={handleSend}
            onKeyPress={handleKeyPress}
            editable={!isStreaming}
          />
          <TouchableOpacity onPress={handleSend} disabled={isStreaming}>
            <Text style={styles.sendText}>{isStreaming ? "..." : "Send"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

