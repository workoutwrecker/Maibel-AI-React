import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { themeStyles } from "../context/themeStyles";
import { Plus, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react-native';

interface User {
  id: string;
  name: string;
  avatar: any;
}

interface SidebarProps {
  users: User[];
  selectedUserId: string;
  onSelectUser: (userId: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAddUser: () => void;
  onDeleteChat: (userId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  users,
  selectedUserId,
  onSelectUser,
  isExpanded,
  onToggleExpand,
  onAddUser,
  onDeleteChat
}) => {
  const { theme } = useTheme();
  const currentTheme = themeStyles[theme];

  const styles = StyleSheet.create({
    sidebar: {
      width: isExpanded ? 200 : 80,
      backgroundColor: currentTheme.background,
      borderRightWidth: 1,
      borderRightColor: currentTheme.border,
      flexDirection: 'column',
    },
    userItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.border,
    },
    selectedUser: {
      backgroundColor: currentTheme.primary,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    userName: {
      marginLeft: 10,
      fontSize: 14,
      color: currentTheme.text,
      flex: 1,
    },
    expandButton: {
      padding: 10,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: currentTheme.border,
    },
    expandButtonText: {
      color: currentTheme.text,
    },
    addButton: {
      padding: 10,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: currentTheme.border,
    },
    deleteButton: {
      padding: 5,
    },
    usersContainer: {
      flex: 1,
    },
  });

  return (
    <View style={styles.sidebar}>
      <ScrollView style={styles.usersContainer}>
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={[
              styles.userItem,
              user.id === selectedUserId && styles.selectedUser,
            ]}
            onPress={() => onSelectUser(user.id)}
          >
            <Image source={user.avatar} style={styles.avatar} />
            {isExpanded && (
              <>
                <Text style={styles.userName}>{user.name}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => onDeleteChat(user.id)}
                >
                  <Trash2 size={20} color={currentTheme.text} />
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={onAddUser}>
        <Plus size={24} color={currentTheme.text} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.expandButton} onPress={onToggleExpand}>
        {isExpanded ? (
          <ChevronLeft size={24} color={currentTheme.text} />
        ) : (
          <ChevronRight size={24} color={currentTheme.text} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Sidebar;
