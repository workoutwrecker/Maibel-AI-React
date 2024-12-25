import React, { useState, useEffect } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { botResponse } from "./chat/call_bot";
import { useTheme } from '../../context/ThemeContext';
import { themeStyles } from "../../context/themeStyles";
import Sidebar from '../../components/sidebar';
import AddBotModal from '../../components/AddBotModal';
import { View, Alert, StyleSheet, Text, Image, Keyboard, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface User {
  id: string;
  name: string;
  avatar: any;
  description?: string;
}

export default function Chat() {
  const { theme } = useTheme();
  const currentTheme = themeStyles[theme];

  const availableBots: User[] = [
    { id: "bubbly_coach", name: "Mabel", avatar: require('../../assets/images/bots/bot-icon.jpg'), description: "Bubbly, Friendly, Talks in short bursts" },
    { id: "bad_coach", name: "Stan", avatar: require('../../assets/images/bots/Stan.jpeg'), description: "Unhelpful, Unfriendly, Demotivating" },
    { id: "gooby_goober", name: "Goober", avatar: require('../../assets/images/bots/Goober.jpeg'), description: "Clumsy, Well-meaning, Often screws up" },
    { id: "grey_wolf", name: "Great Grey Wolf Sif", avatar: require('../../assets/images/bots/Grey Wolf.jpeg'), description: "Wise, Mysterious, Sly" },
  ];

  const [currentBots, setCurrentBots] = useState<User[]>([ 
    { id: "bubbly_coach", name: "Mabel", avatar: require('../../assets/images/bots/bot-icon.jpg'), description: "Bubbly, Friendly, Talks in short bursts" },
  ]);
  const [selectedUserId, setSelectedUserId] = useState("bubbly_coach");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isAddBotModalVisible, setIsAddBotModalVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);  // Manage sidebar visibility separately

  useEffect(() => {
    const selectedBot = currentBots.find(bot => bot.id === selectedUserId);
    if (selectedBot) {
      setMessages([{
        _id: 1,
        text: `Hello, I am ${selectedBot.name}.`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: selectedBot.name,
          avatar: selectedBot.avatar,
        },
      }]);
    }
  }, [selectedUserId, currentBots]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsSidebarVisible(false);  // Hide sidebar when keyboard is shown
        setIsKeyboardVisible(true);   // Set keyboard visible state
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);  // Reset keyboard visibility state
        setIsSidebarVisible(true);    // Show sidebar again when keyboard hides
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        {isSidebarVisible === false && (
          <TouchableOpacity onPress={handleShowSidebar} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={currentTheme.text} style={styles.backButton} />
          </TouchableOpacity>
        )}
        {selectedBot ? (
          <>
            <Image source={selectedBot.avatar} style={styles.avatar} />
            <Text style={styles.headerText}>{selectedBot.name}</Text>
          </>
        ) : (
          <Text style={styles.headerText}>Select a Bot</Text>
        )}
      </View>
    );
  };

  const handleSend = (newMessages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    const userMessage = newMessages[0];

    setIsStreaming(true);
    const selectedBot = currentBots.find(bot => bot.id === selectedUserId); 
    const botId = selectedBot?.id || "";

    botResponse(userMessage.text, 123, botId, (chunk) => {
      setMessages((previousMessages) => {
        const lastMessage = previousMessages[0];
        if (lastMessage && lastMessage.user._id === 2 && lastMessage.text.startsWith("...")) {
          const updatedMessage = {
            ...lastMessage,
            text: lastMessage.text + chunk,
          };
          return [updatedMessage, ...previousMessages.slice(1)];
        } else {
          return [
            {
              _id: new Date().getTime(),
              text: "..." + chunk,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "Bot",
                avatar: require('../../assets/images/bots/bot-icon.jpg'),
              },
            },
            ...previousMessages,
          ];
        }
      });
    }).then((botMessage) => {
      setMessages((previousMessages) => [
        {
          _id: new Date().getTime(),
          text: botMessage.text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Bot",
            avatar: require('../../assets/images/bots/bot-icon.jpg'),
          },
        },
        ...previousMessages.slice(1),
      ]);
      setIsStreaming(false);
    });
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleToggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);  // Collapse or expand sidebar
    // setIsSidebarVisible(!isSidebarVisible);
  };

  const handleHideSidebar = () => {
    setIsSidebarVisible(false);
  };

  const handleShowSidebar = () => {
    setIsSidebarVisible(true);
  }

  const handleAddUser = () => {
    setIsAddBotModalVisible(true);
  };

  const handleSelectBot = (bot: User) => {
    setCurrentBots([...currentBots, bot]);
    setIsAddBotModalVisible(false);
  };

  const handleDeleteChat = (userId: string) => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this chat?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setCurrentBots(prevBots => prevBots.filter(bot => bot.id !== userId));
            if (selectedUserId === userId) {
              setSelectedUserId(""); 
            }
          },
        },
      ]
    );
  };

  const selectedBot = currentBots.find(bot => bot.id === selectedUserId);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: currentTheme.background
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: currentTheme.background,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    backButton: {
      marginRight: 15,  // Added margin to push back button further from the avatar
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: currentTheme.text
    },
    chatContainer: {
      flex: 1,
    },
    modal: {
      // zIndex: -1,
    }
  });

  return (
    <View style={styles.container}>
      {isSidebarVisible && (
        <Sidebar
          users={currentBots}  
          selectedUserId={selectedUserId}
          onSelectUser={handleSelectUser}
          isExpanded={isSidebarExpanded}
          onToggleExpand={handleToggleSidebar}
          onAddUser={handleAddUser}
          onDeleteChat={handleDeleteChat}
        />
      )}

      <View style={styles.chatContainer}>
        {renderHeader()}
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
        />
      </View>

      <View style={styles.modal}>
        <AddBotModal
          isVisible={isAddBotModalVisible}
          onClose={() => setIsAddBotModalVisible(false)}
          onSelectBot={handleSelectBot}
          availableBots={availableBots}  
        />
      </View>
    </View>
  );
}
