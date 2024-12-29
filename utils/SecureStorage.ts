import * as SecureStore from 'expo-secure-store';

// Save data securely
export const saveToSecureStorage = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Error saving to secure storage", error);
  }
};

// Retrieve data securely
export const getFromSecureStorage = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.error("Error retrieving from secure storage", error);
    return null;
  }
};

// Remove data securely (e.g., during sign-out)
export const removeFromSecureStorage = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error removing from secure storage", error);
  }
};
