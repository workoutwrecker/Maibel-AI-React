import { useState, useCallback, useRef, useEffect } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { botResponse } from "../app/(tabs)/call_bot";
import * as ImagePicker from "expo-image-picker";
import { initiateOnboardingFlow } from "./useOnboardingFlow";

export const useChat = (
  coachId: string,
  coachName: string,
  botAvatar: any,
  personality: any,
  gender: any,
  coachBackgroundDesc: any
) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isChallenge, setIsChallenge] = useState(false);

  const readyPromiseRef = useRef<(() => void) | null>(null);
  const replyPromiseRef = useRef<(() => void) | null>(null);

  const handleSend = useCallback(
    (newMessages: IMessage[] = [], isChallenge: boolean) => {
      const userMessage = newMessages[0];

      if (userMessage && userMessage.text) {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

        if (!isChallenge) {
          setIsStreaming(true);

          botResponse(userMessage.text, 123, coachId, personality, gender, coachBackgroundDesc, (chunk) => {
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
        } else {
          if (userMessage.text.toUpperCase() === "READY") {
            if (readyPromiseRef.current) {
              readyPromiseRef.current();
              readyPromiseRef.current = null;
            }
          }

          if (replyPromiseRef.current) {
            replyPromiseRef.current();
            replyPromiseRef.current = null;
          }
        }
      }
    },
    [coachId, coachName, botAvatar, personality, gender, coachBackgroundDesc]
  );

  const waitForReady = () => {
    return new Promise<void>((resolve) => {
      readyPromiseRef.current = resolve;
    });
  };

  const waitForReply = () => {
    return new Promise<void>((resolve) => {
      replyPromiseRef.current = resolve;
    });
  };

  // Function to handle sending an image
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

  // Start the onboarding flow when `isChallenge` is true
  useEffect(() => {
    if (isChallenge) {
      const startOnboarding = async () => {
        await initiateOnboardingFlow(
          coachName,
          setMessages,
          botAvatar,
          waitForReady,
          waitForReply,
          setIsStreaming,
          () => setIsChallenge(false)
        );
      };

      startOnboarding();
    }
  }, [isChallenge]);

  return {
    messages,
    isStreaming,
    isChallenge,
    setIsChallenge,
    handleSend,
    handleSendImage,
  };
};
