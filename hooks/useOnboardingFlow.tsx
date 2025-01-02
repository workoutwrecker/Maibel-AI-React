import { IMessage } from 'react-native-gifted-chat';
import { dialogueFlow } from '../app/onboard/challenges';

export const initiateOnboardingFlow = async (coachName: string, 
    setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>, 
    botAvatar: any, 
    onReadyCallback: () => void,
    onReplyCallback: () => void,
    setTypingState: (isStreaming: boolean) => void,
    setOnboardingComplete: React.Dispatch<React.SetStateAction<boolean>>,) => {
  setTypingState(true)
  for (const step of dialogueFlow) {
    const messageText = typeof step.message === "function" ? step.message(coachName) : step.message;
    await new Promise((resolve) => setTimeout(resolve, step.time || 1000));
    setMessages((prevMessages) => [
      {
        _id: new Date().getTime(),
        text: messageText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: coachName,
          avatar: botAvatar,
        },
      },
      ...prevMessages,
    ]);
    if (step.next === "wait_for_ready") {
      setTypingState(false)
      await onReadyCallback();
      setTypingState(true)
    }
    else if (step.next === "wait") {
      setTypingState(false)
      await onReplyCallback();
      setTypingState(true)
    }
  }
  setTypingState(false);
  setOnboardingComplete(true);
};
